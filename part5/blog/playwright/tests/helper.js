const attemptLogin = async (page, username, password) => {
  await page.getByRole("textbox", { name: "Username:" }).fill(username);
  await page.getByRole("textbox", { name: "Password:" }).fill(password);
  await page.getByRole("button", { name: "Log In" }).click();
};

const addNewBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "Add New Blog" }).click();
  await page.getByRole("textbox", { name: "Title:" }).fill(title);
  await page.getByRole("textbox", { name: "Author:" }).fill(author);
  await page.getByRole("textbox", { name: "URL:" }).fill(url);
  await page.getByRole('button', { name: 'Create' }).click()
  await page.getByText(`Title: ${title}`).waitFor()
};

const likePost = async (page, postPosition, numberLikes) => {
    await page.getByRole('button', { name: 'View Details' }).nth(postPosition)
}

export { attemptLogin, addNewBlog, likePost };