const router = require('express').Router();
const { User, College, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:id', withAuth, async (req, res) => {
    try {
        const newSavedCollege = await College.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newSavedCollege);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const collegeData = await College.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!projectData) {res.status(404).json({message: `Couldn't find a college with this id!`})};

        res.status(200).json(collegeData);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:id/comment', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            college_id: req.params.id
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id/comment/:commentID', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            {
                title: req.body.title,
                content: req.body.content
            },    
            {
            where: {
                college_id: req.params.id,
                id: req.params.commentID
            }
            }
        )
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;