# Paywall

The paywall cartridge adds Firebase-backed account and authentication behavior to the framework.

## What it includes

- sign-in, registration, and sign-out components
- account surfaces such as `Account`, `AccountCard`, and `MiniAccount`
- hooks for auth, account, UID, and paywall state
- actions for login, logout, account updates, subscriptions, and avatar lookups

Firebase bootstrapping lives in `app/NX/lib/firebase.ts`, so the paywall module can share one app, auth, firestore, and storage setup across the framework.
