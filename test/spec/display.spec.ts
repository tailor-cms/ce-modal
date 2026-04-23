import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { Display } from '../pom';

const ELEMENT_ID = 'test-modal-display';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Default state', () => {
  test('Falls back to "Open Modal" when no title is set', async ({ page }) => {
    const display = new Display(page);
    await expect(display.activatorBtn).toContainText('Open Modal');
  });

  test('Dialog shows no-content alert when no embeds', async ({ page }) => {
    const display = new Display(page);
    await display.activatorBtn.click();
    await expect(display.dialog).toContainText(
      'No content elements added to this item',
    );
  });
});

test.describe('With title set', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, { title: 'Show details' });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Shows custom title on activator', async ({ page }) => {
    const display = new Display(page);
    await expect(display.activatorBtn).toContainText('Show details');
  });

  test('Clicking activator opens dialog with title', async ({ page }) => {
    const display = new Display(page);
    await display.activatorBtn.click();
    await expect(display.dialog).toBeVisible();
    await expect(display.dialog).toContainText('Show details');
  });

  test('Activator shows check icon after dialog is opened', async ({
    page,
  }) => {
    const display = new Display(page);
    await expect(display.activatorBtn.locator('.mdi-check')).not.toBeVisible();
    await display.activatorBtn.click();
    await expect(display.dialog).toBeVisible();
    await display.closeBtn.click();
    await expect(display.activatorBtn.locator('.mdi-check')).toBeVisible();
  });
});

test.afterAll(async () => {
  await elementClient.reset(ELEMENT_ID);
});
