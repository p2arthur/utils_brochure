import useWalletConnection from "@/public/tutorials/app-tutorials/wallet-connection";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Test initial render = Connect wallet tutorial + corret content", () => {
  const firstRenderContent = useWalletConnection;
  test("Has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Algorand Educational Hub");
  });

  test("Page hero equals tutorial title + description", async ({ page }) => {
    const heroTitle = page.getByTestId("tutorial-title");
    const heroDescription = page.getByTestId("tutorial-description");
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toHaveText(firstRenderContent.title);
    await expect(heroDescription).toBeVisible();
    await expect(heroDescription).toHaveText(firstRenderContent.description);
  });

  test("Test if the content of the code display corresponds to the firstRenderContent", async ({
    page,
  }) => {
    const tutorialCode = page.getByTestId("code-display");
    await expect(tutorialCode).toBeVisible();
    await expect(tutorialCode).toContainText(firstRenderContent.codeExample);
  });
});
