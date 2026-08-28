import PropTypes from 'prop-types'
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material'
import useField from '../hooks/useField'
import { useBlogStore } from '../stores/blogStore'

const BlogForm = ({ createBlog: propCreateBlog }) => {
  const storeCreateBlog = useBlogStore((state) => state.createBlog)
  const createBlog = propCreateBlog || storeCreateBlog

  const titleField = useField('text')
  const authorField = useField('text')
  const urlField = useField('text')

  const { reset: resetTitle, ...titleInput } = titleField
  const { reset: resetAuthor, ...authorInput } = authorField
  const { reset: resetUrl, ...urlInput } = urlField

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog({
      title: titleInput.value,
      author: authorInput.value,
      url: urlInput.value,
    })

    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <Card elevation={2} sx={{ maxWidth: 500, my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          Create new blog
        </Typography>
        <form onSubmit={addBlog} className="blog-form">
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Title"
              placeholder="title"
              id="title"
              type={titleInput.type}
              value={titleInput.value}
              onChange={titleInput.onChange}
              slotProps={{ htmlInput: { 'data-testid': 'title-input' } }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Author"
              placeholder="author"
              id="author"
              type={authorInput.type}
              value={authorInput.value}
              onChange={authorInput.onChange}
              slotProps={{ htmlInput: { 'data-testid': 'author-input' } }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="URL"
              placeholder="url"
              id="url"
              type={urlInput.type}
              value={urlInput.value}
              onChange={urlInput.onChange}
              slotProps={{ htmlInput: { 'data-testid': 'url-input' } }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            id="create-blog-button"
            data-testid="create-blog-button"
          >
            create
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func,
}

export default BlogForm
