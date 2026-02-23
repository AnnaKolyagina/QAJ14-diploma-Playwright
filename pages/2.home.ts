// pages/HomePage.ts
import { Page, Locator } from '@playwright/test';
import BasePage from './1.base';

export default class HomePage extends BasePage {
  readonly navHandTools: Locator;
  readonly navPowerTools: Locator;
  readonly navOther: Locator;
  readonly navSpecialTools: Locator;

  constructor(page: Page) {
    super(page);

    this.navHandTools = page.locator('[data-test="nav-hand-tools"]');
    this.navPowerTools = page.locator('[data-test="nav-power-tools"]');
    this.navOther = page.locator('[data-test="nav-other"]');
    this.navSpecialTools = page.locator('[data-test="nav-special-tools"]');
  }

  async openCategoriesDropdown() {
    await this.navCategories.click();
  }
}