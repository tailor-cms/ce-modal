import { OpenAISchema } from '@tailor-cms/cek-common';
import { v4 as uuid } from 'uuid';
import type {
  DataInitializer,
  ElementData,
  ElementManifest,
} from './interfaces';

// Element unique id within the target system (e.g. Tailor)
export const type = 'MODAL';

// Display name (e.g. shown to the author)
export const name = 'Modal';

// Function which inits element state (data property on the Content Element
// entity)
export const initState: DataInitializer = (): ElementData => ({
  title: null,
  embeds: {},
});

// Can be loaded from package.json
export const version = '1.0';

// UI configuration for Tailor CMS
const ui = {
  // Display icon, https://pictogrammers.com/library/mdi/
  icon: 'mdi-window-restore',
  // Does element support only full width or can be used within layouts
  // (e.g. 50/50 layout)
  forceFullWidth: false,
};

export const ai = {
  Schema: {
    type: 'json_schema',
    name: 'ce_modal',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
      },
      required: ['title', 'content'],
      additionalProperties: false,
    },
  } as OpenAISchema,
  getPrompt: () => `
    Generate a modal content element as an object with the following
    properties:
    {
      "title": "",
      "content": "",
    }
    where:
      - 'title' is the title of the modal. Do not use more than 3 words.
      - 'content' is the text to be displayed in the modal. Create few
        paragraphs about the topic.
  `,
  processResponse: (val: any) => {
    const questionId = uuid();
    const question = {
      id: questionId,
      data: { content: val.content },
      embedded: true,
      position: 1,
      type: 'TIPTAP_HTML',
    };
    return {
      title: val.title,
      embeds: { [questionId]: question },
    };
  },
};

const manifest: ElementManifest = {
  type,
  version: '1.0',
  name,
  ssr: false,
  isComposite: true,
  initState,
  ui,
  ai,
};

export default manifest;
export * from './interfaces';
