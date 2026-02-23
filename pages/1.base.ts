import { Page, Locator } from '@playwright/test';

export default class BasePage {
  readonly page: Page;
  readonly navHome: Locator;
  readonly navCategories: Locator;
  readonly navContact: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navHome = page.locator('[data-test="nav-home"]');
    this.navCategories = page.locator('[data-test="nav-categories"]');
    this.navContact = page.locator('[data-test="nav-contact"]');
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }
}