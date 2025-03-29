const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require('./helper')

describe("Note App", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Test User 1",
        username: "test1",
        password: "test1",
      },
    });
    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(page.getByText("YoyoMcGee Note App 2025")).toBeVisible();
  });

  test("User can login", async ({ page }) => {
    loginWith(page, 'test1', 'test1')
    await expect(page.getByText("Test User 1 is Logged-In")).toBeVisible();
  });

  test('login fails with wrong password', async ({ page }) => {
    loginWith(page, 'wrongtest', 'wrongtest')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong Credentials')
    await expect(errorDiv).toHaveCSS('border-style','solid')
    await expect(errorDiv).toHaveCSS('color','rgb(255, 0, 0)')

    await expect(page.getByText("Test User 1 is Logged-In")).not.toBeVisible();
  })

  describe("When Logged-In", () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'test1', 'test1')
    });

    test("A New Note Can Be Created", async ({ page }) => {
      await createNote(page, 'A Note Created by Playwright')
      await expect(
        page.getByText("A Note Created by Playwright")
      ).toBeVisible();
    });

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })
  
      test('importance can be changed', async ({ page }) => {
        const otherNoteText = await page.getByText('second note')
        const otherNoteElement = await otherNoteText.locator('..')
      
        await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })
  });
});
