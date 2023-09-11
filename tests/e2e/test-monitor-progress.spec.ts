import { test, expect } from '@playwright/test';
test.use({storageState: 'storageState.json'});

test.describe('Page Name: Monitor Progress',()=>{
    
    test('Fill Dates',async({page,baseURL})=>{
        let errorLogs = [];
        page.on("console", (message) => {
            if (message.type() === "error") {
                errorLogs.push(message)
            }
        });
        await page.goto('/home/progress');
        await new Promise(resolve => setTimeout(resolve, 2000));
        expect(page.url()).toBe(baseURL+'/home/progress');
        await page.click('input[role="button"]');
        await page.click('tbody button:has-text("1")');
        await page.click('.v-menu__content.theme--light.menuable__content__active .v-picker .v-picker__body div .v-date-picker-table table tbody tr:nth-child(2) td .v-btn');
        await new Promise(resolve => setTimeout(resolve, 2000));
        if(errorLogs.length>0) console.log(errorLogs);
        expect(errorLogs.length).toEqual(0);
    })
})