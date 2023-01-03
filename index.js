const express = require("express");
const data = require("./data/myApi.json");
const {
  graphql,
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
} = require("graphql");
var { graphqlHTTP } = require("express-graphql");
const app = express();
const port = 3000;

//console.log(data);

const productType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    price: { type: GraphQLInt },
    images: { type: GraphQLList },
  }),
});

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllProducts: {
      type: new GraphQLList(productType),
      resolve: () => data,
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    createUser: {
      type: new GraphQLNonNull(userType),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        //  db.query(`INSERT INTO ${parent cjkjkkjkjkjjj`)
      },
    },
    updateUser: {
      type: new GraphQLNonNull(userType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        isAdmin: { type: new GraphQLNonNull(GraphQLBoolean) },
        isVerified: { type: new GraphQLNonNull(GraphQLBoolean) },
        createdAt: { type: new GraphQLNonNull(GraphQLFloat) },
        updatedAt: { type: new GraphQLNonNull(GraphQLFloat) },
        deletedAt: { type: new GraphQLNonNull(GraphQLFloat) },
        deletedBy: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(userType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
    },
  },
});

var schema = new GraphQLSchema({
  query: RootQuery,
});

app.use(
  "/graphl",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
