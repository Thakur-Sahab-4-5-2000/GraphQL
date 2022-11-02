const postSchema = require("../../models/postSchema");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await postSchema.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await postSchema.findById(postId);
        if (post) {
          return post;
        }
      } catch (err) {
        throw new Error("Post is not available");
      }
    },
  },
  Mutation: {
    async createPost(_, { postInput: { body } }, context) {
      const user = checkAuth(context);
      const newPost = new postSchema({
        body,
        userID: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      context.pubsub.publish("NEW_POST", {
        newPost: post,
      });
      return post;
    },
    async deletePost(_, { postId }, context) {
      try {
        const user = checkAuth(context);
        const post = await postSchema.findById(postId);
        if (user.id === post.userID) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error("Post cannot be deleted");
      }
    },
    async updatePost(_, { postId, body }, context) {
      try {
        const user = checkAuth(context);
        const post = await postSchema.findById(postId);
        if (post.userID === user.id) {
          post.body = body;
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error("Post cannot be updated");
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
