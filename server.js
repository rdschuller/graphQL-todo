import express from "express";
import { ApolloServer } from "apollo-server-express";
import dbConnection from "./db/connection/index.js";
import { typeDefs } from "./schema/schema.js";
import { resolvers } from "./schema/resolvers.js";

const startServer = async () => {
    try {
        await dbConnection();
        console.log("Successful database connection.");

        const app = express();

        // Apollo Server setup
        const server = new ApolloServer({ typeDefs, resolvers });
        await server.start();

        server.applyMiddleware({ app, path: "/graphql" }); // Now your GraphQL server will be available on /graphql endpoint
        
        app.use("/", (req, res) => res.send("Welcome to Todo App"));

        const PORT = 4000;
        app.listen(PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
};

startServer();
