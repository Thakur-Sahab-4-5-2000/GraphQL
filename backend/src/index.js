const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const mongoDb = require("../mongoDb");
const resolvers = require("../graphql/resolvers/index");
const typeDefs = require("../graphql/typedefs");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000;

const pubsub = new PubSub();

const app = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoDb();

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
