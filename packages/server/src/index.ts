import { ai, initState, type } from '@tailor-cms/ce-modal-manifest';
import type {
  BeforeDisplayHook,
  HookMap,
  OnUserInteractionHook,
  ServerModule,
} from '@tailor-cms/cek-common';
import type { Element } from '@tailor-cms/ce-modal-manifest';

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
    onUserInteraction,
    beforeDisplay,
  }),
);

const serverModule: ServerModule<Element> = {
  type,
  initState,
  hookMap,
  onUserInteraction,
  beforeDisplay,
  ai,
};

export default serverModule;
export { type, initState, ai };
