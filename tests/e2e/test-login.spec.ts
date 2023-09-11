import { test, expect } from '@playwright/test';

test.describe('Page Name: Login',()=>{


  test('Login test',async ({ page,baseURL }) => {
    let errorLogs = [];
    page.on("console", (message) => {
        if (message.type() === "error") {
            errorLogs.push(message)
        }
    });

    await page.goto(baseURL,{timeout:20000});
    await page.click('text=Username');
    await page.fill('input[name="login"]', 'bianca@gmail.com');
    await page.fill('input[name="password"]', 'password');
    
    await Promise.all([
      page.waitForNavigation(), // Waits for the next navigation
      page.click('text=ACCEDI'), // Triggers a navigation after a timeout
    ]);
    
    expect(page.url()).toBe(baseURL+'/welcome')
    expect(errorLogs.length).toEqual(0);
  });
});
