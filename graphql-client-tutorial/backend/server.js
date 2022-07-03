// node server.jsで起動

const {ApolloServer, gql} = require("apollo-server");

const books = [
    {
        title: "吾輩は猫である",
        author: "夏目漱石"
    },
    {
        title: "走れメロス",
        author: "太宰治"
    },
]

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`
const resolvers = {
    Query:{
        books: () => books,
    }
}


const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`server is running at ${url}`)
})