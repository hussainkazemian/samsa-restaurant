// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('menu', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('http://127.0.0.1:3000'); // Change this to your local app URL

  // Navigate to the menu page
  await page.getByRole('link', { name: 'MENU' }).click();

  // Click on a menu item and add it to the cart
  await page.getByRole('link', { name: 'Lamb Kebab - xxd' }).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  // Fill out the checkout form
  await page.getByPlaceholder('Enter your name').click();
  await page.getByPlaceholder('Enter your name').fill('Hussain');
  await page.getByPlaceholder('Enter your name').press('Tab');
  await page.getByPlaceholder('Enter your address').fill('Testintie 1 D');
  await page.getByPlaceholder('Enter your address').press('Tab');
  await page.getByPlaceholder('Enter your credit card number').fill('123564788');

  // Submit the form
  await page.getByRole('button', { name: 'Send' }).click();

  // Navigate to the reservation page
  await page.getByRole('link', { name: 'RESERVATION' }).click();
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await page.getByRole('link', { name: 'SHOPPING CART' }).click();
  await page.getByRole('link', { name: 'MENU' }).click();
  await page.getByRole('link', { name: 'LOGIN' }).click();
  await page.getByPlaceholder('Enter your username or email').click();
  await page.getByPlaceholder('Enter your username or email').fill('javad');
  await page.getByPlaceholder('Enter your username or email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('123456');
  await page.getByPlaceholder('Enter your password').press('Tab');
  await page.getByRole('button', { name: 'Login' }).press('Enter');
  await page.getByRole('button', { name: 'Login' }).click();
});


test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.getByRole('link', { name: 'REGISTER' }).click();
  await page.getByPlaceholder('Enter your username').click();
});



test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Lentil Soup (Veggie)' }).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.getByPlaceholder('Enter your name').click();
  await page.getByPlaceholder('Enter your name').fill('james');
  await page.getByPlaceholder('Enter your name').press('Tab');
  await page.getByPlaceholder('Enter your name').dblclick();
  await page.getByPlaceholder('Enter your name').fill('hussaink');
  await page.getByPlaceholder('Enter your name').press('Tab');
  await page.getByPlaceholder('Enter your address').fill('suoenstie 1 d 35');
  await page.getByPlaceholder('Enter your address').press('Tab');
  await page.getByPlaceholder('Enter your credit card number').fill('1254789');
  await page.getByRole('button', { name: 'Send' }).click();
});



test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await page.getByRole('link', { name: 'MENU' }).click();
  await page.getByRole('link', { name: 'Vegetarian Dishes' }).click();
  await page.getByText('Price: 10.50 €').click();
  await page.getByText('Price: 8.15 €').click();
  await page.getByRole('link', { name: 'SHOPPING CART' }).click();
  await page.getByRole('link', { name: 'SHOPPING CART' }).click();
  await page.getByRole('link', { name: 'SHOPPING CART' }).click();
  await page.getByRole('link', { name: 'MENU' }).click();
  await page.getByText('Lamb Kebab - xxd Chunks of').click();
  await page.getByText('Lamb Kebab - xxd Chunks of').click();
  await page.getByRole('link', { name: 'Lamb Kebab - xxd' }).click();
  await page.getByText('MENU RESERVATION SHOPPING CART LOGIN REGISTER').click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.getByPlaceholder('Enter your name').click();
  await page.getByPlaceholder('Enter your name').fill('test2');
  await page.getByPlaceholder('Enter your name').press('Tab');
  await page.getByPlaceholder('Enter your address').fill('tstitiem1 ');
  await page.getByPlaceholder('Enter your address').press('Tab');
  await page.getByPlaceholder('Enter your credit card number').fill('1254788');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByRole('link', { name: 'LOGIN' }).click();
  await page.getByText('MENU RESERVATION SHOPPING CART LOGIN REGISTER Login Username or Email Password').click({
    button: 'middle'
  });
  await page.getByPlaceholder('Enter your username or email').click();
  await page.getByPlaceholder('Enter your username or email').fill('javaf');
  await page.getByPlaceholder('Enter your username or email').press('Tab');
  await page.getByPlaceholder('Enter your username or email').dblclick();
  await page.getByPlaceholder('Enter your username or email').fill('javad');
  await page.getByPlaceholder('Enter your username or email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('123456');
  await page.getByText('Username or Email Password').click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'LOGOUT' }).click();
});