import { test, expect } from '@playwright/test';
test.use({storageState: 'storageState.json'});

test.describe('Page Name: Add Weight',()=>{
    

    test('Check if Exists first Weight', async({page,baseURL})=>{
        await page.goto('/home');       
        await Promise.all([
            page.waitForNavigation(), 
            page.click('div[role="list"] >> text=Aggiungi un peso')
        ]);
        expect(page.url()).toBe(baseURL+'/home/weighing');
        await new Promise(resolve => setTimeout(resolve, 2000));
        let numberOfRows = await page.locator('.tr-container-with-border').count();
        expect(numberOfRows).toBeGreaterThanOrEqual(2);
    });
    
    test('Test Add Weight', async({page,baseURL})=>{
        let errorLogs = [];
        page.on("console", (message) => {
            if (message.type() === "error") {
               errorLogs.push(message)
            }
        });

        function getRandomInt(min, max) { 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        await page.goto('/home');       
        await Promise.all([
            page.waitForNavigation(), 
            page.click('div[role="list"] >> text=Aggiungi un peso')
        ]);
        expect(page.url()).toBe(baseURL+'/home/weighing');

        await new Promise(resolve => setTimeout(resolve, 2000));
        /** select a random day which is not already in the table */
        let dates = await page.locator('.date').allInnerTexts();
        let dayArray = [];
        dates.forEach((elem)=>{
            elem = elem.trim();
            dayArray.push(parseInt(elem.substr(8,elem.length)));
        })

        let randomDay = getRandomInt(1,3);
        while(dayArray.includes(randomDay)){
            randomDay = getRandomInt(1,3);
        }
        let strDay = randomDay.toString()

        let numberOfRows = await page.locator('.tr-container-with-border').count();
        await page.click('button:has-text("REGISTRA UN PESO")');
        await page.click('input[role="button"]');
        await page.click(`tbody button:has-text("${strDay}")`);
        await page.click('text=​Orario');
        await page.click('text=Mattina - dopo la colazione');
        await page.click('text=​Peso >> input[type="text"]');
        let weightInput = page.locator('#w-input-weight');
        weightInput.fill('77.7');
        await page.click('button:has-text("SALVA")');

        await new Promise(resolve => setTimeout(resolve, 1000));
        let numberOfRows2 = await page.locator('.tr-container-with-border').count();
        expect(numberOfRows2).toBeGreaterThan(numberOfRows);

        expect(errorLogs.length).toEqual(0);

    });

    test('Test Edit Weight',async({page,baseURL})=>{
        let errorLogs = [];
        page.on("console", (message) => {
            if (message.type() === "error") {
               errorLogs.push(message)
            }
        });

        let selectArray = ['Mattina - prima della colazione','Mattina - dopo la colazione',
        'Sera - prima di cena', 'Sera - dopo di cena'];
        let expectedWeight = '79.99';
        /** */
        await page.goto('/home');       
        await Promise.all([
                page.waitForNavigation(), 
                page.click('div[role="list"] >> text=Aggiungi un peso')
            ]);
        expect(page.url()).toBe(baseURL+'/home/weighing');
        await new Promise(resolve => setTimeout(resolve, 1000));
        let count = await page.locator('.btn-edit').count();
        
        if(count>2){
            //** find the first visible edit button
            let i=0;
            let visible = await page.locator('.btn-edit').nth(i).isVisible();
            for(i; i<count && !visible;i++){
                visible = await page.locator('.btn-edit').nth(i).isVisible(); 
            }
            i--;
            //** 
            await page.locator('.btn-edit').nth(i).click();
            let selected = await page.locator('.v-select__selections').first().innerText();
            let selectedNew = selectArray.filter(elem => elem !==selected).pop();
            await page.locator('#w-input-time').first().click();
            await page.click(`text="${selectedNew}"`);
            page.locator('#w-input-weight').fill(expectedWeight);
            await page.click('button:has-text("SALVA")');

            let weights = await page.locator('.label-weight').allInnerTexts();
            let weight = weights[1].substr(0,weights[1].length-2);
            weight = weight.trim();
            expect(weight).toEqual(expectedWeight);
        }

        expect(errorLogs.length).toEqual(0);
    })

    test('Test Delete Weight',async({page,baseURL})=>{
        let errorLogs = [];
        page.on("console", (message) => {
            if (message.type() === "error") {
               errorLogs.push(message)
            }
        });

        await page.goto('/home/weighing');
        await new Promise(resolve => setTimeout(resolve, 1000));
        expect(page.url()).toBe(baseURL+'/home/weighing');

        let count = await page.locator('.btn-edit').count();
        if(count>2){
            //** find the first visible edit button
            let i=0;
            let visible = await page.locator('.btn-edit').nth(i).isVisible();
            for(i; i<count && !visible;i++){
                visible = await page.locator('.btn-edit').nth(i).isVisible(); 
            }
            i--;
            //** 
            let numberOfRows = await page.locator('.tr-container-with-border').count();
            await page.locator('.btn-edit').nth(i).click();
            await page.locator('#btn-delete').first().click();
            let numberOfRows2 = await page.locator('.tr-container-with-border').count();

            expect(numberOfRows).toBeGreaterThan(numberOfRows2);
        }

        expect(errorLogs.length).toEqual(0);
    })

});