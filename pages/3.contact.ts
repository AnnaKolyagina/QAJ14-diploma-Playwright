// pages/ContactPage.ts
import { Page, Locator } from '@playwright/test';
import BasePage from './1.base';

export default class ContactPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly subject: Locator;
  readonly message: Locator;
  readonly attachment: Locator;
  readonly submitBtn: Locator;
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly emailError: Locator;
  readonly subjectError: Locator;
  readonly messageError: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    super(page);

    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.email = page.locator('[data-test="email"]');
    this.subject = page.locator('[data-test="subject"]');
    this.message = page.locator('[data-test="message"]');
    this.attachment = page.locator('[data-test="attachment"]');
    this.submitBtn = page.locator('[data-test="contact-submit"]');
    this.firstNameError = page.locator('[data-test="first-name-error"]');
    this.lastNameError = page.locator('[data-test="last-name-error"]');
    this.emailError = page.locator('[data-test="email-error"]');
    this.subjectError = page.locator('[data-test="subject-error"]');
    this.messageError = page.locator('[data-test="message-error"]');
    this.successAlert = page.locator('.alert-success');
  }
}