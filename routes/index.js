const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const { format } = require('morgan');
// const mysql = require('mysql');


// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'todo_app'
// });

/* GET home page. */
// リダイレクトによりrouter.get()が実行される
router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);

  if (isAuth) {
    knex("tasks")
      .where({ "user_id": userId })
      .select("*")
      .orderBy('date', 'asc')
      .orderBy('time', 'asc')
      // データベース操作が正常に行われた場合のそれに続く処理
      .then(function (results) {
        // // 日付の形式変換
        // for (let i = 0; i < results.length; i++) {
        //   results[i].date = results[i].date.toLocaleDateString();
        //   console.log(results[i].date);
        // }

        // 時間の形式変換
        for (let i = 0; i < results.length; i++) {
          results[i].time = results[i].time.toString().substring(0, 5);
        }

        res.render('index', {
          title: 'ToDo App',
          results: results,
          isAuth: isAuth,
        });

      })
      // データベース操作でエラーが発生した場合のそれに続く処理
      .catch(function (err) {
        console.error(err);
        res.render('index', {
          title: 'ToDo App',
          isAuth: isAuth,
        });
      });
  } else {
    res.render('index', {
      title: 'ToDo App',
      isAuth: isAuth,
    });
  }
});

router.post('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);

  // req.body.<input>要素のname値で入力データを取得
  const todo = req.body.add;
  const date = req.body.task_date;
  const time = req.body.task_time;

  knex("tasks")
    .insert({ "user_id": userId, "content": todo, "status": '未完了',"date":date,"time":time })
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


// index.jsでこのモジュールを使用
router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));
router.use('/completebutton', require('./completebutton'));
router.use('/incompletebutton', require('./incompletebutton'));
router.use('/deletebutton', require('./deletebutton'));
router.use('/modify', require('./modify'));
router.use('/modify/task', require('./modify'));
router.use('/user', require('./user'));

module.exports = router;