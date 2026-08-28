import { create } from 'zustand'
import blogService from '../services/blogs'

export const useBlogStore = create((set, get) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs: [...blogs].sort((a, b) => b.likes - a.likes) }),

  fetchBlogs: async () => {
    const blogs = await blogService.getAll()
    set({ blogs: [...blogs].sort((a, b) => b.likes - a.likes) })
    return blogs
  },

  createBlog: async (blogObject) => {
    const newBlog = await blogService.create(blogObject)
    const currentBlogs = get().blogs
    set({ blogs: currentBlogs.concat(newBlog).sort((a, b) => b.likes - a.likes) })
    return newBlog
  },

  likeBlog: async (blog) => {
    const updatedObject = {
      user: blog.user ? (blog.user.id || blog.user._id) : undefined,
      likes: (blog.likes || 0) + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: blog.comments || [],
    }
    const updatedBlog = await blogService.update(blog.id, updatedObject)
    const currentBlogs = get().blogs
    set({
      blogs: currentBlogs
        .map((b) => (b.id === blog.id ? updatedBlog : b))
        .sort((a, b) => b.likes - a.likes),
    })
    return updatedBlog
  },

  deleteBlog: async (id) => {
    await blogService.remove(id)
    const currentBlogs = get().blogs
    set({ blogs: currentBlogs.filter((b) => b.id !== id) })
  },

  addComment: async (id, comment) => {
    const updatedBlog = await blogService.addComment(id, comment)
    const currentBlogs = get().blogs
    set({
      blogs: currentBlogs.map((b) => (b.id === id ? updatedBlog : b)),
    })
    return updatedBlog
  },
}))

export default useBlogStore
