const gql = require("graphql-tag");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    email: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input PostInput {
    body: String!
  }

  type Like {
    id: ID!
    userID: ID!
    username: String!
    createdAt: String!
  }
  type Comment {
    id: ID!
    userID: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createPost(postInput: PostInput): Post!
    deletePost(postId: ID!): String!
    updatePost(postId: ID!, body: String!): Post!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    updateComment(postId: ID!, commentId: ID!, body: String!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;
