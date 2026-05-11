import { useState } from 'react'

export default function EditPostForm({ post, onEditComplete, onCancel }) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [author, setAuthor] = useState(post.author)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          author
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update post')
      }

      const updatedPost = await response.json()
      onEditComplete(updatedPost)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Post</h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="edit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="edit-author" className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <input
          id="edit-author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="edit-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></textarea>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 disabled:bg-gray-400"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
