const { test, expect, beforeEach, describe } = require("@playwright/test");
const { attemptLogin, addNewBlog, likePost } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users/", {
      data: { username: "test1", name: "Test User 1", password: "test1" },
    });
    await request.post("/api/users/", {
      data: { username: "test2", name: "Test User 2", password: "test2" },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const loginHeader = await page.getByText("Login");
    await expect(loginHeader).toBeVisible();
  });

  test("Valid Login Attempt", async ({ page }) => {
    await attemptLogin(page, "test1", "test1");
    await expect(page.getByText("BlogMania")).toBeVisible();
  });

  test("Invalid Login Attempt", async ({ page }) => {
    await attemptLogin(page, "testwrong", "testwrong");
    const errorDiv = await page.locator(".errorMessage");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
  });

  describe("When Logged In", () => {
    beforeEach(async ({ page }) => {
      await attemptLogin(page, "test1", "test1");
      await addNewBlog(
        page,
        "Test Title 1",
        "Test Author 1",
        "www.testurl1.com"
      );
      await addNewBlog(
        page,
        "Test Title 2",
        "Test Author 2",
        "www.testurl2.com"
      );
      await addNewBlog(
        page,
        "Test Title 3",
        "Test Author 3",
        "www.testurl3.com"
      );
    });

    test("New Blog Can Be Created", async ({ page }) => {
      await addNewBlog(
        page,
        "Test Title 4",
        "Test Author 4",
        "www.testurl4.com"
      );
      await expect(page.getByText("Title: Test Title 4")).toBeVisible();
    });

    test("Blog Can Be Liked", async ({ page }) => {
      await page.getByRole("button", { name: "View Details" }).first().click();
      await page.getByRole("button", { name: "Like" }).click();
      await expect(page.getByText("Likes: 1 Like")).toBeVisible();
      await page.getByRole("button", { name: "Like" }).click();
      await expect(page.getByText("Likes: 2 Like")).toBeVisible();
    });

    test("Blog Can Be Deleted by Creator", async ({ page }) => {
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "View Details" }).first().click();
      await page.getByRole("button", { name: "Delete" }).click();
      await expect(page.getByText("Title: Test Title 1")).not.toBeVisible();
    });

    test("Delete Button Not Visible to Others", async ({ page }) => {
      await page.getByRole("button", { name: "Logout" }).click();
      await attemptLogin(page, "test2", "test2");
      await page.getByRole("button", { name: "View Details" }).first().click();
      await expect(
        page.getByRole("button", { name: "Delete" })
      ).not.toBeVisible();
    });

    describe("And When Likes Vary", () => {
      beforeEach(async ({ page }) => {
        await likePost(page, 0, 0);
        await likePost(page, 1, 3);
        await likePost(page, 2, 2);
        await page.reload();
      });

      test("Blogs Are Sorted By Likes", async ({ page }) => {
        const blogs = page.locator('.blogContainer');
        await expect(blogs.nth(0)).toContainText('Test Title 2');
        await expect(blogs.nth(1)).toContainText('Test Title 3');
        await expect(blogs.nth(2)).toContainText('Test Title 1');
      });
    });
  });
});
