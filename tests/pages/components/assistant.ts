import { expect, Page } from "@playwright/test";

export class AsistantComp {
    constructor(readonly page: Page) {}

    readonly assistantCompIframeLoc = this.page.frameLocator("iframe#icw--frame");

    readonly assistantCompBody = this.assistantCompIframeLoc.locator(`body`); 

    readonly messegetext = this.assistantCompIframeLoc.locator(".message-wrapper app-message-text div.ng-star-inserted")
    
    readonly welcomeMessage = this.assistantCompIframeLoc.locator(`.message-wrapper .message-body`).nth(0); 

    readonly asnwerPanel = this.assistantCompIframeLoc.locator(`.message-wrapper .message-body`).nth(1);

    readonly sessionTimer = this.assistantCompIframeLoc.locator(`div.time`);

    readonly asnwerInserted = this.asnwerPanel.locator(`span`);

    readonly refreshButton = this.assistantCompIframeLoc.locator("[tooltip = 'Refresh']");

    readonly closeButton = this.assistantCompIframeLoc.locator("[tooltip = 'Close']");

    async verifyAnswerIsPresent(answerText:string) {
    
        let answer =  this.asnwerPanel.locator("span.content span", { hasText: answerText })
        await expect.soft(answer).toBeVisible();
        await expect.soft(answer).toBeInViewport()
    }

    async selectAnswer(answerText:string) {
        await this.asnwerPanel.locator("span.content span", { hasText: answerText }).click()
    }


    async verifyTimerText(timerText: string, timeout: number) {
        await expect(this.sessionTimer).toHaveText(timerText, { timeout });
    }

    async verifyTimerDontHaveText(timerText: string, timeout: number = 5000) {
        await expect(this.sessionTimer).not.toHaveText(timerText, { timeout });
    }
}