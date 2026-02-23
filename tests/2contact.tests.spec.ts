import { test, expect } from '@playwright/test';
import ContactPage from '../pages/3.contact';
import { CONTACT_URL } from '../config';

test.describe('Contact Page Tests', () => {
  let contact: ContactPage;

  test.beforeEach(async ({ page }) => {
    contact = new ContactPage(page);
    await contact.navigate(CONTACT_URL);
  });

  test('Required fields show validation when empty', async () => {
    await contact.submitBtn.click();

    await expect(contact.firstNameError).toBeVisible();
    await expect(contact.lastNameError).toBeVisible();
    await expect(contact.emailError).toBeVisible();
    await expect(contact.subjectError).toBeVisible();
    await expect(contact.messageError).toBeVisible();
  });

  test('Email validation shows error for bad email', async () => {
    await contact.email.fill('not-an-email');
    await contact.submitBtn.click();
    await expect(contact.emailError).toBeVisible();
  });

  test('Message min length validation', async () => {
    await contact.message.fill('short');
    await contact.submitBtn.click();
    await expect(contact.messageError).toBeVisible();
  });

  test('First name max length no error', async () => {
    await contact.firstName.fill('A'.repeat(120));
    await contact.submitBtn.click();
    await expect(contact.firstNameError).not.toBeVisible();
  });

  test('Last name max length no error', async () => {
    await contact.lastName.fill('B'.repeat(120));
    await contact.submitBtn.click();
    await expect(contact.lastNameError).not.toBeVisible();
  });

  test('Submit button text is Send', async () => {
    await expect(contact.submitBtn).toHaveValue('Send');
  });

  test('Page title contains Contact', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact/);
  });

  test('Required fields submit successfully (no attachment)', async () => {
    await contact.firstName.fill('John');
    await contact.lastName.fill('Doe');
    await contact.email.fill('john@example.com');
    await contact.subject.selectOption({ index: 1 });
    await contact.message.fill('This message contains enough text to send properly.');
    await contact.submitBtn.click();
    await expect(contact.successAlert).toBeVisible({ timeout: 5000 });
  });

  test('Subject dropdown has at least 2 options', async () => {
    const options = await contact.subject.locator('option').allTextContents();
    expect(options.length).toBeGreaterThanOrEqual(2);
  });

  test('Message field can be cleared and refilled', async () => {
    await contact.message.fill('Initial message');
    await contact.message.fill('');
    await contact.message.fill('Refilled message');
    const value = await contact.message.inputValue();
    expect(value).toBe('Refilled message');
  });
});