const express = require('express');
const router = express.Router();
// knexeを利用
const knex = require("../db/knex");

// 削除する
router.post('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);

    //valueに設定した、チェックされたタスクidを取得
    const delete_taskid = req.body.delete_task_id;

    // 文字列を数字の配列にする
    var array_taskid = delete_taskid.split(',');

    console.log(array_taskid);


    for (let i = 0; i < array_taskid.length; i++) {
  
        knex("tasks")
            .where('id', array_taskid[i])
            .del()
            .then(function () {
               })
            .catch(function (err) {
                console.error(err);
                res.render('index', {
                    title: 'ToDo App',
                    isAuth: isAuth,
                });
            });
    }

    res.redirect('/');
});

module.exports = router;
