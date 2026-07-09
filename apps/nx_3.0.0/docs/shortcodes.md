# Shortcodes

Shortcodes let Markdown content render React components without exposing application code to content editors.

The parser lives in `app/NX/Shortcodes/components/RenderMarkdown.tsx` and resolves shortcode syntax at render time.

## Supported shortcodes

| Shortcode | Purpose |
| --- | --- |
| `HiddenMessage` | Render a hidden message placeholder tied to the current slug |
| `FeedbackBtn` | Open feedback UI from Markdown |
| `CleverText` | Render animated typewriter-style text |
| `GithubLink` | Render a GitHub call-to-action link |
| `ContentCard` | Embed content by slug inside a card |
| `PageLink` | Render a styled internal or external page link |

## Example

```md
[PageLink icon="rocket" title="Get started" url="/help"]
[CleverText text="Ready to create an NX app?"]
```

For the animation component behind `CleverText`, see [CleverText](clever-text.md).
