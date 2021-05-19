import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

export default class List extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    }

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
                    <Link className="open-search-button" to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}
