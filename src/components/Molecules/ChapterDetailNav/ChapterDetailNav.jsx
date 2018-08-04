/** NPM Modules **/
import React, { Component } from "react";

/** Exported Component **/
class ChapterDetailNav extends Component {
  constructor() {
    super();

    this.state = {};
  }

  /** Render Methods **/
  render() {
    const { sections, chapter } = this.props;

    let navMap =
      sections && sections.length > 0
        ? sections.map((e, i) => {
            let videoMap = e.sectionVideos.map((x, y) => {
              return (
                <a href={`#${x.sectionVideoTitle}`} key={x.sectionVideoId}>
                  <li className="videolistitem">{x.sectionVideoTitle}</li>
                </a>
              );
            });
            return (
              <div key={e.sectionTitle}>
                <a href={`#${e.sectionTitle}`}>
                  <div className="sectiontitle">
                    {chapter}.{e.sectionNumber} {e.sectionTitle}
                  </div>
                </a>
                <ul className="videolist">{videoMap}</ul>
              </div>
            );
          })
        : null;

    return <div>{navMap}</div>;
  }
}

export default ChapterDetailNav;
