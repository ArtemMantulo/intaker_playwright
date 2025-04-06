import { test, expect } from '../basefixture';
import { WidgetPage } from './pages/widget.page';

let widgetPage: WidgetPage;
const answers: string[] = ["Divorce", "Child Custody", "Adoption", "Mediation"];

test.beforeEach(async ({ openWidgetPage }) => {
  widgetPage = new WidgetPage(openWidgetPage);
});

answers.forEach((answer) => {
  test(`Chat assistant choose ${answer} test`, async () => {
    const assistantComp = await widgetPage.assistantComp;
    await widgetPage.assistantLauncher.click()
    await assistantComp.verifyAnswerIsPresent(answer);
    await assistantComp.selectAnswer(answer);
    await assistantComp.page.waitForTimeout(2000)
    await expect(assistantComp.asnwerInserted).toBeInViewport({timeout: 4000});
    await expect(assistantComp.asnwerInserted).toHaveText(answer);
  });
});

test(`Chat assistant timer test`, async () => {
    test.setTimeout(150000);
    const assistantComp = await widgetPage.assistantComp;
    await widgetPage.assistantLauncher.click()
    await assistantComp.verifyTimerText(" a few seconds ago ", 10000)
    await assistantComp.verifyTimerText(" a minute ago ", 60000);
    await assistantComp.verifyTimerDontHaveText(" a few seconds ago ");
    await assistantComp.verifyTimerText(" 2 minutes ago ", 50000);
    await assistantComp.verifyTimerDontHaveText(" a minute ago ");
});

answers.forEach((answer) => {
    test(`Chat assistant refresh button for ${answer} test`, async () => {
        const assistantComp = await widgetPage.assistantComp;
        await widgetPage.assistantLauncher.click();
        await assistantComp.selectAnswer(answer);
        await assistantComp.refreshButton.click();
        await expect(assistantComp.messegetext).toHaveCount(1);
    });
  });

test(`Chat assistant cancel button test`, async () => {
    const assistantComp = await widgetPage.assistantComp;
    await widgetPage.assistantLauncher.click();
    await assistantComp.closeButton.click();
    await expect(assistantComp.assistantCompBody).not.toBeInViewport();
});

// Here you can find example of test case with steps implementation
test(`Oopen chat button logic when user has active chat session`, async () => {
  const answer = answers[0];
  const assistantComp = await widgetPage.assistantComp;

  await test.step(`Step 1: Open assistant chat.`, async () => {
    await widgetPage.assistantLauncher.click()
    await assistantComp.verifyAnswerIsPresent(answer);
  });
  await test.step(`Step 2: Select answer option.`, async () => {
    await assistantComp.selectAnswer(answer);
    await assistantComp.page.waitForTimeout(2000)
    await expect(assistantComp.asnwerInserted).toBeInViewport({timeout: 4000});
    await expect(assistantComp.asnwerInserted).toHaveText(answer);
  });
  await test.step(`Step 3: Click close button`, async () => {
    await assistantComp.closeButton.click();
  });
  await test.step(`Step 3: Click open chat`, async () => {
    await widgetPage.openChatbutton.click();
    await expect(assistantComp.messegetext).toHaveCount(3);
  });
});


test(`Chat assistant picture test`, async () => {
    await expect(widgetPage.assistantPicture).toHaveScreenshot("assistantPicture.png");
});
