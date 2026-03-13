import { Page, Locator, expect } from '@playwright/test';
import BasePage from './1.base';

export default class RentalsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly productCards: Locator;
  readonly productTitles: Locator;
  readonly productDescriptions: Locator;
  readonly productImages: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator('[data-test="page-title"]');
    this.productCards = page.locator('div[data-test^="product-"]');
    this.productTitles = page.locator('div[data-test^="product-"] .card-title');
    this.productDescriptions = page.locator('div[data-test^="product-"] .card-text');
    this.productImages = page.locator('div[data-test^="product-"] img');
  }

  async waitForPageReady(timeout = 15000) {
    await expect(this.pageTitle).toBeVisible({ timeout });
    await expect(this.productCards.first()).toBeVisible({ timeout });
  }
}