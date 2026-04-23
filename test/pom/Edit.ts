import type { Locator, Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Edit extends pom.EditPanel {
  readonly root: Locator;
  readonly buttonLabelInput: Locator;
  readonly emptyAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.root = this.editor.locator('.tce-modal');
    this.buttonLabelInput = this.topToolbar.getByLabel('Button label');
    this.emptyAlert = this.root.getByText(
      'Click the button below to add content element',
    );
  }
}
