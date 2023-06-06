const express = require('express');
const router = express.Router();
// knexeを利用
const knex = require("../db/knex");

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const default_taskid = req.query.default_taskid;
  const default_task = req.query.default_task;
  const default_date = req.query.default_date;
  const default_time = req.query.default_time;

  res.render('modify', {
    title: '★modify★',
    default_taskid: default_taskid,
    default_task: default_task,
    default_date: default_date,
    default_time: default_time,
    isAuth: isAuth
  });
});

router.get('/task', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const modify_taskid = req.query.modify_taskid;
  const modify_task = req.query.modify_task;
  const modify_date = req.query.modify_date;
  const modify_time = req.query.modify_time;

  // やることアップデート
  knex("tasks")
    .where({ "id": modify_taskid })
    .update({ content: modify_task, date: modify_date, time: modify_time })
    .then(function () {
      if (isAuth) {
        // やること一覧用のデータを取得
        knex("tasks")
          .where({ "user_id": userId })
          .select("*")
          .orderBy('date', 'asc')
          .orderBy('time', 'asc')
          .then(function (results) {
            // 時間の形式を変換
            for (let i = 0; i < results.length; i++) {
              results[i].time = results[i].time.toString().substring(0, 5);
            }
            res.render('index', {
              // title: 'やること',
              results: results,
              isAuth: isAuth,
            });

          })
      }
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'やること',
        isAuth: isAuth,
      });
    });
});

module.exports = router;