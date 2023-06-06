const express = require('express');
const router = express.Router();
// knexeを利用
const knex = require("../db/knex");

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  res.render('signup', {
    title: 'Sign up',
    isAuth: isAuth
  });
});

router.post('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;

  knex("users")
    .where({ "name": username })
    .select("*")
    .then(function (result) {
      if (result.length !== 0) {
        res.render("signup", {
          title: "Sign up",
    isAuth: isAuth,
          errorMessage: ["このユーザ名は既に使われています"],
        })
      } else if (password === repassword) {
        knex("users")
          .insert({ "name": username, "password": password })
          .then(function () {
            //追加
            knex("users")
              .where({
                "name": username,
                "password": password,
              })
              .select("*")
              .then((results) => {
                req.session.userid = results[0].id;
                res.redirect('/');
              }).catch(function (err) {
                console.error(err);
                res.render("signin", {
                  title: "Sign in",
                  isAuth: isAuth,
                  errorMessage: [err.sqlMessage],
                });
              });
            //追加
          })
          .catch(function (err) {
            console.error(err);
            res.render("signup", {
              title: "Sign up",
              isAuth: isAuth,
              errorMessage: [err.sqlMessage],
            });
          });
      } else {
        res.render("signup", {
          title: "Sign up",
          isAuth: isAuth,
          errorMessage: ["パスワードが一致しません"],
        });
      }
    })
    .catch(function (err) {
      console.error(err);
      res.render("signup", {
        title: "Sign up",
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

module.exports = router;