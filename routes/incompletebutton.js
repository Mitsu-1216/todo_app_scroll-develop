const express = require('express');
const router = express.Router();
// knexeを利用
const knex = require("../db/knex");

// 未完了状態にする
router.post('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    const taskid = req.body.task_id;

    knex("tasks")
        .where({ id: taskid })
        .update({ status: '未完了' })
        .then(function () {
            res.redirect('/')
        })
        .catch(function (err) {
            console.error(err);
            res.render('index', {
                title: 'ToDo App',
                isAuth: isAuth,
            });
        });

});


module.exports = router;