import React, { Component } from 'react'
import { getAll, update } from './BooksAPI'
import BookShelf from './BookShelf'

export default class List extends Component {
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
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf title="Currently Reading" books={this.state.myBooks.filter((book) => (book.shelf === "currentlyReading"))} onChange={(details) => this.updateBook(details)} />
                        <BookShelf title="Want to Read" books={this.state.myBooks.filter((book) => (book.shelf === "wantToRead"))} onChange={(details) => this.updateBook(details)} />
                        <BookShelf title="Read" books={this.state.myBooks.filter((book) => (book.shelf === "read"))} onChange={(details) => this.updateBook(details)} />
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={() => {
                        this.props.history.push("/search")
                    }}>Add a book</button>
                </div>
            </div>
        )
    }
}
