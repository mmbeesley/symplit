import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo, getPath } from '../ducks/reducer';
import Modal from 'react-modal';
import Footer from './Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Account extends Component {
    constructor() {
        super();

        this.state = {
            membership: {},
            savedbooks: []
        }
    }

    componentDidMount() {
        this.props.getUserInfo();
        this.props.getPath(this.props.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.membership_id) {
            axios.get('/api/membership/' + nextProps.user.membership_id).then(res => {
                this.setState({
                    membership: res.data[0]
                })
            })
        }
        axios.get('/api/savedbooks').then(savedbooks => {
            this.setState({
                savedbooks: savedbooks.data
            })
        })
    }

    removeBook(e) {
        axios.delete('/api/savedbooks/'+e).then(books => {
            this.setState({
                savedbooks: books.data
            })
        })
    }

    console.log('test');

    render() {
        let user = this.props.user;
        let mem = this.state.membership;
        let startDate = user.membership_start_date ? new Date(user.membership_start_date) : null;
        if (startDate) {
            startDate.setMonth(startDate.getMonth() + mem.membership_period)
        }
        let memTitle = !user.membership_id ? 'Free Trial' : mem.membership_title;
        let memLength = mem.membership_period ? mem.membership_period + ' months' : 'Lifetime Membership';
        let memCost = mem.membership_recurring ? '$' + mem.membership_price + ' per ' + memLength : '$' + mem.membership_price + ' One Time'
        let memNext = mem.membership_recurring ? 'Next Billing Date: ' + startDate : 'Membership End Date: ' + startDate;
        let memToggle = !user.membership_id ? (
            <div>
                <div className="checkboxfield">
                    Membership: {memTitle}
                </div>
                <div className="homebooksbutton splashbutton"><Link to="/memberships">Sign Up</Link></div>
            </div>
        ) : (
                <div>
                    <div className="checkboxfield">
                        Membership: {memTitle}
                    </div>
                    <div className="checkboxfield">
                        Membership Length: {memLength}
                    </div>
                    <div className="checkboxfield">
                        Membership Cost: {memCost}
                    </div>
                    <div className="checkboxfield">
                        {memNext}
                    </div>
                </div>
            )
        console.log(this.state.savedbooks);
        let savedBooks = this.state.savedbooks.length === 0 ? <div className='savedbooksmsg'><h3>You don't have any books saved to your profile</h3><p><Link to='/books'>Click here</Link> to find a text book to study!</p></div> : this.state.savedbooks.map((e, i) => {
            let imageUrl = 'http://res.cloudinary.com/symplit/image/upload/'+e.book_image;
            return (
                <div className="savedbooktile" key={e.saved_id}>
                    <div style={{backgroundImage: `url(${imageUrl})` }} className="savedbookimg"></div>
                    <div className="savedbooktitles">
                        <h3>{e.book_title}</h3>
                        <h3>{e.book_subtitle}</h3>
                    </div>
                    <div className="savedbookbuttonscontainer">
                        <div className="savedbookbutton savedbooklink"><Link to={`/book/${e.book_id}`}>Get Started</Link></div>
                        <button className="savedbookbutton" onClick={()=>this.removeBook(e.book_id)}>Remove from Saved Books</button>
                    </div>
                </div>
            )
        })


        return (
            <div>

                <div className="accountmain">
                    <div className="accountleft">
                        <div className="accountmembership">
                            <h2>Hello {user.user_name}!</h2>
                            <h3>Your Membership Details</h3>
                            {memToggle}
                        </div>
                        <div className="accountlinks">
                            <div onClick={this.props.setMembership}>
                                <Link to='/memberships'>Change Membership</Link>
                            </div>
                            <div>
                                <Link to='/'>Update Payment Details</Link>
                            </div>
                            <div>
                                <Link to='/'>Cancel Membership</Link>
                            </div>
                            <div>
                                <Link to='/'>Apply a Discount Code</Link>
                            </div>
                        </div>
                    </div>
                    <div className="accountright">
                        <div className="accountsavedbooks">
                            <h2>Your Saved Books</h2>
                            <div className="savedbookscontainer">
                                {savedBooks}
                            </div>
                        </div>
                        <div className="accountproblems">
                            <h2>Practice Problems</h2>
                            <ul>
                                <li>select book, list practice problems</li>
                                <li>select chapter, list practice problems</li>
                                <li>select section, list practice problems</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo, getPath })(Account)