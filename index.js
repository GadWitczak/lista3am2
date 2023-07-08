import fetch from "node-fetch"

let posts, users

async function getInfo() {
  let response = await fetch('https://jsonplaceholder.typicode.com/posts')
  posts = await response.json()

  response = await fetch('https://jsonplaceholder.typicode.com/users')
  users = await response.json()

  const newPosts = posts.map(post => {
    const user = users.find(user => user.id === post.userId)
    return {
      ...post,
      userId: user ? user.name : null
    }
  })

  return newPosts
}

// Function that retruns newPosts orginized by either name or title field
async function getPostsBy(field) {
  const newPosts = await getInfo()
  return newPosts.sort((a, b) => {
    if (a[field] < b[field]) return -1
    if (a[field] > b[field]) return 1
    return 0
  })
}

// stores the newPosts orginized by name in a variable
const postsByName = await getPostsBy('title')
console.log(postsByName)