import {knex} from './connection.js';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


//good refeence : https://github.com/apollographql/apollo-server

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Student {
    id: ID!
    name: String!
  }

  type Query {
    students: [Student]
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      students: async() => await getStudents(),
    },
  }; 


const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server);

console.log(`🚀  Server ready at ${url}`);

  async function getStudents(){
    const result = await knex.select().from('student');
    return result;
}


//here is test getStudents()
// (async()=>{
//     const students = await getStudents();
//     console.log(students);
//     const { url } =  startStandaloneServer(server, {
//         listen: { port: 4000 },
//       });
//       console.log(`🚀  Server ready at: ${url}`);
// })();

