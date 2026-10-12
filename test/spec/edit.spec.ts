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

  test('Side toolbar exposes the button label input', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await expect(edit.buttonLabelInput).toBeVisible();
    await expect(edit.topToolbar.getByLabel('Button label')).toHaveCount(0);
  });
});

test.describe('Button label', () => {
  test('Persists label set via side toolbar', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fillLabel('Show details');
    await page.reload({ waitUntil: 'networkidle' });
    await edit.focus();
    await expect(edit.buttonLabelInput).toHaveValue('Show details');
  });

  test('Label is optional and can be cleared', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fillLabel('Show details');
    await edit.fillLabel('');
    await page.reload({ waitUntil: 'networkidle' });
    await edit.focus();
    await expect(edit.buttonLabelInput).toHaveValue('');
  });
});

test.describe('Readonly mode', () => {
  test('Hides add-embed control', async ({ page }) => {
    const edit = new Edit(page);
    await edit.setReadonly();
    await expect(edit.addEmbedBtn).not.toBeVisible();
  });
});
