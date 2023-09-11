// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/');
  await page.click('text=Username');
  await page.fill('input[name="login"]', 'bianca@gmail.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('text=ACCEDI');
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;