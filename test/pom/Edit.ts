import type { Locator, Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Edit extends pom.EditPanel {
  readonly page: Page;
  readonly root: Locator;
  readonly buttonLabelInput: Locator;
  readonly emptyAlert: Locator;
  readonly addEmbedBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.root = this.editor.locator('.tce-modal');
    this.buttonLabelInput = this.sideToolbar.getByLabel('Button label');
    this.emptyAlert = this.root.getByText(
      'Click the button below to add content element',
    );
    this.addEmbedBtn = this.root.getByRole('button', { name: 'Add content' });
  }

  // Blur triggers save; the PATCH is async, so wait for it to be persisted
  // before e.g. reloading the page (otherwise the request gets cancelled).
  async fillLabel(text: string) {
    const saved = this.page.waitForResponse(
      (res) =>
        res.request().method() === 'PATCH' &&
        res.url().includes('/content-element/'),
    );
    await this.buttonLabelInput.fill(text);
    await this.buttonLabelInput.press('Tab');
    await saved;
  }
}
