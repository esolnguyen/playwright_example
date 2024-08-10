import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ICustomWorld } from '../support/custom-world';

let loginPage: LoginPage;

Given('the user is on the login page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('The page object is not defined.');
  }

  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('the user enters a valid email {string}', async function (email: string) {
  await loginPage.enterEmail(email);
});

When('the user enters a valid password {string}', async function (password: string) {
  await loginPage.enterPassword(password);
});

When('the user enters an invalid email {string}', async function (email: string) {
  await loginPage.enterEmail(email);
});

When('the user leaves the email field empty', async function () {
  await loginPage.enterEmail('');
});

When('the user leaves the password field empty', async function () {
  await loginPage.enterPassword('');
});

When('the user clicks on the login button', async function () {
  const isButtonEnabled = await loginPage.isLoginButtonEnabled();
  if (isButtonEnabled) {
    await loginPage.clickLogin();
  } else {
    throw new Error('The login button is disabled and cannot be clicked.');
  }
});

Then('the user should be redirected to the dashboard page', async function () {
  await this.page?.waitForNavigation({ waitUntil: 'networkidle' });
  const currentUrl = await this.page?.url();
  expect(currentUrl).toContain('/customers');
});

Then('the user should see email validaiton error', async function () {
  const errorMessage = await loginPage.getEmailError();
  expect(errorMessage).toContain('A valid email address is required');
});

Then('the user should see password validaiton error', async function () {
  const errorMessage = await loginPage.getPasswordError();
  expect(errorMessage).toContain(
    'Password is required (6 or more characters with at least one number)',
  );
});

Then('the password field should be masked', async function () {
  const isMasked = await loginPage.isPasswordMasked();
  expect(isMasked).toBeTruthy();
});

Then(
  'the form should be accessible to all users including those using accessibility tools',
  async function () {},
);

Then('the login button should be disabled', async function () {
  const isButtonEnabled = await loginPage.isLoginButtonEnabled();
  expect(isButtonEnabled).toBeFalsy();
});
