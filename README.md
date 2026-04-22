# Modal

Composite element that reveals embedded content in a dialog.

**Type:** `MODAL`

## Data

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string \| null` | Label shown on the trigger button and dialog title |
| `embeds` | `Record<string, any>` | Embedded content elements rendered inside the dialog |

## Edit

- Button label field in the top toolbar
- Embedded container for adding and arranging nested content elements
- Placeholder prompt when the modal is empty

## Display

- Renders a button that opens a scrollable dialog
- Dialog shows the title and the embedded elements
- Close button dismisses the dialog

## Development

```sh
pnpm dev     # Preview :8080 | Edit :8010 | Display :8020 | Server :8030
pnpm build
pnpm lint
pnpm test
```

## Run with Docker

```sh
docker compose up
```
