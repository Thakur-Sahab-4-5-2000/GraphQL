const postSchema = require("../../models/postSchema");
const checkAuth = require("../../utils/checkAuth");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async likePost(_, { postId }, context) {
      const { username, id } = checkAuth(context);

      const post = await postSchema.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.userID === id)) {
          post.likes = post.likes.filter((like) => like.userID !== id);
        } else {
          post.likes.push({
            username,
            userID: id,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};
