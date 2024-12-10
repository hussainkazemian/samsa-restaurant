import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Red Cabbage Salad' }).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.getByPlaceholder('Enter your name').click();
  await page.getByPlaceholder('Enter your name').fill('hussain');
  await page.getByPlaceholder('Enter your name').press('Tab');
  await page.getByPlaceholder('Enter your address').fill('hussaintie 1 D');
  await page.getByPlaceholder('Enter your address').press('Tab');
  await page.getByPlaceholder('Enter your credit card number').fill('1234567788');
  await page.getByRole('button', { name: 'Send' }).click();
});


test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'LOGIN' }).click();
  await page.getByPlaceholder('Enter your username or email').click();
  await page.getByPlaceholder('Enter your username or email').fill('javad');
  await page.getByPlaceholder('Enter your username or email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
});

test('reservation', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'RESERVATION' }).click();
  await page.getByPlaceholder('Enter your full name').click();
  await page.getByPlaceholder('Enter your full name').fill('hussaink');
  await page.getByPlaceholder('Enter your full name').press('Tab');
  await page.getByPlaceholder('Enter your email address').fill('hussain@gmalil.com');
  await page.getByPlaceholder('Enter your email address').press('Tab');
  await page.getByPlaceholder('Number of Adults').fill('2');
  await page.getByPlaceholder('Number of Adults').press('Tab');
  await page.getByPlaceholder('Number of Children').fill('2');
  await page.getByPlaceholder('Number of Children').press('Tab');
  await page.getByLabel('Date').fill('2025-02-12');
  await page.getByLabel('Date').press('Tab');
  await page.getByLabel('Date').press('Tab');
  await page.getByLabel('Date').press('Tab');
  await page.getByLabel('Date').press('Tab');
  await page.getByLabel('Time').click();
  await page.getByLabel('Time').fill('21:00');
  await page.getByPlaceholder('Enter your comments or').click();
  await page.getByPlaceholder('Enter your comments or').fill('sometihngs');
  await page.getByRole('button', { name: 'Submit Reservation' }).click();
});


test('card', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Red Cabbage Salad' }).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.getByPlaceholder('Enter your name').click();
  await page.getByPlaceholder('Enter your name').fill('nihad');
  await page.getByPlaceholder('Enter your name').press('Tab');
  await page.getByPlaceholder('Enter your address').fill('nihantiene 1 ');
  await page.getByPlaceholder('Enter your address').press('Tab');
  await page.getByPlaceholder('Enter your credit card number').fill('125547777');
  await page.getByRole('button', { name: 'Send' }).click();
});

test('logout', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'LOGIN' }).click();
  await page.getByPlaceholder('Enter your username or email').click();
  await page.getByPlaceholder('Enter your username or email').fill('javad');
  await page.getByPlaceholder('Enter your username or email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('1447755');
  await page.getByRole('button', { name: 'Login' }).click();
});