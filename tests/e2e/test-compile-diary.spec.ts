import { test, expect } from '@playwright/test';
test.use({storageState: 'storageState.json'});

test.describe('Page Name: Compile Form',()=>{
    test('Test Add Food in Meal', async({page,baseURL})=>{
        let errorLogs = [];
        page.on("console", (message) => {
            if (message.type() === "error") {
               errorLogs.push(message)
            }
        });

        await page.goto('/home/diary');       
        await page.click('input[role="button"]');
        await page.locator('.v-btn--rounded').nth(0).click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        let visible = await page.locator('#diary-card').first().isVisible();
        expect(visible).toEqual(true);
        //Click on Colazione
        await Promise.all([
            page.waitForNavigation(),
            page.click('text=Colazione')
        ]);
        expect(page.url()).toBe(baseURL+'/home/diary/compileform');
        await new Promise(resolve => setTimeout(resolve, 2000));
        let foods =  await page.locator('.custom-left').allInnerTexts();
        let res = foods.includes('Mirtilli')
        if(!res){
            //Add recommended food
            await page.locator('.btn-add-food').first().click();
            await page.click('text=​Quantita');
            await page.click('text=Porzione media');
            await page.click('div[role="document"] button:has-text("SALVA")');
            await page.click('input[role="button"]');
            await page.click('span:has-text("9")');
            await page.click('text=00');
            await Promise.all([
                page.waitForNavigation(),
                page.click('button:has-text("SALVA")')
            ]);
            let cards = page.locator('.meal-card');
            let status = (await cards.first().locator('.card-status').innerText()).trim();
            expect(status).toEqual('COMPILATO');

            expect(errorLogs.length).toEqual(0);

        }
    });

    test('Edit Food',async({page,baseURL})=>{
        let errorLogs = [];
         page.on("console", (message) => {
            if (message.type() === "error") {
               errorLogs.push(message)
            }
         });

        await page.goto('/home/diary');       
        await page.click('input[role="button"]');
        await page.locator('.v-btn--rounded').nth(0).click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        let visible = await page.locator('#diary-card').first().isVisible();
        expect(visible).toEqual(true);

        //Click on Colazione
        await Promise.all([
            page.waitForNavigation(),
            page.click('text=Colazione')
        ]);
        expect(page.url()).toBe(baseURL+'/home/diary/compileform');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        let locator = page.locator('.btn-edit-food').first();
        visible = await locator.isVisible();
        if(visible){
            await locator.click();
            await page.click('text=​Quantita');
            await page.click('text=Porzione grande');
            await page.click('div[role="document"] button:has-text("SALVA")');
            await Promise.all([
                page.waitForNavigation(),
                page.click('button:has-text("SALVA")')
            ]);       
            expect(page.url()).toBe(baseURL+'/home/diary');
        }

        expect(errorLogs.length).toEqual(0);
    })

    test('Delete Food',async({page,baseURL})=>{
        let errorLogs = [];
         page.on("console", (message) => {
            if (message.type() === "error") {
               errorLogs.push(message)
            }
         });

        await page.goto('/home/diary');       
        await page.click('input[role="button"]');
        await page.locator('.v-btn--rounded').nth(0).click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        let visible = await page.locator('#diary-card').first().isVisible();
        expect(visible).toEqual(true);
        //Delete food item
        await Promise.all([
            page.waitForNavigation(),
            page.click('text=Colazione')
        ]);
        expect(page.url()).toBe(baseURL+'/home/diary/compileform');
        await new Promise(resolve => setTimeout(resolve, 1000));
        let locator = page.locator('.btn-edit-food').first();
        visible = await locator.isVisible();
        if(visible){
            await locator.click();
            await page.locator('.btn-delete-food').first().click();
            await Promise.all([
                page.waitForNavigation(),
                page.click('button:has-text("SALVA")')
            ]);       
            expect(page.url()).toBe(baseURL+'/home/diary');
        }

        expect(errorLogs.length).toEqual(0);
    })

    test('Search Food',async({page,baseURL})=>{
        let errorLogs = [];
        page.on("console", (message) => {
            if (message.type() === "error") {
               errorLogs.push(message)
            }
        });

        await page.goto('/home/diary');       
        await page.click('input[role="button"]');
        await page.locator('.v-btn--rounded').nth(0).click();
        //Click on Colazione
        await Promise.all([
            page.waitForNavigation(),
            page.click('text=Colazione')
        ]);
        expect(page.url()).toBe(baseURL+'/home/diary/compileform');
        await new Promise(resolve => setTimeout(resolve, 1000));

        let foods =  await page.locator('.custom-left').allInnerTexts();
        let res = foods.includes('Pizza al formaggio')

        if(!res){
            await new Promise(resolve => setTimeout(resolve, 1000));
            //Fill the time of meal
            await page.click('input[role="button"]');
            await page.click('span:has-text("9")');
            await page.click('text=05');
            //Search food [pizza]
            await page.click('#search-food-txt');
            await page.fill('#search-food-txt', 'pizza');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await page.click('div div:has-text("Pizza")');
            await page.click('text=​Quantita');
            await page.click('text=Porzione media');
            await page.click('div[role="document"] button:has-text("SALVA")');
            await Promise.all([
                    page.waitForNavigation(),
                    page.click('button:has-text("SALVA")')
                ]);
            await new Promise(resolve => setTimeout(resolve, 1000));
            expect(page.url()).toBe(baseURL+'/home/diary');
            let cards = page.locator('.meal-card');
            let status = (await cards.first().locator('.card-status').innerText()).trim();
            expect(status).toEqual('COMPILATO');
        }
        expect(errorLogs.length).toEqual(0);
    });

    test('Test Skipped Meal', async({page,baseURL})=>{
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
        let visible = await page.locator('#diary-card').first().isVisible();
        expect(visible).toEqual(true);

        //Click on Colazione
        await Promise.all([
            page.waitForNavigation(),
            page.click('text=Colazione')
        ]);
        expect(page.url()).toBe(baseURL+'/home/diary/compileform');

        //Switch skipped 
        let swtch = page.locator('input[role="switch"]').first();
        let skippedAttr =  await swtch.getAttribute('aria-checked');
        let bool = (skippedAttr !== 'false');
        // enable skip save the meal
        // check if status is COMPILATO
        if(!bool)
        {
            await page.click('.v-input--selection-controls__ripple');
            skippedAttr = await swtch.getAttribute('aria-checked');
            expect(skippedAttr).toEqual('true');
            await Promise.all([
                page.waitForNavigation(),
                page.click('button:has-text("SALVA")')
            ]);
            expect(page.url()).toBe(baseURL+'/home/diary');
            //this ensures the page content is completely updated
            await new Promise(resolve => setTimeout(resolve, 1000));
            let cards = page.locator('.meal-card');
            let status = (await cards.first().locator('.card-status').innerText()).trim();
            expect(status).toEqual('COMPILATO');
        }
        // disable Skip food switch, fill the time and save 
        // check if status is back to DA COMPILARE
        else {
            await page.click('.v-input--selection-controls__ripple');
            skippedAttr = await swtch.getAttribute('aria-checked');
            expect(skippedAttr).toEqual('false');
            page.click('input[role="button"]');
            await page.click('div[role="menu"] >> text=9');
            await page.click('text=00');
            await Promise.all([
                page.waitForNavigation(),
                page.click('button:has-text("SALVA")')
            ]);
            expect(page.url()).toBe(baseURL+'/home/diary');
            //this ensures the page content is completely updated
            await new Promise(resolve => setTimeout(resolve, 1000));
            let cards = page.locator('.meal-card');
            let status = (await cards.first().locator('.card-status').innerText()).trim();
            expect(status).toEqual('DA COMPILARE');
        }

        expect(errorLogs.length).toEqual(0);

    })
});