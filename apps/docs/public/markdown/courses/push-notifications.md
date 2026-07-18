---
order: 235
slug: /courses/push-notifications
title: PWA
description: How to set up and trigger FCM (Firebase Cloud Messaging)
icon: book
tags: docs, copilot, ai, free, GitHub, Python, fcm, push notifications, notfify
image: /png/push.png
---
> [CleverText text="How to set up and trigger FCM (Firebase Cloud Messaging)"]

#### The notification system is made up of the following pieces:

- **app/NX/lib/firebase.ts**: Initialises Firebase Messaging client-side (`getFirebaseMessaging`)
- **app/NX/NXAdmin/actions/requestNotifications.tsx**: Redux action — requests browser permission, obtains FCM token, persists it to Firestore
- **app/NX/NXAdmin/hooks/useNotifications.tsx**: React hook — listens for foreground messages, plays sound, increments unread badge
- **app/NX/NXAdmin/components/Menus/NotificationBell.tsx**: UI bell icon that reflects the unread count from Redux
- **public/firebase-messaging-sw.js**: Service worker — handles background (app closed / not focused) notifications
- **app/api/notify/route.ts**: `POST /api/notify` — server-side route that sends multicast FCM messages via the Firebase Admin SDK

#### Redux notification state is stored at:

```
state.redux.nxAdmin.notifications
  ├── permission      – "default" | "granted" | "denied"
  ├── fcmToken        – the device's FCM registration token
  ├── unreadCount     – number of unread notifications
  └── initialized     – boolean, true once requestNotifications has run
```

#### Prerequisites

Ensure the following environment variables are set:

### Client-side (`.env.local` / Vercel environment)

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_VAPID_KEY
```

#### Server-side (not exposed to the browser)

```
NOTIFY_SECRET          # Shared secret used to authorise calls to POST /api/notify
FIREBASE_PROJECT_ID    # Used by the Firebase Admin SDK
FIREBASE_CLIENT_EMAIL  # Used by the Firebase Admin SDK
FIREBASE_PRIVATE_KEY   # Used by the Firebase Admin SDK
```

#### Step 1 — Request permission and obtain an FCM token

Dispatch `requestNotifications()` after a user logs in (or on first visit). This action:

1. Prompts the browser for notification permission.
2. Retrieves an FCM registration token using the VAPID key.
3. Saves the token to Redux (`nxAdmin.notifications.fcmToken`).
4. Persists the token to the user's Firestore document (`users/{doc}.fcmTokens[]`), so it can be looked up server-side.

```ts
import { requestNotifications } from 'app/NX/NXAdmin/actions/requestNotifications';

// Call this once, e.g. inside a post-login effect or layout component
dispatch(requestNotifications());
```

After this runs successfully, `state.redux.nxAdmin.notifications.permission` will be `"granted"` and `fcmToken` will be populated.

#### Step 2 — Send a notification via `POST /api/notify`

Call this endpoint from **server-side code only** (e.g. another API route, a cron job, a webhook handler). The request must include a `Bearer` token that matches the `NOTIFY_SECRET` environment variable.


#### Request

```
POST /api/notify
Authorization: Bearer <NOTIFY_SECRET>
Content-Type: application/json
```

#### Request body

The JSON body should include the following fields:

- **tokens** (`string[]`, required): One or more FCM registration tokens to send to
- **title** (`string`, required): Notification title
- **body** (`string`, optional): Notification body text
- **icon** (`string`, optional): URL of the notification icon
- **url** (`string`, optional): Click-through URL (opened when the user taps the notification)
- **data** (`Record<string, string>`, optional): Arbitrary key/value pairs forwarded as FCM data

#### Example

```ts
const response = await fetch('https://your-app.com/api/notify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NOTIFY_SECRET}`,
  },
  body: JSON.stringify({
    tokens: ['<FCM_TOKEN_FROM_FIRESTORE>'],
    title: 'New message',
    body: 'You have a new message from Alice.',
    icon: '/nxadmin/png/favicon.png',
    url: '/messages',
  }),
});

const result = await response.json();
// result.data = { successCount: 1, failureCount: 0 }
```

#### Response

```json
{
  "severity": "success",
  "message": "Sent 1/1 notifications",
  "data": {
    "successCount": 1,
    "failureCount": 0
  }
}
```

If some tokens fail, `severity` will be `"warning"`. On auth failure the response status is `401`.

#### Step 3 — Retrieve FCM tokens from Firestore

Each user's FCM tokens are stored as an array in their Firestore `users` document. To send a notification to a specific user, query their tokens first:

```ts
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore();
const q = query(collection(db, 'users'), where('uid', '==', targetUid));
const snap = await getDocs(q);

const tokens: string[] = [];
snap.forEach((doc) => {
  tokens.push(...(doc.data().fcmTokens ?? []));
});

// Then pass `tokens` to POST /api/notify
```

#### How notifications are received

> Foreground (app is open and focused)

The `useNotifications` hook listens for incoming FCM messages via `onMessage`. When a message arrives it:

- Plays a notification sound.
- Increments the `unreadCount` in Redux.
- The `NotificationBell` component reflects the updated badge count.

Mount this hook once at the top level of your authenticated layout:

```tsx
import { useNotifications } from 'app/NX/NXAdmin/hooks/useNotifications';

export default function AdminLayout({ children }) {
  useNotifications();
  return <>{children}</>;
}
```

> Background (app is closed or not focused)

The service worker at `public/firebase-messaging-sw.js` intercepts background FCM messages and uses the browser's native Notification API to display an OS-level notification. Clicking the notification navigates to the `url` from the `data` payload (if provided).

#### End-to-end flow

```
User visits app
  └─► dispatch(requestNotifications())
        ├─► browser prompts for permission
        ├─► FCM token obtained via VAPID key
        └─► token saved to Redux + Firestore (users/{doc}.fcmTokens[])

Server logic (cron / webhook / API route)
  └─► read FCM token(s) from Firestore
  └─► POST /api/notify  { tokens, title, body, url, ... }
        └─► Firebase Admin SDK sends multicast FCM push
              ├─► Foreground: useNotifications hook → sound + badge update
              └─► Background: service worker → OS notification popup
```
