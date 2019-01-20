/** NPM Modules **/
import React, { Component } from "react";

/** Redux **/
import { getPath } from "../../../ducks/reducers";
import { connect } from "react-redux";

/** Import Components **/
import BookOverview from "../../Molecules/BookOverview/BookOverview";
import StudyContainer from "../../Molecules/StudyContainer/StudyContainer";
import PracticeContainer from "../../Molecules/PracticeContainer/PracticeContainer";

/** Exported **/
class SingleBook extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { getPath, location } = this.props;
    getPath(location.pathname);
  }

  /** Render Methods **/
  render() {
    const { book } = this.props.match.params;
    return (
      <div className="singlebookbody">
        <BookOverview id={book} />
        <div className="singlebookcontent">
          <StudyContainer id={book} />
          <PracticeContainer id={book} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getPath }
)(SingleBook);
