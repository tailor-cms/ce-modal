import type * as common from '@tailor-cms/cek-common';

export interface ElementData extends common.ElementConfig {
  title: string | null;
  embeds: Record<string, any>;
}

export type DataInitializer = common.DataInitializer<ElementData>;
export type Element = common.Element<ElementData>;
export type ElementManifest = common.ElementManifest<ElementData>;
