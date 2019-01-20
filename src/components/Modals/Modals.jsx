/** NPM Modules **/
import React from "react";

/** Import Outside Libraries **/
import Modal from "react-modal";
import CloseModalButton from "../Atoms/CloseModalButton/CloseModalButton";

const styles = {
  content: {
    width: "50%",
    background: "white",
    margin: "auto",
    marginTop: "100px",
    padding: "15px",
    borderRadius: "10px",
    overflow: "hidden"
  }
};

/** Exported Component **/
export default class Modals extends React.Component {
  componentDidMount() {
    Modal.setAppElement("#root");
  }

  render() {
    const { closeModal, children, active } = this.props;
    return (
      <Modal isOpen={active} onRequestClose={closeModal} style={styles}>
        <div className="closebuttoncontainer">
          <CloseModalButton closeModal={closeModal} />
        </div>
        <div className="modalcontainer">{children}</div>
      </Modal>
    );
  }
}
