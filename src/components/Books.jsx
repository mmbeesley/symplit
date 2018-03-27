import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Books extends Component {
    constructor() {
        super();

        this.state = {
            books: [],
            searchInput: '',
            crumbToggle: false
        }
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.handleBreadCrumb = this.handleBreadCrumb.bind(this);
    }

    componentDidMount() {
        axios.get('/api/books').then(books => {
            this.setState({
                books: books.data
            })
        })
    }

    handleSearchInput (e) {
        this.setState({
            searchInput: e
        })
    }

    handleSearchButton () {
        let search = this.state.searchInput;
        axios.get('/api/books/search?book='+search).then(books => {
            this.setState({
                books: books.data,
                searchInput: '',
                crumbToggle: true
            })
        })
    }

    handleBreadCrumb () {
        axios.get('/api/books').then(books => {
            this.setState({
                books: books.data,
                crumbToggle: false
            })
        })
    }

    render() {

        var bookMap = this.state.books.map((e, i) => {
            var authorMap = e.author.length > 0 ? e.author.map((x, y) => {
                return <h3 className="homebookauthor">{x}</h3>
            }) : null

            let imageUrl = `http://res.cloudinary.com/symplit/image/upload/${e.book_image}`;

            return (
                <Link to={`/book/${e.book_id}`} key={i} className="booktile">
                    <div style={{ backgroundImage: `url(${imageUrl})` }} className="booktilebook"></div>
                    <h3>{e.book_title}</h3>
                    <h3 className="booktilesubtitle">{e.book_subtitle}</h3>
                    <div className="homeauthorlist">
                        {authorMap}
                    </div>
                </Link>
            )
        })

        var breadcrumb = this.state.crumbToggle ? <button className="breadcrumb" onClick={this.handleBreadCrumb}>Back to List</button> : null

        return (
            <div className="booksbody">
            <div className="breadcrumbcontainer">
                {breadcrumb}
            </div>
                <div className="booksearch">
                    <input value={this.state.searchInput} onChange={e=>this.handleSearchInput(e.target.value)} type="text" className="searchbar" placeholder="Search for Your Textbook"/>
                    <button className="searchbutton" onClick={this.handleSearchButton}>Search</button>
                </div>
                <div className="homebooks booklist">
                    {bookMap}
                </div>
                <h3 className="bookrequest">Not seeing your textbook? Request yours at <a href="mailto:support@symplit.com" className="supportlink">support@symplit.com</a></h3>
            </div>
        )
    }
}

export default Books