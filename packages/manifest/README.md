# @tailor-cms/ce-modal-manifest

Shared element definition for the **Modal** content element in [Tailor CMS](https://github.com/tailor-cms/author).

Declares the element type, display name, UI configuration and initial state. The authoring, end-user and server packages all build on it, so it is the only package that has to be understood to know what the element *is*.

## Installation

```sh
npm install @tailor-cms/ce-modal-manifest
```

## Usage

Content elements are normally registered with Tailor through the element
registry rather than imported directly, but the package can be consumed on its
own:

```ts
import manifest, { type ElementData } from '@tailor-cms/ce-modal-manifest';

manifest.type;       // 'MODAL'
manifest.initState(); // initial element data
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
