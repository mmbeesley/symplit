module.exports = {

    getBooks: (req, res) => {
        const db = req.app.get('db');

        db.get_allbooks().then(books => {
            res.status(200).send(books);
        })
    },

    searchBooks: (req, res) => {
        const db = req.app.get('db');
        const search = '%' + req.query.book.toUpperCase() + '%';

        db.get_searchbooks([search]).then(books => {
            res.status(200).send(books);
        })
    },

    getChapters: (req, res) => {
        const db = req.app.get('db');
        const { bookId } = req.params;

        db.get_allchapters([bookId]).then(chapters => {
            res.status(200).send(chapters);
        })
    },

    getSections: (req, res) => {
        const db = req.app.get('db');
        const { chapterId } = req.params;

        db.get_allsections([chapterId]).then(sections => {
            var results = [];
            for (var i = 0, obj = {}; i < sections.length; i++) {
                if (sections[i].section_title != obj.sectionTitle) {
                    obj = {
                        sectionNumber: sections[i].section_number,
                        sectionTitle: sections[i].section_title,
                        sectionText: sections[i].section_text,
                        memRequired: sections[i].membership_required_section,
                        memIds: sections[i].membership_ids_section,
                        practiceProblemsIds: sections[i].practice_problems_ids,
                        sectionHandout: sections[i].section_handout,
                        sectionVideos: []
                    }
                    results.push(obj)
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
                })

            }
            res.status(200).send(results);
        })
    },

    getChapterSections: (req, res) => {
        const db = req.app.get('db');
        const {chapterId} = req.params;

        db.get_chapter_sections([chapterId]).then(chapSections => {
            res.status(200).send(chapSections);
        })
    },

    getSectionVideos: (req, res) => {
        const db = req.app.get('db');
        const { sectionId } = req.params;

        db.get_allsectionvideos([sectionId]).then(videos => {
            res.status(200).send(videos);
        })
    }

}