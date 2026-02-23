import { test, expect } from '@playwright/test';
import HomePage from '../pages/2.home';
import { HOME_URL } from '../config';

test.describe('Home Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.navigate(HOME_URL);
  });

  test('Title contains Practice Software Testing', async ({ page }) => {
    await expect(page).toHaveTitle(/Practice Software Testing/);
  });

  test('Home link visible', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.navHome).toBeVisible();
  });

  test('Categories link visible', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.navCategories).toBeVisible();
  });

  test('Contact link visible', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.navContact).toBeVisible();
  });

  test('Hand Tools option visible in categories', async ({ page }) => {
    const home = new HomePage(page);
    await home.openCategoriesDropdown();
    await expect(home.navHandTools).toBeVisible();
  });

  test('Power Tools option visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.openCategoriesDropdown();
    await expect(home.navPowerTools).toBeVisible();
  });

  test('Other category visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.openCategoriesDropdown();
    await expect(home.navOther).toBeVisible();
  });

  test('Special Tools visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.openCategoriesDropdown();
    await expect(home.navSpecialTools).toBeVisible();
  });

  test('Click Other navigates to correct URL', async ({ page }) => {
    const home = new HomePage(page);
    await home.openCategoriesDropdown();
    await home.navOther.click();
    await expect(page).toHaveURL(/category\/other/);
  });

  test('Click Contact navigates to contact page', async ({ page }) => {
    const home = new HomePage(page);
    await home.navContact.click();
    await expect(page).toHaveURL(/contact/);
  });
});