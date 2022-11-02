const postSchema = require("../../models/postSchema");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username, id } = checkAuth(context);
      if (body.trim() === "") {
        throw new Error("Comment body must not be empty");
      }

      const post = await postSchema.find().sort({ createdAt: -1 });
      if (post) {
        post.comments.unshift({
          body,
          username,
          userID: id,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new Error("Post not found");
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { id } = checkAuth(context);
      try {
        const post = await postSchema.findById(postId);
        if (post) {
          const commentIndex = post.comments.findIndex(
            (c) => c.id === commentId
          );
          if (post.comments[commentIndex].userID === id) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (err) {
        throw new Error("Something went wrong");
      }
    },

    async updateComment(_, { postId, commentId, body }, context) {
      const { id } = checkAuth(context);
      try {
        const post = await postSchema.findByIdAndUpdate(postId);
        if (!post) {
          throw new Error("No post found with this postId");
        } else if (post) {
          const commentIndex = post.comments.findIndex(
            (c) => c.id === commentId
          );
          if (post.comments[commentIndex].userID === id) {
            post.comments[commentIndex].body = body;
            await post.save();
          }
          return post;
        }
      } catch (err) {
        throw new Error("Error", err);
      }
    },
  },
};
