/** NPM Modules **/
import React, { Component } from "react";
import axios from "axios";

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
import PaymentModal from "../../Modals/PaymentModal";
import ProgressModal from "../../Modals/ProgressModal";
import SuccessModal from "../../Modals/SuccessModal";
import FailureModal from "../../Modals/FailureModal";
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
      paymentModal: false,
      selected: {}
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.addMembership = this.addMembership.bind(this);
    this.updateMembership = this.updateMembership.bind(this);
    this.deleteMembership = this.deleteMembership.bind(this);
    this.membershipAvailability = this.membershipAvailability.bind(this);
    this.onToken = this.onToken.bind(this);
    this.selectMembership = this.selectMembership.bind(this);
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
  openModal(type, id, membership) {
    const key = `${type}Modal`;
    const { getMembership } = this.props;
    if (id) {
      getMembership(id);
    }
    if (type === "payment") {
      this.selectMembership(membership);
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

  selectMembership(selected) {
    this.setState({
      selected
    });
  }

  onToken(token) {
    const { selected } = this.state;
    this.setState({
      progressModal: true
    });
    token.card = void 0;
    axios
      .post("/api/payment", {
        token,
        amount: selected.membership_price,
        membership: selected
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            paymentModal: false,
            progressModal: false,
            successModal: true
          });
        } else {
          this.setState({
            progressModal: false,
            failureModal: true
          });
        }
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
      selectModal,
      paymentModal,
      progressModal,
      successModal,
      failureModal,
      selected
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

        <PaymentModal
          active={paymentModal}
          closeModal={() => this.closeModal("payment")}
          onToken={this.onToken}
          membership={selected}
        />

        <ProgressModal
          active={progressModal}
          closeModal={() => this.closeModal("progress")}
        />

        <SuccessModal
          active={successModal}
          closeModal={() => this.closeModal("success")}
        />

        <FailureModal
          active={failureModal}
          closeModal={() => this.closeModal("failure")}
        />

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
