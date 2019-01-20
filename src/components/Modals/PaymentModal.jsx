/** NPM Modules */
import React from "react";
import StripeCheckout from "react-stripe-checkout";

/** Import Components */
import Modals from "./Modals";
import stripe from "../../stripeKey";

/** Exported Component */
export default function PaymentModal(props) {
  const { active, closeModal, membership, onToken } = props;
  return (
    <Modals active={active} closeModal={closeModal}>
      <div className="paymentoptions">
        <h3>
          You have selected the {membership.membership_title} Membership Plan.
        </h3>
        <StripeCheckout
          name="Your Membership"
          description="Please enter your card information:"
          token={onToken}
          stripeKey={stripe.pub_key}
          amount={membership.membership_price * 100}
        />
      </div>
    </Modals>
  );
}
