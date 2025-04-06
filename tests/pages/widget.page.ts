import { Page } from "@playwright/test";
import { AsistantComp } from "./components/assistant";

export class WidgetPage {
    constructor(readonly page: Page) { }

    readonly assistantComp = new AsistantComp(this.page);
    // No dataTestId for locator in DOM. It is a common practice to effectively define stable locators
    readonly openChatbutton = this.page.locator(`//button[text()='Open Chat']`);

    readonly callUsButton = this.page.locator(`#icw--call--button`);

    readonly assistantLauncher = this.page.locator(`#icw--launcher`);

    readonly assistantPicture = this.page.locator(`#icw--avatar-container img`);

    async openAssistant() {
        await this.assistantLauncher.click()
        return this.assistantComp;
    }
}