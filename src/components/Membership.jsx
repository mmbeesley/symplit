import React, { Component } from 'react';
import Footer from './Footer';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo, getPath } from '../ducks/reducer';
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
            membershipPeriod: ''
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
        this.closeFailureModal = this.closeFailureModal.bind(this);
        this.closeSuccessModal = this.closeSuccessModal.bind(this);
        this.membDeleteModal = this.membDeleteModal.bind(this);
        this.membEditModal = this.membEditModal.bind(this);
        this.closeMembDeleteModal = this.closeMembDeleteModal.bind(this);
        this.closeMembEditModal = this.closeMembEditModal.bind(this);
        this.updateMemb = this.updateMemb.bind(this);
        this.deleteMemb = this.deleteMemb.bind(this);
    }

    componentDidMount() {
        axios.get('/api/memberships').then(res => {
            this.setState({
                memberships: res.data
            })
        })
        this.props.getUserInfo();
        this.props.getPath(this.props.location.pathname);
        Modal.setAppElement('body');
    }

    onToken = (token) => {
        this.setState({
            progressModal: true
        })
        token.card = void 0;
        axios.post('/api/payment', {
            token,
            amount: this.state.selected.membership_price,
            membership: this.state.selected
        }).then(response => {
            if (response.status === 200) {
                this.setState({
                    payModal: false,
                    progressModal: false,
                    successModal: true
                })
            } else {
                this.setState({
                    progressModal: false,
                    failureModal: true
                })
            }
        })
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
            axios.get('/api/memberships').then(resp => {
                this.setState({
                    addMembershipModal: false,
                    membershipTitle: '',
                    membershipDescription: '',
                    membershipPrice: '',
                    membershipRecurring: '',
                    membershipPeriod: '',
                    memberships: resp.data
                })
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
            this.setState({
                memberships: res.data
            })
        })
    }

    closeFailureModal() {
        this.setState({
            failureModal: false
        })
    }

    closeSuccessModal() {
        this.setState({
            successModal: false
        })
    }

    membEditModal(e) {
        axios.get('/api/membership/' + e).then(res => {
            this.setState({
                editing: e,
                membEditModal: true,
                membershipTitle: res.data[0].membership_title,
                membershipDescription: res.data[0].membership_desc
            })
        })
    }

    membDeleteModal(e) {
        this.setState({
            deleting: e,
            membDeleteModal: true
        })
    }

    closeMembEditModal() {
        this.setState({
            editing: null,
            membEditModal: false
        })
    }

    closeMembDeleteModal() {
        this.setState({
            deleting: null,
            membDeleteModal: false
        })
    }

    updateMemb() {
        let body = {
            membership_title: this.state.membershipTitle,
            membership_desc: this.state.membershipDescription,
        }

        axios.put('/api/membershipdetails/' + this.state.editing, body).then(res => {
            this.setState({
                editing: null,
                membEditModal: false,
                memberships: res.data
            })
        })
    }

    deleteMemb() {
        axios.delete('/api/memberships/' + this.state.deleting).then(res => {
            this.setState({
                deleting: null,
                membDeleteModal: false,
                memberships: res.data
            })
        })
    }

    render() {
        let membershipMap = this.state.memberships.length > 0 ? this.state.memberships.map((e, i) => {
            var months = 'per ' + e.membership_period + ' months'
            if (e.available) {
                if (e.membership_period === null || e.membership_period === '') {
                    months = 'lifetime'
                }
                if (e.membership_period === 1) {
                    months = 'per month'
                }
                return (
                    <div key={i} className="membershiptile">
                        <h2 className="membershiptitle">
                            {e.membership_title}
                        </h2>
                        <div className="membershipdesc">
                            {e.membership_desc}
                        </div>
                        <div className="adminbuttoncontainer">
                            {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.membEditModal(e.membership_id)}>Edit</button>}
                            {!this.props.user.is_admin ? null : <button className="adminbutton" onClick={() => this.membDeleteModal(e.membership_id)}>Delete</button>}
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
            } else {
                return null;
            }
        }) : null;

        let addMemb = !this.props.user.is_admin ? null : <button onClick={this.addMembershipModal}>Add Membership</button>
        let selectMemb = !this.props.user.is_admin ? null : <button onClick={this.selectAvailable}>Select Available Memberships</button>

        let selectMap = this.state.memberships.length > 0 ? this.state.memberships.map((e, i) => {
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

                <Modal isOpen={this.state.progressModal} style={addStyle}>
                    <div>
                        Please wait while your order is processed...
                </div>
                </Modal>

                <Modal isOpen={this.state.successModal} onRequestClose={this.closeSuccessModal} style={addStyle}>
                    <div className="closebuttoncontainer">
                        <button onClick={this.closeSuccessModal}>X</button>
                    </div>
                    <div>
                        Thank you for your payment. Now go and enjoy the Maths!
                    </div>
                </Modal>

                <Modal isOpen={this.state.failureModal} onRequestClose={this.closeFailureModal} style={addStyle}>
                    <div className="closebuttoncontainer">
                        <button onClick={this.closeFailureModal}>X</button>
                    </div>
                    <div>
                        It appears that there was an error with your payment, please try again or with a different card. If this problem persists, please <a href="mailto:support@symplit.com">Contact Us</a>. Thank you for your patience.
                    </div>
                </Modal>

                <Modal isOpen={this.state.membEditModal} onRequestClose={this.closeMembEditModal} style={addStyle}>
                    <button onClick={this.closeMembEditModal}>Close</button>
                    <div className="checkboxfield">
                        You are only able to update the title and description and this only effects the db and how it is displayed on the page. If you want to change period, recurring, or cost that needs to be done with the add new membership button.
                    </div>
                    <div className="checkboxfield">
                        Membership title: <input value={this.state.membershipTitle} onChange={(e) => this.handleMembershipTitle(e.target.value)} type="text" />
                    </div>
                    <div className="checkboxfield">
                        Membership description: <input value={this.state.membershipDescription} onChange={(e) => this.handleMembershipDescription(e.target.value)} type="text" />
                    </div>
                    <button onClick={this.updateMemb}>Submit</button>
                </Modal>

                <Modal isOpen={this.state.membDeleteModal} onRequestClose={this.closeMembDeleteModal} style={addStyle}>
                    <button onClick={this.closeMembDeleteModal}>Close</button>
                    <div className="checkboxfield">
                        This will only delete from the database and available memberships and not from stripe. Are you sure you want to delete?
                    </div>
                    <button onClick={this.deleteMemb}>Delete</button>
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

export default connect(mapStateToProps, { getUserInfo, getPath })(Membership);