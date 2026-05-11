import PostCard from './PostCard'

export default function PostList({ posts, onPostDeleted, onPostUpdated, onRefresh }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No posts yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {posts.map(post => (
        <PostCard
          key={post._id}
          post={post}
          onPostDeleted={onPostDeleted}
          onPostUpdated={onPostUpdated}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  )
}
