const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

const typeDefs = fs
  .readFileSync(path.join(__dirname, "schema.graphql"))
  .toString();

const resolvers = {
  Query: {
    user() {
      return { name: "hoge", id: "hoge" };
    }
  },
  Mutation: {
    updateUser: (root, args) => {
      return { name: "updatedhaoge", id: "hoge" };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
server.applyMiddleware({ app });

app.use(cors());
app.use(bodyParser.json());
app.listen(3001);
