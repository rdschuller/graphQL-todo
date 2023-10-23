import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

//import typeDefs and resolvers
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

//server setup
const server = new ApolloServer({
    typeDefs,
    resolvers    
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
