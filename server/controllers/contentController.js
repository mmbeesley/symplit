module.exports = {
  getBooks: (req, res) => {
    const db = req.app.get("db");

    db.get_allbooks().then(books => {
      res.status(200).send(books);
    });
  },

  searchBooks: (req, res) => {
    const db = req.app.get("db");
    const search = "%" + req.query.book.toUpperCase() + "%";

    db.get_searchbooks([search]).then(books => {
      res.status(200).send(books);
    });
  },

  getChapters: (req, res) => {
    const db = req.app.get("db");
    const { bookId } = req.params;

    db.get_allchapters([bookId]).then(chapters => {
      res.status(200).send(chapters);
    });
  },

  getSections: (req, res) => {
    const db = req.app.get("db");
    const { chapterId } = req.params;

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
  },

  getChapterSections: (req, res) => {
    const db = req.app.get("db");
    const { chapterId } = req.params;

    db.get_chapter_sections([chapterId]).then(chapSections => {
      res.status(200).send(chapSections);
    });
  },

  getBookSections: (req, res) => {
    const db = req.app.get("db");
    const { bookId } = req.params;

    db.get_booksections([bookId]).then(sections => {
      res.status(200).send(sections);
    });
  }
};
