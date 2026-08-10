# @tailor-cms/ce-modal-server

Server-side module for the **Modal** content element in [Tailor CMS](https://github.com/tailor-cms/author).

Provides the server half of the element: state initialisation, lifecycle hooks and any AI configuration, registered by the Tailor server runtime.

## Installation

```sh
npm install @tailor-cms/ce-modal-server
```

## Usage

Content elements are normally registered with Tailor through the element
registry rather than imported directly, but the package can be consumed on its
own:

```ts
import serverModule from '@tailor-cms/ce-modal-server';
```

## Element

| Property | Value |
| --- | --- |
| Name | Modal |
| Type | `MODAL` |
| Icon | [`mdi-window-restore`](https://pictogrammers.com/library/mdi/) |
| Composite | Yes |

## Packages

This element ships as four packages, published together from the
[`ce-modal`](https://github.com/tailor-cms/ce-modal) repository:

| Package | Role |
| --- | --- |
| [`@tailor-cms/ce-modal-manifest`](https://www.npmjs.com/package/@tailor-cms/ce-modal-manifest) | Shared element definition |
| [`@tailor-cms/ce-modal-edit`](https://www.npmjs.com/package/@tailor-cms/ce-modal-edit) | Authoring component |
| [`@tailor-cms/ce-modal-display`](https://www.npmjs.com/package/@tailor-cms/ce-modal-display) | End-user component |
| [`@tailor-cms/ce-modal-server`](https://www.npmjs.com/package/@tailor-cms/ce-modal-server) | Server-side module |

## Development

```sh
pnpm install
pnpm dev     # start the Content Element Kit runtime
pnpm build   # build all packages
pnpm test    # Playwright end-to-end suite
```

Changes are released with [changesets](https://github.com/changesets/changesets);
run `pnpm changeset` to record one.
