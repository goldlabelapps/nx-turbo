<div>
    <h1 style="display: flex; align-items: center; gap: 8px;">
        <a href="../../README.md" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
        <img
            src="../media/nx-icon.png"
            width="24"
            height="24"
        />
        </a>
        <span>NX° Turbo</span>
    </h1>
</div>

### apps/v3 NX Shortcodes

## Purpose

Shortcodes allow markdown authors to embed interactive UI blocks without writing React code directly.

## Available Shortcodes

- `HiddenMessage`
- `GithubLink`
- `FeedbackBtn`
- `CleverText`
- `ContentCard`
- `PageLink`

## How It Works

- Shortcodes are parsed from markdown at render time.
- Each shortcode maps to a React component.
- Attributes are passed through as component props.

## Extension Workflow

1. Add a component in the shortcode components folder.
2. Register it in shortcode parsing/rendering code.
3. Document usage for markdown authors.
