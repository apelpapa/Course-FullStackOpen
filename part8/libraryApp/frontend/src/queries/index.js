import { gql } from '@apollo/client'

export const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const GET_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      genres
    }
  }
`

export const ADD_BOOK = gql`
    mutation addNewBook ($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook (
            title: $title
            author: $author
            published: $published,
            genres: $genres
         ) {
            title
            author
            published
            genres
        }
    }
`

export const EDIT_BORN = gql`
    mutation editBornYear ($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name
            setBornTo: $setBornTo
        ) {
            name
            born
            bookCount
        }
    }
`