import { useState } from 'react'
import EditPostForm from './EditPostForm'

export default function PostCard({ post, onPostDeleted, onPostUpdated, onRefresh }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true)
      try {
        const response = await fetch(`/api/posts/${post._id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          onPostDeleted(post._id)
        }
      } catch (error) {
        console.error('Error deleting post:', error)
        alert('Failed to delete post')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleEditComplete = (updatedPost) => {
    onPostUpdated(updatedPost)
    setIsEditing(false)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <EditPostForm
          post={post}
          onEditComplete={handleEditComplete}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  return (
    <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>By <span className="font-semibold text-gray-700">{post.author}</span></span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>

      <p className="text-gray-700 mb-6 leading-relaxed">{post.content}</p>

      <div className="flex gap-3 justify-end">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200 disabled:bg-gray-400"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </article>
  )
}
