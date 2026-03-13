import { test, expect } from '@playwright/test';
import RentalsPage from '../pages/4.rentals';
import { RENTAL_URL } from '../config';

test.describe('Rentals Page Tests', () => {
  let rentals: RentalsPage;

  test.beforeEach(async ({ page }) => {
    rentals = new RentalsPage(page);
    await rentals.navigate(RENTAL_URL);
    await rentals.waitForPageReady();
  });

  test('Page title is visible', async () => {
    await expect(rentals.pageTitle).toBeVisible();
  });

  test('Page title contains "Rentals"', async () => {
    await expect(rentals.pageTitle).toHaveText(/Rentals/);
  });

  test('There is at least one product card', async () => {
    const count = await rentals.productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('All product cards are visible', async () => {
    const count = await rentals.productCards.count();
    for (let i = 0; i < count; i++) {
      await expect(rentals.productCards.nth(i)).toBeVisible();
    }
  });

  test('Each product has a title', async () => {
    const count = await rentals.productTitles.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(rentals.productTitles.nth(i)).toBeVisible();
      const text = await rentals.productTitles.nth(i).innerText();
      expect(text.trim().length).toBeGreaterThan(0);
    }
  });

  test('Each product has a description', async () => {
    const count = await rentals.productDescriptions.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(rentals.productDescriptions.nth(i)).toBeVisible();
    }
  });

  test('Each product has an image', async () => {
    const count = await rentals.productImages.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(rentals.productImages.nth(i)).toBeVisible();
    }
  });

  test('First product title is not empty', async () => {
    const firstTitle = await rentals.productTitles.first().innerText();
    expect(firstTitle.trim().length).toBeGreaterThan(0);
  });

  test('First product description is not empty', async () => {
    const firstDesc = await rentals.productDescriptions.first().innerText();
    expect(firstDesc.trim().length).toBeGreaterThan(0);
  });

  test('Click first product focuses on it', async () => {
    await rentals.productCards.first().focus();
    await expect(rentals.productCards.first()).toHaveAttribute('tabindex', '0');
  });
});