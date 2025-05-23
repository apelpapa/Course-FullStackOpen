const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
    type Book {
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks (author: String, genre: String):  [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ) : Book
        addAuthor(
            name: String!
            born: Int
        ) : Author
        editAuthor(
            name:String!
            setBornTo: Int!
        ) : Author
    }
`;

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books;
      }
      if (args.author && !args.genre) {
        return books.filter((book) => book.author === args.author);
      }
      if (!args.author && args.genre) {
        return books.filter((book) => {
          return book.genres.includes(args.genre.toLowerCase());
        });
      }
      if (args.author && args.genre) {
        const filteredBooks = books.filter(
          (book) => book.author === args.author
        );
        console.log(filteredBooks);
        return filteredBooks.filter((book) => {
          return book.genres.includes(args.genre.toLowerCase());
        });
      }
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (author) => {
      return books.filter((book) => book.author === author.name).length;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const checkAuthor = authors.find(
        (author) => author.name.toLowerCase() === args.author.toLowerCase()
      );
      if (!checkAuthor) {
        const author = { name: args.author, id: uuid() };
        authors = authors.concat(author);
      }
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      return book;
    },
    addAuthor: (root, args) => {
      const author = { ...args, id: uuid() };
      authors = authors.concat(author);
      return author;
    },
    editAuthor: (root, args) => {
      const checkAuthor = authors.find(
        (author) => author.name.toLowerCase() === args.name.toLowerCase()
      );
      if(!checkAuthor){
        return null
      }
      const updatedAuthor = { ...checkAuthor, born: args.setBornTo };
      authors = authors.map((author) =>
        author.name != checkAuthor.name ? author : updatedAuthor
      );
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
