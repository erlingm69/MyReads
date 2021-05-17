import React, { Component } from 'react'
import { search } from './BooksAPI'

export default class Search extends Component {
    state = {
        searchedBooks: [],
        query: ""
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
                    if (!Object.keys(result).includes("error")) {
                        this.setState({
                            searchedBooks: result
                        })
                    }
                }))
            }
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => {
                        this.props.history.push("/")
                    }}>Close</button>
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
                    {JSON.stringify(this.state.searchedBooks)}
                    <ol className="books-grid"></ol>
                </div>
            </div>
        )
    }
}
