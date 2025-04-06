import { test as base, expect, Page, TestInfo } from '@playwright/test';

type MyFixtures = {
    openWidgetPage: Page;
    projectName: string
};

export const test = base.extend<MyFixtures>({

  openWidgetPage: async ({ page }, use) => {
        await page.goto("widget/qa1/demo.html");
        await use(page);
    },
      projectName: async ({}, use, { project }) => {
        const name = project.name;
        await use(name);
      },
});

export { expect };