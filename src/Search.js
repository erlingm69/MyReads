import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { search } from './BooksAPI'
import Book from './Book'

export default class Search extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    }

    state = {
        searchedBooks: [],
        query: "",
        mappedBooks: {}
    }

    createMappedBooks() {
        // Create an object of book ids that are in use, meaning they are in the
        // books property array, so that it can easily be used to show the book's
        // shelf state
        let mappedBooks = {};
        this.props.books && this.props.books.forEach((book) => {
            mappedBooks[book.id] = book;
        });
        this.setState({ mappedBooks: mappedBooks })
    }

    componentDidMount() {
        this.createMappedBooks()
    }

    componentDidUpdate(prevProps, prevState) {
        // Did the query string change? If yes, make a search API call
        if (prevState.query !== this.state.query) {
            // Don't do a search if the query string is empty, just clear the
            // search result
            if (this.state.query.length === 0) {
                this.setState({
                    searchedBooks: []
                })
            } else {
                search(this.state.query).then((result => {
                    if (Object.keys(result).includes("error")) {
                        this.setState({
                            searchedBooks: []
                        })
                    } else {
                        this.setState({
                            searchedBooks: result
                        })
                    }
                }))
            }
        }

        if (prevProps.books !== this.props.books) {
            this.createMappedBooks()
        }
    }

    getBook(bookDetails) {
        let book = bookDetails;

        if (this.state.mappedBooks[bookDetails.id] !== undefined) {
            book = this.state.mappedBooks[book.id]
        }

        return <li key={book.id}>
            <Book details={book} onChange={(book) => this.props.onChange(book)} />
        </li>
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(e) => { this.setState({ query: e.target.value }) }}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{
                        this.state.searchedBooks.map((book) => this.getBook(book))
                    }
                    </ol>
                </div>
            </div>
        )
    }
}
