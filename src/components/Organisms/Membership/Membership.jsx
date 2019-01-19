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
} from "../../../ducks";
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
      membershipTitle,
      membershipDescription,
      membershipPrice,
      membershipPeriod,
      membershipRecurring
    } = this.state;
    const { createMembership } = this.props;

    const body = {
      membership_title: membershipTitle,
      membership_desc: membershipDescription,
      membership_price: membershipPrice,
      membership_period: membershipPeriod,
      membership_recurring: membershipRecurring
    };

    createMembership(body);
  }

  updateMembership() {
    const {
      membershipTitle,
      membershipDescription,
      membershipPrice,
      membershipPeriod,
      membershipRecurring
    } = this.state;
    const { updateMembership, membership } = this.props;

    const body = {
      membership_title: membershipTitle,
      membership_desc: membershipDescription,
      membership_price: membershipPrice,
      membership_period: membershipPeriod,
      membership_recurring: membershipRecurring
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
    const { user, memberships, membership } = this.props;
    const {
      addModal,
      membershipTitle,
      membershipDescription,
      membershipPrice,
      membershipPeriod,
      membershipRecurring,
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
          membershipTitle={membershipTitle}
          membershipDescription={membershipDescription}
          membershipPrice={membershipPrice}
          membershipRecurring={membershipRecurring}
          membershipPeriod={membershipPeriod}
          submit={this.addMembership}
        />

        <MembershipModal
          active={editModal}
          closeModal={() => this.closeModal("edit")}
          onChange={this.handleInputUpdate}
          membershipTitle={membership && membership.membership_title}
          membershipDescription={membership && membership.membership_desc}
          membershipPrice={membership && membership.membership_price}
          membershipRecurring={membership && membership.membership_recurring}
          membershipPeriod={membership && membership.membership_period}
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
