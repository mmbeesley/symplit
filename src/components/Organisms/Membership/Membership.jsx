// TODO: payment, get one membership with edit, and progress modals

/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import {
  getPath,
  getMemberships,
  getMembership,
  createMembership,
  updateMembership,
  deleteMembership,
  membershipAvailability
} from "../../../ducks/reducers";
import { connect } from "react-redux";

/** Import Components **/
import AdminButton from "../../Atoms/AdminButton/AdminButton";
import MembershipTile from "../../Atoms/MembershipTile/MembershipTile";
import MembershipSelectModal from "../../Modals/MembershipSelectModal";
import MembershipModal from "../../Modals/MembershipModal";
import DeleteModal from "../../Modals/DeleteModal";
import Footer from "../../Molecules/Footer/Footer";

/** Exported Component **/
class Membership extends Component {
  constructor() {
    super();

    this.state = {
      addModal: false,
      editModal: false,
      deleteModal: false,
      selectModal: false,
      paymentModal: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.addMembership = this.addMembership.bind(this);
    this.updateMembership = this.updateMembership.bind(this);
    this.deleteMembership = this.deleteMembership.bind(this);
    this.membershipAvailability = this.membershipAvailability.bind(this);
  }

  /** LifeCycle Methods **/
  componentDidMount() {
    const { getPath, location, getMemberships } = this.props;
    getPath(location.pathname);
    getMemberships();
  }

  static getDerivedStateFromProps(props, state) {
    const { membership } = props;
    if (membership.membership_id !== state.membership_id) {
      return { ...membership };
    }
    return null;
  }

  /** Interaction Methods **/
  openModal(type, id) {
    const key = `${type}Modal`;
    const { getMembership } = this.props;
    if (id) {
      getMembership(id);
    }
    this.setState({
      [key]: true,
      videoUrl: ""
    });
  }

  closeModal(type) {
    const key = `${type}Modal`;
    this.setState({
      [key]: false
    });
  }

  handleInputUpdate(key, value) {
    this.setState({
      [key]: value
    });
  }

  addMembership() {
    const {
      membership_title,
      membership_desc,
      membership_price,
      membership_period,
      membership_recurring
    } = this.state;
    const { createMembership } = this.props;

    const body = {
      membership_title,
      membership_desc,
      membership_price,
      membership_period,
      membership_recurring
    };

    createMembership(body);
  }

  updateMembership() {
    const {
      membership_title,
      membership_desc,
      membership_price,
      membership_period,
      membership_recurring
    } = this.state;
    const { updateMembership, membership } = this.props;

    const body = {
      membership_title,
      membership_desc,
      membership_price,
      membership_period,
      membership_recurring
    };

    updateMembership(membership.membership_id, body);
  }

  deleteMembership() {
    const { membership, deleteMembership } = this.props;

    deleteMembership(membership.membership_id);
  }

  membershipAvailability(memId, bool) {
    const { membershipAvailability } = this.props;

    membershipAvailability(memId, !bool);
  }

  /** Render Methods **/
  renderAdminButtons() {
    return (
      <div className="adminbuttoncontainer">
        <AdminButton onClick={() => this.openModal("add")} color="blue">
          Add Membership
        </AdminButton>
        <AdminButton onClick={() => this.openModal("select")} color="blue">
          Select Available Memberships
        </AdminButton>
      </div>
    );
  }

  renderMembershipTile(e, i) {
    const { user } = this.props;
    return (
      <MembershipTile
        membership={e}
        key={i}
        user={user}
        openModal={this.openModal}
      />
    );
  }

  render() {
    const { user, memberships } = this.props;
    const {
      addModal,
      membership_title,
      membership_desc,
      membership_price,
      membership_period,
      membership_recurring,
      editModal,
      deleteModal,
      selectModal
      // paymentModal
    } = this.state;

    return (
      <div>
        <div className="membershipbody">
          <h1>Choose your Membership</h1>
          {user.is_admin && this.renderAdminButtons()}
          <div className="membershipcontainer">
            {memberships.length
              ? memberships.map((e, i) => {
                  if (e.available) {
                    return this.renderMembershipTile(e, i);
                  } else {
                    return null;
                  }
                })
              : null}
          </div>
          <div className="allmembershipsinclude">
            <h2>All Memberships Include</h2>
            <ul className="includelist">
              <li>
                Unlimited access to all videos for the purchased amount of time
              </li>
              <li>Unique tips and tricks available as PDF downloads</li>
              <li>
                Satisfaction Guarantee - If you aren't 100% satisfied, let us
                know and we'll give you a full refund!
              </li>
              <li>No Contract!</li>
            </ul>
          </div>
        </div>

        {/* <Modal
          isOpen={this.state.payModal}
          onRequestClose={this.closePayModal}
          style={addStyle}
        >
          <div className="closebuttoncontainer">
            <button onClick={this.closePayModal} className="closebutton">
              X
            </button>
          </div>
          <div className="paymentoptions">
            <h3>
              You have selected the {this.state.selected.membership_title} Plan
            </h3>
            <StripeCheckout
              name={"Your Membership"}
              description={"Please enter your card information:"}
              token={this.onToken}
              stripeKey={stripe.pub_key}
              amount={this.state.selected.membership_price * 100}
            />
          </div>
        </Modal> */}

        {/* <Modal isOpen={this.state.progressModal} style={addStyle}>
          <div>Please wait while your order is processed...</div>
        </Modal>

        <Modal
          isOpen={this.state.successModal}
          onRequestClose={this.closeSuccessModal}
          style={addStyle}
        >
          <div className="closebuttoncontainer">
            <button onClick={this.closeSuccessModal}>X</button>
          </div>
          <div>Thank you for your payment. Now go and enjoy the Maths!</div>
        </Modal>

        <Modal
          isOpen={this.state.failureModal}
          onRequestClose={this.closeFailureModal}
          style={addStyle}
        >
          <div className="closebuttoncontainer">
            <button onClick={this.closeFailureModal}>X</button>
          </div>
          <div>
            It appears that there was an error with your payment, please try
            again or with a different card. If this problem persists, please{" "}
            <a href="mailto:support@symplit.com">Contact Us</a>. Thank you for
            your patience.
          </div>
        </Modal> */}

        <MembershipSelectModal
          active={selectModal}
          closeModal={() => this.closeModal("select")}
          memberships={memberships}
          membershipAvailability={this.membershipAvailability}
        />

        <MembershipModal
          active={addModal}
          closeModal={() => this.closeModal("add")}
          onChange={this.handleInputUpdate}
          membership_title={membership_title}
          membership_desc={membership_desc}
          membership_price={membership_price}
          membership_recurring={membership_recurring}
          membership_period={membership_period}
          submit={this.addMembership}
        />

        <MembershipModal
          active={editModal}
          closeModal={() => this.closeModal("edit")}
          onChange={this.handleInputUpdate}
          membership_title={membership_title}
          membership_desc={membership_desc}
          membership_price={membership_price}
          membership_recurring={membership_recurring}
          membership_period={membership_period}
          submit={this.updateMembership}
        />

        <DeleteModal
          active={deleteModal}
          closeModal={() => this.closeModal("delete")}
          submit={this.deleteMembership}
        />

        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    memberships: state.memberships,
    membership: state.membership
  };
}

export default connect(
  mapStateToProps,
  {
    getPath,
    getMemberships,
    getMembership,
    createMembership,
    updateMembership,
    deleteMembership,
    membershipAvailability
  }
)(Membership);
