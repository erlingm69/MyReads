import React, { Component } from 'react'
import BookShelf from './BookShelf'

export default class List extends Component {

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf title="Currently Reading" books={this.props.books.filter((book) => (book.shelf === "currentlyReading"))} onChange={(details) => this.props.onChange(details)} />
                        <BookShelf title="Want to Read" books={this.props.books.filter((book) => (book.shelf === "wantToRead"))} onChange={(details) => this.props.onChange(details)} />
                        <BookShelf title="Read" books={this.props.books.filter((book) => (book.shelf === "read"))} onChange={(details) => this.props.onChange(details)} />
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
