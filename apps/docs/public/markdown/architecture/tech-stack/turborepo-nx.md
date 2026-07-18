---
order: 51
slug: /architecture/tech-stack/turborepo-nx
title: Turborepo + Nx Workspace Shape
description: How monorepo orchestration, task pipelines, and project boundaries are managed
tags: docs, nx, architecture, techstack, turborepo
icon: account_tree
---
# Turborepo + Nx Workspace Shape

## What

NX° Turbo is a multi-package monorepo orchestrated with Turborepo and pnpm workspaces, with apps and shared packages developed in one repository.

## Why

This setup keeps app and package changes coordinated, enforces shared task pipelines, and supports faster iteration through task-level caching.

## Where

- Pipeline config: `turbo.json`
- Workspace config: `pnpm-workspace.yaml`
- Root task scripts: `package.json`
- Project boundaries: `apps/**` and `packages/**`

## Who

- Platform maintainers define task pipelines and shared standards
- App/package contributors use the same build/test/lint workflows
- CI systems execute workspace-wide tasks from one orchestration layer

## When

Turborepo orchestration is active whenever repository-level scripts run (`dev`, `lint`, `type-check`, `build`, CI task chains).
