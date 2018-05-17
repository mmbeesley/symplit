import React, { Component } from 'react';
import Footer from './Footer';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import stripe from '../stripeKey';
import StripeCheckout from 'react-stripe-checkout';
import Modal from 'react-modal';

const addStyle = {
    content: {
        width: "30%",
        height: "200px",
        background: "white",
        margin: "auto",
        padding: "10px",
    }
}

class Membership extends Component {
    constructor() {
        super();

        this.state = {
            memberships: [],
            selected: {},
            membershipTitle: '',
            membershipDescription: '',
            membershipPrice: '',
            membershipRecurring: false,
            membershipPeriod: null
        }
        this.payModal = this.payModal.bind(this);
        this.closePayModal = this.closePayModal.bind(this);
        this.addMembershipModal = this.addMembershipModal.bind(this);
        this.closeAddMembershipModal = this.closeAddMembershipModal.bind(this);
        this.handleMembershipTitle = this.handleMembershipTitle.bind(this);
        this.handleMembershipDescription = this.handleMembershipDescription.bind(this);
        this.handleMembershipPrice = this.handleMembershipPrice.bind(this);
        this.handleMembershipRecurring = this.handleMembershipRecurring.bind(this);
        this.handleMembershipPeriod = this.handleMembershipPeriod.bind(this);
        this.newMembershipPlan = this.newMembershipPlan.bind(this);
        this.selectAvailable = this.selectAvailable.bind(this);
        this.closeSelectAvailable = this.closeSelectAvailable.bind(this);
        this.makeAvailable = this.makeAvailable.bind(this);
    }

    componentDidMount() {
        axios.get('/api/memberships').then(res => {
            this.setState({
                memberships: res.data
            })
        })
    }

    onToken = (token) => {
        this.setState({
            progressModal: true
        })
        token.card = void 0;
        // axios.post('/api/payment', {
        //     token,

        // })
    }

    payModal(e) {
        this.setState({
            payModal: true,
            selected: e
        })
    }

    closePayModal() {
        this.setState({
            payModal: false,
            selected: {}
        })
    }

    addMembershipModal() {
        this.setState({
            addMembershipModal: true
        })
    }

    closeAddMembershipModal() {
        this.setState({
            addMembershipModal: false
        })
    }

    handleMembershipTitle(e) {
        this.setState({
            membershipTitle: e
        })
    }

    handleMembershipDescription(e) {
        this.setState({
            membershipDescription: e
        })
    }

    handleMembershipPrice(e) {
        this.setState({
            membershipPrice: e
        })
    }

    handleMembershipRecurring(e) {
        this.setState({
            membershipRecurring: e
        })
    }

    handleMembershipPeriod(e) {
        this.setState({
            membershipPeriod: e
        })
    }

    newMembershipPlan() {
        axios.post('/api/memberships', {
            membership_title: this.state.membershipTitle,
            membership_desc: this.state.membershipDescription,
            membership_price: this.state.membershipPrice,
            membership_period: this.state.membershipPeriod,
            membership_recurring: this.state.membershipRecurring
        }).then(res => {
            this.setState({
                addMembershipModal: false,
                membershipTitle: '',
                membershipDescription: '',
                membershipPrice: '',
                membershipRecurring: '',
                membershipPeriod: ''
            })
        })
    }

    selectAvailable() {
        this.setState({
            selectAvailable: true
        })
    }

    closeSelectAvailable() {
        axios.get('/api/memberships').then(res => {
            this.setState({
                selectAvailable: false,
                memberships: res.data
            })
        })
    }

    makeAvailable(id, boo) {
        let booTog = boo ? false : true;

        axios.put('/api/memberships/' + id, { available: booTog }).then(res => {
            console.log('Made available');
        })
    }

    render() {
        let membershipMap = this.state.memberships.length > 0 ? this.state.memberships.map((e, i) => {
            var months = 'per ' + e.membership_period + ' months'
            if (e.membership_period === 1) {
                months = 'per ' + e.membership_period + ' month'
            }
            if (e.membership_period === null || e.membership_period === '') {
                months = 'lifetime'
            }
            if (e.available) {
                return (
                    <div key={i} className="membershiptile">
                        <h2 className="membershiptitle">
                            {e.membership_title}
                        </h2>
                        <div className="membershipdesc">
                            {e.membership_desc}
                        </div>
                        <div className="membershipdetails">
                            <p>
                                ${e.membership_price}
                            </p>
                            <div className='membershipperiod'>
                                {months}
                            </div>
                            <button className="membershipbutton" onClick={() => this.payModal(e)}>
                                Select
                        </button>
                        </div>
                    </div>
                )
            }
        }) : null;

        let addMemb = !this.props.user.is_admin ? null : <button onClick={this.addMembershipModal}>Add Membership</button>
        let selectMemb = !this.props.user.is_admin ? null : <button onClick={this.selectAvailable}>Select Available Memberships</button>

        let selectMap = this.state.memberships.length > 0 ? this.state.memberships.map((e, i) => {
            console.log(e.available);
            return (
                <div key={i} className="selectfield">
                    <div>
                        {e.membership_title}
                    </div>
                    <div>
                        {e.membership_price}
                    </div>
                    <div>
                        {e.membership_period}
                    </div>
                    <div>
                        <input checked={e.available} onChange={() => this.makeAvailable(e.membership_id, e.available)} type="checkbox" />
                    </div>
                </div>
            )
        }) : null;

        return (
            <div>
                <div className="membershipbody">
                    <h1>Choose your Membership</h1>
                    {addMemb}
                    {selectMemb}
                    <div className="membershipcontainer">
                        {membershipMap}
                    </div>
                    <div className="allmembershipsinclude">
                        <h2>All Memberships Include</h2>
                        <ul className="includelist">
                            <li>Unlimited access to all videos for the purchased amount of time</li>
                            <li>Unique tips and tricks available as PDF downloads</li>
                            <li>Satisfaction Guarantee - If you aren't 100% satisfied, let us know and we'll give you a full refund!</li>
                            <li>No Contract!</li>
                        </ul>
                    </div>
                </div>
                <Modal isOpen={this.state.payModal} onRequestClose={this.closePayModal} style={addStyle}>
                    <div className="closebuttoncontainer">
                        <button onClick={this.closePayModal} className="closebutton">X</button>
                    </div>
                    <div className="paymentoptions">
                        <h3>You have selected the {this.state.selected.membership_title} Plan</h3>
                        <StripeCheckout
                            name={'Your Membership'}
                            description={'Please enter your card information:'}
                            token={this.onToken}
                            stripeKey={stripe.pub_key}
                            amount={this.state.selected.membership_price * 100}
                        />
                    </div>
                </Modal>

                <Modal isOpen={this.state.addMembershipModal} onRequestClose={this.closeAddMembershipModal} style={addStyle}>
                    <button onClick={this.closeAddMembershipModal}>Close</button>
                    <div className="checkboxfield">
                        Membership Title: <input placeholder="Membership Title" value={this.state.membershipTitle} onChange={(e) => this.handleMembershipTitle(e.target.value)} type="text" />
                    </div>
                    <div className="checkboxfield">
                        Membership Description: <input placeholder="Membership Description" value={this.state.membershipDescription} onChange={(e) => this.handleMembershipDescription(e.target.value)} type="text" />
                    </div>
                    <div className="checkboxfield">
                        Membership Price: <input placeholder="Membership Price" value={this.state.membershipPrice} onChange={(e) => this.handleMembershipPrice(e.target.value)} type="text" />
                    </div>
                    <div className="checkboxfield">
                        Is this Recurring? <input value={this.state.membershipRecurring} onChange={(e) => this.handleMembershipRecurring(e.target.checked)} type="checkbox" />
                    </div>
                    <div className="checkboxfield">
                        Membership Period: <input placeholder="If lifetime, leave blank" value={this.state.membershipPeriod} onChange={(e) => this.handleMembershipPeriod(e.target.value)} type="text" />
                    </div>
                    <button onClick={this.newMembershipPlan}>Submit</button>
                </Modal>

                <Modal isOpen={this.state.selectAvailable} onRequestClose={this.closeSelectAvailable} style={addStyle}>
                    <button onClick={this.closeSelectAvailable}>Close</button>
                    <div className="selectfield">
                        <div>TITLE</div>
                        <div>PRICE</div>
                        <div>PERIOD</div>
                        <div>AVAILABLE?</div>
                    </div>
                    {selectMap}
                </Modal>
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

export default connect(mapStateToProps, { getUserInfo })(Membership);