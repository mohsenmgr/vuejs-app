# patient-front

Foodcoach Patient front-end application. In this application patient is able to follow a diet plan, review recommended foods for each daily meal and see the progres in terms of weight loss/gain among other functionalities. This project is built on top of Vuetify which makes it cross platform (Mobile,Desktop,Handheld).

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Run Unit Tests

```
npm run test:unit
```

### Run E2E Tests

Make sure playwright package is installed.
Make sure Database is Clean.
Make sure playwright playwright.config.ts file has the correct Website address.

0.Installing Playwright browsers (Webkit, Chromium, Nightly) => Note: Chromium core is faster than other options.

```
npx playwright install
```

Run the following command to execute e2e tests

```
npm run playwright
```

#### Other Useful Commands:

To use these options, you should change directory.

```
cd ./tests/e2e/
```

Run Tests in headed Mode:

```
npx playwright test --headed
```

Run Tests indicating browser(s)

```
npx playwright test --browser="firefox" --headed
```
