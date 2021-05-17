import React, { Component } from 'react'
import { getAll } from './BooksAPI'
import BookShelf from './BookShelf'

export default class List extends Component {
    state = {
        allBooks: [],
    }

    componentDidMount() {
        getAll().then((result => {
                console.log("result=", result)
                this.setState({
                    allBooks: result
                })
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
                        <BookShelf title="Currently Reading" books={this.state.allBooks.filter((book) => (book.shelf === "currentlyReading"))} onChange={() => ({})} />
                        <BookShelf title="Want to Read" books={this.state.allBooks.filter((book) => (book.shelf === "wantToRead"))} onChange={() => ({})} />
                        <BookShelf title="Read" books={this.state.allBooks.filter((book) => (book.shelf === "read"))} onChange={() => ({})} />                        
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
