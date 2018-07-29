/** NPM Modules **/
import React from "react";

/** Import Outside Libraries **/
import Modal from "react-modal";
import CloseModalButton from "../Atoms/CloseModalButton/CloseModalButton";

const styles = {
  content: {
    width: "50%",
    height: "300px",
    background: "white",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "25px"
  }
};

/** Exported Component **/
export default function Modals(props) {
  const { closeModal, children, active } = props;
  return (
    <Modal isOpen={active} onRequestClose={closeModal} style={styles}>
      <CloseModalButton closeModal={closeModal} />
      {children}
    </Modal>
  );
}
