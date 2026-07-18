---
title: Tamagotchi APP°
description: Python app that recreates the classic handheld digital pet experience via a REST API
order: 1
slug: /apps/tamagotchi
icon: api
image: https://live.staticflickr.com/65535/55053909886_fa79b33160_b.jpg
---

## API Reference

### Auth

```sh
| Method | Endpoint              | Body                                | Description       |
|--------|-----------------------|-------------------------------------|-------------------|
| POST   | `/api/auth/register`  | `{username, email, password}`       | Register new user |
| POST   | `/api/auth/login`     | `{username, password}`              | Log in            |
```
Both endpoints return `{ user, access_token }`.

### Pets  *(all require `Authorization: Bearer <token>` header)*

| Method | Endpoint                    | Body          | Description        |
|--------|-----------------------------|---------------|--------------------|
| POST   | `/api/pets`                 | `{name}`      | Create a new pet   |
| GET    | `/api/pets`                 | —             | List your pets     |
| GET    | `/api/pets/<id>`            | —             | Get pet status     |
| POST   | `/api/pets/<id>/feed`       | —             | Feed the pet       |
| POST   | `/api/pets/<id>/play`       | —             | Play with the pet  |
| POST   | `/api/pets/<id>/clean`      | —             | Clean the pet      |

### Pet Stats

Each pet has four stats, all in the range **0–100**:

| Stat          | Starts at | Decays by (per hour) | Description                  |
|---------------|-----------|----------------------|------------------------------|
| `hunger`      | 50        | 10                   | 100 = full, 0 = starving     |
| `happiness`   | 50        | 8                    | 100 = ecstatic, 0 = miserable|
| `cleanliness` | 100       | 5                    | 100 = spotless, 0 = filthy   |
| `health`      | 100       | varies               | 0 = dead                     |

Health decreases when any of the other stats drop below 20. If health reaches 0 the pet dies.
