---
order: 12
slug: /getting-started/quick-start
title: Quick Start
description: Clone the repo, configure your environment, and run the development server
tags: docs, nx, getting-started
icon: rocket_launch
---

# Quick start

## Clone the repository

```bash
git clone https://github.com/goldlabelapps/nx
cd nx
```

## Configure environment

```bash
cp .env.example .env.local
# Set NEXT_PUBLIC_TENANT=nx
```

## Install dependencies

```bash
pnpm install
```

## Run the development server

```bash
pnpm dev
```

The app runs at [http://localhost:1999](http://localhost:1999).
