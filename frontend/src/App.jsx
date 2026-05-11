import { useState, useEffect } from 'react'
import PostList from './components/PostList'
import PostForm from './components/PostForm'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts])
    setShowForm(false)
  }

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post._id !== postId))
  }

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">My Blog</h1>
          <p className="text-indigo-200 mt-2">Share your thoughts with the world</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200"
          >
            {showForm ? 'Cancel' : 'Create New Post'}
          </button>
        </div>

        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <PostForm onPostCreated={handlePostCreated} />
          </div>
        )}

        <PostList
          posts={posts}
          onPostDeleted={handlePostDeleted}
          onPostUpdated={handlePostUpdated}
          onRefresh={fetchPosts}
        />
      </main>

      <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-12">
        <p>&copy; 2024 My Blog. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
