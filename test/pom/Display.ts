import type { Locator, Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Display extends pom.DisplayPanel {
  readonly root: Locator;
  readonly activatorBtn: Locator;
  readonly dialog: Locator;
  readonly closeBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.root = this.editor.locator('.tce-modal-root');
    this.activatorBtn = this.root.locator('button');
    this.dialog = this.el.locator('.v-dialog');
    this.closeBtn = this.dialog.getByRole('button').first();
  }
}
