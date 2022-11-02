const postResolver = require("./post");
const userResolver = require("./user");
const commentResolver = require("./comment");
const likeResolver = require("./like");

module.exports = {
  Query: {
    ...postResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation,
    ...likeResolver.Mutation,
  },
  Subscription: {
    ...postResolver.Subscription,
  },
};
