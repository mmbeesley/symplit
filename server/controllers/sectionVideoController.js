const content = require("./contentController");

module.exports = {
  getOneSectionVideo: (req, res) => {
    const db = req.app.get("db");
    const { sectionvideoId } = req.params;

    db.get_sectionvideo([sectionvideoId]).then(video => {
      res.status(200).send(video);
    });
  },

  createSectionVideo: (req, res) => {
    if (req.user.is_admin) {
      const db = req.app.get("db");
      const {
        section_id,
        video_id,
        sectionvideo_title,
        sectionvideo_text,
        membership_required_video,
        membership_ids,
        sectionvideo_handout,
        chapterId
      } = req.body;

      const memIdsFormat = `{${membership_ids || null}}`;

      db.create_sectionvideo([
        section_id,
        video_id,
        sectionvideo_title,
        sectionvideo_text,
        membership_required_video,
        memIdsFormat,
        sectionvideo_handout
      ]).then(newVideo => {
        db.get_allsections([chapterId]).then(sections => {
          var results = [];
          for (var i = 0, obj = {}; i < sections.length; i++) {
            if (sections[i].section_title != obj.sectionTitle) {
              obj = {
                sectionId: sections[i].section_id,
                sectionNumber: sections[i].section_number,
                sectionTitle: sections[i].section_title,
                sectionText: sections[i].section_text,
                memRequired: sections[i].membership_required_section,
                memIds: sections[i].membership_ids_section,
                practiceProblemsIds: sections[i].practice_problems_ids,
                sectionHandout: sections[i].section_handout,
                sectionVideos: []
              };
              results.push(obj);
            }

            obj.sectionVideos.push({
              sectionVideoId: sections[i].section_video_id,
              videoId: sections[i].video_id,
              sectionVideoTitle: sections[i].section_video_title,
              sectionVideoText: sections[i].section_video_text,
              memRequired: sections[i].membership_required_video,
              memIds: sections[i].membership_ids,
              sectionVideoHandout: sections[i].section_video_handout,
              videoTitle: sections[i].video_title,
              videoUrl: sections[i].video_url,
              videoProblems: sections[i].video_problems,
              videoThumbnail: sections[i].video_thumbnail
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
        sectionvideo_title,
        sectionvideo_text,
        membership_required_video,
        membership_ids,
        sectionvideo_handout,
        chapterId
      } = req.body;
      const { sectionvideoId } = req.params;

      const memIdsFormat = `{${membership_ids || null}}`;

      db.update_sectionvideo([
        sectionvideoId,
        video_id,
        sectionvideo_title,
        sectionvideo_text,
        membership_required_video,
        memIdsFormat,
        sectionvideo_handout
      ]).then(updated => {
        db.get_allsections([chapterId]).then(sections => {
          var results = [];
          for (var i = 0, obj = {}; i < sections.length; i++) {
            if (sections[i].section_title != obj.sectionTitle) {
              obj = {
                sectionId: sections[i].section_id,
                sectionNumber: sections[i].section_number,
                sectionTitle: sections[i].section_title,
                sectionText: sections[i].section_text,
                memRequired: sections[i].membership_required_section,
                memIds: sections[i].membership_ids_section,
                practiceProblemsIds: sections[i].practice_problems_ids,
                sectionHandout: sections[i].section_handout,
                sectionVideos: []
              };
              results.push(obj);
            }

            obj.sectionVideos.push({
              sectionVideoId: sections[i].section_video_id,
              videoId: sections[i].video_id,
              sectionVideoTitle: sections[i].section_video_title,
              sectionVideoText: sections[i].section_video_text,
              memRequired: sections[i].membership_required_video,
              memIds: sections[i].membership_ids,
              sectionVideoHandout: sections[i].section_video_handout,
              videoTitle: sections[i].video_title,
              videoUrl: sections[i].video_url,
              videoProblems: sections[i].video_problems,
              videoThumbnail: sections[i].video_thumbnail
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
      const { sectionvideoId, chapterId } = req.params;

      db.delete_sectionvideo([sectionvideoId]).then(deleted => {
        db.get_allsections([chapterId]).then(sections => {
          var results = [];
          for (var i = 0, obj = {}; i < sections.length; i++) {
            if (sections[i].section_title != obj.sectionTitle) {
              obj = {
                sectionId: sections[i].section_id,
                sectionNumber: sections[i].section_number,
                sectionTitle: sections[i].section_title,
                sectionText: sections[i].section_text,
                memRequired: sections[i].membership_required_section,
                memIds: sections[i].membership_ids_section,
                practiceProblemsIds: sections[i].practice_problems_ids,
                sectionHandout: sections[i].section_handout,
                sectionVideos: []
              };
              results.push(obj);
            }

            obj.sectionVideos.push({
              sectionVideoId: sections[i].section_video_id,
              videoId: sections[i].video_id,
              sectionVideoTitle: sections[i].section_video_title,
              sectionVideoText: sections[i].section_video_text,
              memRequired: sections[i].membership_required_video,
              memIds: sections[i].membership_ids,
              sectionVideoHandout: sections[i].section_video_handout,
              videoTitle: sections[i].video_title,
              videoUrl: sections[i].video_url,
              videoProblems: sections[i].video_problems,
              videoThumbnail: sections[i].video_thumbnail
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
