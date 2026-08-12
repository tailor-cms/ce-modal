import type {
  BeforeDisplayHook,
  HookMap,
  OnUserInteractionHook,
  ServerModule,
} from '@tailor-cms/cek-common';
import type { Element } from '@tailor-cms/ce-modal-manifest';
import manifest from '@tailor-cms/ce-modal-manifest';

const IS_CEK = process.env.CEK_RUNTIME;

export const beforeDisplay: BeforeDisplayHook<Element> = (_element, context) =>
  context;

export const onUserInteraction: OnUserInteractionHook<Element> = (
  _element,
  context,
  payload,
) => {
  if (IS_CEK) context.openedAt = payload.openedAt;
  return { updateDisplayState: true };
};

export const hookMap: HookMap<Element> = new Map(
  Object.entries({
    beforeDisplay,
    onUserInteraction,
  }),
);

const serverModule: ServerModule<Element> = {
  ...manifest,
  hookMap,
  beforeDisplay,
  onUserInteraction,
};

export default serverModule;
