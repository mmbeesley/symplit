const content = require("./contentController");

module.exports = {
  getOneSectionVideo: (req, res) => {
    const db = req.app.get("db");
    const { section_video_id } = req.params;

    db.get_section_video([section_video_id]).then(video => {
      res.status(200).send(video);
    });
  },

  createSectionVideo: (req, res) => {
    if (req.user.is_admin) {
      const db = req.app.get("db");
      const {
        section_id,
        video_id,
        section_video_title,
        section_video_text,
        membership_required_video,
        membership_ids,
        section_video_handout,
        chapterId
      } = req.body;

      const memIdsFormat = `{${membership_ids || null}}`;

      db.create_section_video([
        section_id,
        video_id,
        section_video_title,
        section_video_text,
        membership_required_video,
        memIdsFormat,
        section_video_handout
      ]).then(newVideo => {
        db.get_allsections([chapterId]).then(sections => {
          var results = [];
          for (var i = 0, obj = {}; i < sections.length; i++) {
            if (sections[i].section_title != obj.section_title) {
              obj = {
                section_id: sections[i].section_id,
                section_number: sections[i].section_number,
                section_title: sections[i].section_title,
                section_text: sections[i].section_text,
                membership_required_section:
                  sections[i].membership_required_section,
                membership_ids_section: sections[i].membership_ids_section,
                practice_problems_ids: sections[i].practice_problems_ids,
                section_handout: sections[i].section_handout,
                section_videos: []
              };
              results.push(obj);
            }

            obj.section_videos.push({
              section_video_id: sections[i].section_video_id,
              video_id: sections[i].video_id,
              section_video_title: sections[i].section_video_title,
              section_video_text: sections[i].section_video_text,
              membership_required_video: sections[i].membership_required_video,
              membership_ids: sections[i].membership_ids,
              section_video_handout: sections[i].section_video_handout,
              video_title: sections[i].video_title,
              video_url: sections[i].video_url,
              video_problems: sections[i].video_problems,
              video_thumbnail: sections[i].video_thumbnail
            });
          }
          res.status(200).send(results);
        });
      });
    } else {
      res.status(403).send("Unauthorized");
    }
  },

  updateSectionVideo: (req, res) => {
    if (req.user.is_admin) {
      const db = req.app.get("db");
      const {
        video_id,
        section_video_title,
        section_video_text,
        membership_required_video,
        membership_ids,
        section_video_handout,
        chapterId
      } = req.body;
      const { section_video_id } = req.params;

      const memIdsFormat = `{${membership_ids || null}}`;

      db.update_section_video([
        section_video_id,
        video_id,
        section_video_title,
        section_video_text,
        membership_required_video,
        memIdsFormat,
        section_video_handout
      ]).then(updated => {
        db.get_allsections([chapterId]).then(sections => {
          var results = [];
          for (var i = 0, obj = {}; i < sections.length; i++) {
            if (sections[i].section_title != obj.section_title) {
              obj = {
                section_id: sections[i].section_id,
                section_number: sections[i].section_number,
                section_title: sections[i].section_title,
                section_text: sections[i].section_text,
                membership_required_section:
                  sections[i].membership_required_section,
                membership_ids_section: sections[i].membership_ids_section,
                practice_problems_ids: sections[i].practice_problems_ids,
                section_handout: sections[i].section_handout,
                section_videos: []
              };
              results.push(obj);
            }

            obj.section_videos.push({
              section_video_id: sections[i].section_video_id,
              video_id: sections[i].video_id,
              section_video_title: sections[i].section_video_title,
              section_video_text: sections[i].section_video_text,
              membership_required_video: sections[i].membership_required_video,
              membership_ids: sections[i].membership_ids,
              section_video_handout: sections[i].section_video_handout,
              video_title: sections[i].video_title,
              video_url: sections[i].video_url,
              video_problems: sections[i].video_problems,
              video_thumbnail: sections[i].video_thumbnail
            });
          }
          res.status(200).send(results);
        });
      });
    } else {
      res.status(403).send("Unauthorized");
    }
  },

  deleteSectionVideo: (req, res) => {
    if (req.user.is_admin) {
      const db = req.app.get("db");
      const { section_video_id, chapterId } = req.params;

      db.delete_section_video([section_video_id]).then(deleted => {
        db.get_allsections([chapterId]).then(sections => {
          var results = [];
          for (var i = 0, obj = {}; i < sections.length; i++) {
            if (sections[i].section_title != obj.section_title) {
              obj = {
                section_id: sections[i].section_id,
                section_number: sections[i].section_number,
                section_title: sections[i].section_title,
                section_text: sections[i].section_text,
                membership_required_section:
                  sections[i].membership_required_section,
                membership_ids_section: sections[i].membership_ids_section,
                practice_problems_ids: sections[i].practice_problems_ids,
                section_handout: sections[i].section_handout,
                section_videos: []
              };
              results.push(obj);
            }

            obj.section_videos.push({
              section_video_id: sections[i].section_video_id,
              video_id: sections[i].video_id,
              section_video_title: sections[i].section_video_title,
              section_video_text: sections[i].section_video_text,
              membership_required_video: sections[i].membership_required_video,
              membership_ids: sections[i].membership_ids,
              section_video_handout: sections[i].section_video_handout,
              video_title: sections[i].video_title,
              video_url: sections[i].video_url,
              video_problems: sections[i].video_problems,
              video_thumbnail: sections[i].video_thumbnail
            });
          }
          res.status(200).send(results);
        });
      });
    } else {
      res.status(403).send("Unauthorized");
    }
  }
};
