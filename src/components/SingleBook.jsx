import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';

class SingleBook extends Component {
    constructor() {
        super();

        this.state = {
            book: []
        }
    }

    componentDidMount() {
        let bookId = this.props.match.params.book;
        axios.get('/api/books/' + bookId).then(book => {
            this.setState({
                book: book.data
            })
        })
    }

    render() {

        let chapters = this.state.book.length > 0 ? this.state.book[0].chapters : null;

        let chapterList = chapters ? chapters.map((e, i) => {
            return (
                <Link to={`/book/${this.props.match.params.book}/${e.chapter_id}`} key={i} className="chaptertile">
                    <h1 className="chapternumber">CHAPTER {e.book_chapter}</h1>
                    <h2 className="chaptertitle">{e.chapter_title}</h2>
                </Link>
            )
        }) : null

        let bookImg = this.state.book.length > 0 ? `http://res.cloudinary.com/symplit/image/upload/${this.state.book[0].book_image}` : null;
        let bookTitle = this.state.book.length > 0 ? this.state.book[0].book_title : null;
        let bookSubTitle = this.state.book.length > 0 ? this.state.book[0].book_subtitle : null;
        let bookAuthor = this.state.book.length > 0 ? this.state.book[0].author.map((e, i) => {
            return (
                <div>{e}</div>
            )
        }) : null;


        return (
            <div className="singlebookbody">
                <div className="bookoverview">
                    <img src={bookImg} alt="Book" className="singlebookimage" />
                    <div className="booksummary">
                        <h1>{bookTitle}</h1>
                        <h2>{bookSubTitle}</h2>
                        <h3>{bookAuthor}</h3>
                    </div>
                </div>
                <hr />
                <div className="chapterlist">
                    {chapterList}
                </div>
                <Footer />
            </div>
        )
    }
}

export default SingleBook;