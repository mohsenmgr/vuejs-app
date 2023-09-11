// tests/foo.spec.ts
import { test, expect } from '@playwright/test';

// ****************************************************
test.use({storageState: 'storageState.json'});

test.describe('Page Name: Compile Diary',()=>{
   test('Test Compile Diary Navigation', async({page,baseURL})=>{
         let errorLogs = [];
         page.on("console", (message) => {
            if (message.type() === "error") {
               errorLogs.push(message)
            }
         });
         await page.goto('/home');  
         await Promise.all([
            page.waitForNavigation(), 
            page.click('div[role="option"] >> text=Compila il diario')
         ]);
             
         expect(page.url()).toBe(baseURL+'/home/diary');
         expect(errorLogs.length).toEqual(0);
   });

   test('Test Compile Diary Overview', async({page,baseURL})=>{
         let errorLogs = [];
         page.on("console", (message) => {
            if (message.type() === "error") {
               errorLogs.push(message)
            }
         });
         await page.goto('/home/diary');       
         await page.click('input[role="button"]');
         await page.locator('.v-btn--rounded').first().click();
         let visible = await page.locator('#diary-card').first().isVisible();
         expect(visible).toEqual(true);
         expect(errorLogs.length).toEqual(0);
   });

   test('Test Add Water', async({page})=>{
      let errorLogs = [];
      page.on("console", (message) => {
          if (message.type() === "error") {
              errorLogs.push(message)
          }
      });

      await page.goto('/home/diary');       
      await page.click('input[role="button"]');
      await page.locator('.v-btn--rounded').first().click();
      
      await new Promise(resolve => setTimeout(resolve, 1000));          
      let count = await page.locator('.btn-acqua').count();
         
      await page.locator('#btn-add').first().click();
   
      await new Promise(resolve => setTimeout(resolve, 1000));
      let count2 = await page.locator('.btn-acqua').count();

      if((count/2) < 16) {
         expect(count2-count).toEqual(2);
      } else{
         expect(count2-count).toEqual(0);
      }

      expect(errorLogs.length).toEqual(0);
   });

   test('Test Meal Colazione Card Click', async({page,baseURL})=>{
      let errorLogs = [];
      page.on("console", (message) => {
          if (message.type() === "error") {
              errorLogs.push(message)
          }
      });

      await page.goto('/home/diary');       
      await page.click('input[role="button"]');
      await page.locator('.v-btn--rounded').first().click();
      let visible = await page.locator('#diary-card').first().isVisible();
      expect(visible).toEqual(true);
      //Click on Colazione
      await Promise.all([
         page.waitForNavigation(),
         page.click('text=Colazione')
      ]);
      expect(page.url()).toBe(baseURL+'/home/diary/compileform');
      expect(errorLogs.length).toEqual(0);
   });

   test('Test Meal Mangiato Fuori Pasto',async({page,baseURL})=>{
      let errorLogs = [];
      page.on("console", (message) => {
          if (message.type() === "error") {
              errorLogs.push(message)
          }
      });
      // Click on Mangiato fuori pasto?
      await page.goto('/home/diary');  
      await page.click('input[role="button"]');
      await page.locator('.v-btn--rounded').first().click();
      let visible = await page.locator('#diary-card').first().isVisible();
      expect(visible).toEqual(true);
      await Promise.all([
         page.waitForNavigation(),
         page.click('text=Mangiato fuori pasto?')
      ]);
      expect(page.url()).toBe(baseURL+'/home/diary/compileform');

      expect(errorLogs.length).toEqual(0);
   })
});




