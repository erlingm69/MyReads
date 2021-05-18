import React from 'react'
import PropTypes from 'prop-types'

function Book({ details, onChange }) {
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${details.imageLinks && details.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select defaultValue={details.shelf === undefined ? "none" : details.shelf} onChange={(e) => onChange({
                        ...details,
                        shelf: e.target.value
                    })}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{details.title}</div>
            <div className="book-authors">{details.authors && details.authors.join(", ")}</div>
        </div>
    )
}

Book.propTypes = {
    details: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Book

