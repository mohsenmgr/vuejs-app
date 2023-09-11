import { test, expect } from '@playwright/test';

// Uses storageState.json file to skip loging in every time for pages which require authentication.
// If you do not already have that file, or token is expired uncomment the line 9 
// inside the playwright.config.§§ts
// ****************************************************

//Test Home Page to see if Content is loaded 
test.use({storageState: 'storageState.json'});
test.describe('Page Name: home',()=>{
      test('Test Main Content Loaded', async({page}) => {
      let errorLogs = [];
      page.on("console", (message) => {
          if (message.type() === "error") {
              errorLogs.push(message)
          }
      });

      await page.goto('/home');
      const text = await page.innerText('#salute');
      expect(text).toBe('Ciao');
      expect(errorLogs.length).toEqual(0);
    });

    test('Test Daily Diet Plan', async({page}) => {
      let errorLogs = [];
      page.on("console", (message) => {
          if (message.type() === "error") {
              errorLogs.push(message)
          }
      });

      await page.goto('/home');
      await page.click('button:has-text("Martedì")');
      let count = await page.locator('.food-tbl').count();
      // count should be equal to 10, 5 tables for Desktop + another 5 tables for mobile view
      expect(count).toEqual(10);
      await page.click('button:has-text("Martedì")');
      count = await page.locator('.food-tbl').count();
      expect(count).toEqual(10);
      await page.click('button:has-text("Mercoledì")');
      count = await page.locator('.food-tbl').count();
      expect(count).toEqual(10);
      await page.click('button:has-text("Giovedì")');
      count = await page.locator('.food-tbl').count();
      expect(count).toEqual(10);
      await page.click('button:has-text("Venerdì")');
      count = await page.locator('.food-tbl').count();
      expect(count).toEqual(10);
      await page.click('button:has-text("Sabato")');
      count = await page.locator('.food-tbl').count();
      expect(count).toEqual(10);
      await page.click('button:has-text("Domenica")');
      count = await page.locator('.food-tbl').count();
      expect(count).toEqual(10);

      expect(errorLogs.length).toEqual(0);
    });


   
});
