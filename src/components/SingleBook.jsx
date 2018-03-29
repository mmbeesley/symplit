import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Footer from './Footer';

class SingleBook extends Component {
    constructor(){
        super();

        this.state = {
            book: []
        }
    }

    componentDidMount(){
        let bookId = this.props.match.params.book;
        axios.get('/api/book/'+bookId).then(book => {
            this.setState({
                book:book.data
            })
        })
    }

    render (){
        return (
            <div className="singlebookbody">
                <div className="booknavcontainer"></div>
                <div className="singlebookcontent">
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default SingleBook;