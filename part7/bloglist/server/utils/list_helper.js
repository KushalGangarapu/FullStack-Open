const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((prev, current) => {
    return (prev.likes || 0) > (current.likes || 0) ? prev : current
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCounts = _.countBy(blogs, 'author')
  const topAuthor = Object.keys(authorCounts).reduce((max, author) => {
    return authorCounts[author] > authorCounts[max] ? author : max
  })

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorLikesList = Object.keys(groupedByAuthor).map((author) => ({
    author,
    likes: groupedByAuthor[author].reduce((sum, blog) => sum + (blog.likes || 0), 0)
  }))

  return authorLikesList.reduce((max, current) => {
    return current.likes > max.likes ? current : max
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
