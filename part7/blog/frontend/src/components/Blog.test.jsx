import { render, screen } from "@testing-library/react";
import { beforeEach, describe, test } from "vitest";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog Display Tests", () => {
  beforeEach(() => {
    render(
      <Blog
        blog={{
          title: "Test Title 1",
          author: "Test Author 1",
          likes: 99,
          url: "www.testurl.com",
          user: { name: "Test User 1" },
        }}
      />,
    );
  });

  test("Not Toggled Test", () => {
    screen.getByText("Test Title 1", { exact: false });
    screen.getByText("Test Author 1", { exact: false });
    const likeElement = screen.queryByText("99", { exact: false });
    expect(likeElement).toBeNull();
    const urlElement = screen.queryByText("www.testurl.com", { exact: false });
    expect(urlElement).toBeNull();
  });

  test("Toggled Test", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View Details", { exact: false });
    await user.click(button);

    screen.getAllByText("Test Title 1", { exact: false });
    screen.getAllByText("Test Author 1", { exact: false });
    screen.getByText("99", { exact: false });
    screen.getByText("www.testurl.com", { exact: false });
  });
});

test("Like Button Clicked Twice", async () => {
  const mockLike = vi.fn();

  const { container } = render(
    <Blog
      blog={{
        id: "123",
        title: "Test Title 1",
        author: "Test Author 1",
        likes: 99,
        url: "www.testurl.com",
        user: { name: "Test User 1" },
      }}
      user={{ token: "Test-Token" }}
      setBlogs={mockLike}
    />,
  );

  const user = userEvent.setup();
  const viewButton = screen.getByText("View Details", { exact: false });
  await user.click(viewButton);

  const likeButton = screen.getByRole("button", { name: /like/i });
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockLike.mock.calls).toHaveLength(2);
});
