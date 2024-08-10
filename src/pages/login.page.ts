import { Page } from '@playwright/test';
import { config } from '../support/config';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    const loginUrl = config.BASE_URL + '/login';
    await this.page.goto(loginUrl);
  }

  async enterEmail(email: string) {
    await this.page.fill('[data-testid="email-input"]', email);
  }

  async enterPassword(password: string) {
    await this.page.fill('[data-testid="password-input"]', password);
  }

  async clickLogin() {
    await this.page.click('[data-testid="login-button"]');
  }
  async getLoginLinkText() {
    return this.page.innerText('[data-testid="login-logout-link"]');
  }

  async isPasswordMasked() {
    const passwordInput = await this.page.$('[data-testid="password-input"]');
    const type = await passwordInput?.getAttribute('type');
    return type === 'password';
  }

  async getEmailError() {
    return this.page.innerText('[data-testid="email-error"]');
  }

  async getPasswordError() {
    return this.page.innerText('[data-testid="password-error"]');
  }

  async isLoginButtonEnabled() {
    const isDisabled = await this.page.isDisabled('[data-testid="login-button"]');
    return !isDisabled;
  }
}
