import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import PostBlogForm from "./PostBlogForm";

vi.mock("../services/blogs", () => {
  return {
    default: {
      postBlog: vi.fn(),
      getAll: vi.fn(),
      updateBlog: vi.fn(),
      deleteBlog: vi.fn()
    }
  };
});

import blogService from "../services/blogs";

const oldBlogs = [
  {
    id: "1",
    title: "Old Test Title 1",
    author: "Old Test Author 1",
    likes: 101,
    url: "www.oldtesturl1.com",
    user: { name: "Old Test User 1" },
  },
  {
    id: "2",
    title: "Old Test Title 2",
    author: "Old Test Author 2",
    likes: 102,
    url: "www.oldtesturl2.com",
    user: { name: "Old Test User 2" },
  },
];

describe("Posting Blogs Tests", () => {
  test("Post Form", async () => {
    
    const mockSetBlogs = vi.fn();
    const mockSetMessage =vi.fn()

    const user = userEvent.setup();

    const { container } = render(
      <PostBlogForm
        user={{ token: "Test-Token" }}
        blogs={oldBlogs}
        setBlogs={mockSetBlogs}
        setMessage={mockSetMessage}
      />
    );
    
    const titleInput = container.querySelector('#titleInput');
    const authorInput = container.querySelector('#authorInput');
    const urlInput = container.querySelector('#urlInput');
    const submitButton = screen.getByText('Create');
    
    await user.type(titleInput, "New Title 1");
    await user.type(authorInput, "New Author 1");
    await user.type(urlInput, "www.newurl.com");
    await user.click(submitButton);
    
    await vi.waitFor(() => {
      expect(blogService.postBlog).toHaveBeenCalledWith(
        {
          title: "New Title 1",
          author: "New Author 1",
          url: "www.newurl.com"
        },
        "Test-Token"
      );
    });
  });
});