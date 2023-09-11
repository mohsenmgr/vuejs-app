import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    use: {
        baseURL: 'http://localhost:8080',
        browserName: 'firefox',
        headless: true,
    },
    globalSetup: require.resolve('./global-setup'),
    globalTimeout: 840000, // Maximum time the whole test suite can run,
    timeout: 60000,        // Timeout for each test

};
export default config;
