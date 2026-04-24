import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { Edit } from '../pom';

const ELEMENT_ID = 'test-modal-edit';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Initial render', () => {
  test('Renders empty-state alert when no embeds', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.root).toBeVisible();
    await expect(edit.emptyAlert).toBeVisible();
  });

  test('Top toolbar exposes the button label input', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await expect(edit.buttonLabelInput).toBeVisible();
  });
});

test.describe('Button label', () => {
  test('Persists label set via toolbar', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.buttonLabelInput.fill('Show details');
    // Wait for the debounced save (500ms) to fire and persist
    await page.waitForTimeout(700);
    await page.reload({ waitUntil: 'networkidle' });
    await edit.focus();
    await expect(edit.buttonLabelInput).toHaveValue('Show details');
  });
});

test.describe('Readonly mode', () => {
  test('Hides add-embed control', async ({ page }) => {
    const edit = new Edit(page);
    await edit.setReadonly();
    await expect(edit.addEmbedBtn).not.toBeVisible();
  });
});
