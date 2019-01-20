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
            let videoMap = e.section_videos.map((x, y) => {
              return (
                <a href={`#${x.section_video_title}`} key={x.section_video_id}>
                  <li className="videolistitem">{x.section_video_title}</li>
                </a>
              );
            });
            return (
              <div key={e.section_title}>
                <a href={`#${e.section_title}`}>
                  <div className="sectiontitle">
                    {chapter}.{e.section_number} {e.section_title}
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
