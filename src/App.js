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

  componentDidMount() {
    getAll().then((result => {
      console.log("result=", result)
      this.setState({
        myBooks: result
      })
    }))
  }

  updateBook(details) {
    // A book was updated and assigned a new shelf.
    // Create a new array where only the updated book is changed
    this.setState((prev) => ({
      myBooks: prev.myBooks.map((book) => (book.id === details.id ? details : book))
    }))

    // Now update the server through the API too
    update(details, details.shelf).then((result => {
      console.log("result=", result)
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
