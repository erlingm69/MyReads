import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { getAll, update } from './BooksAPI'
import List from './List'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    myBooks: [],
  }

  async componentDidMount() {
    const books = await getAll();

    this.setState({
      myBooks: books
    })
  }

  updateBook(details) {
    // A book was updated and assigned a new shelf.
    this.setState((prev) => {
      let newMyBooks = [];
      // Remove the updated book if it exists
      newMyBooks = prev.myBooks.filter((book) => (book.id !== details.id))
      // if the updated book shelf is not none then add it
      if (details.shelf !== "none") {
        newMyBooks = newMyBooks.concat([details])
      }

      return {
        myBooks: newMyBooks
      }
    })

    // Now update the server through the API too
    update(details, details.shelf).then((result => {
    }))
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/"
            render={({ history }) => <List history={history}
              books={this.state.myBooks}
              onChange={(details) => this.updateBook(details)} />} />
          <Route exact path="/search"
            render={({ history }) => <Search history={history}
              books={this.state.myBooks}
              onChange={(details) => this.updateBook(details)} />} />
        </BrowserRouter>
      </div>)
  }
}

export default BooksApp
