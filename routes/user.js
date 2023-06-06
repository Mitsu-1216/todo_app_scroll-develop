const express = require('express');
const router = express.Router();
// knexeを利用
const knex = require("../db/knex");

//select文を書く
router.get('/', function (req, res, next) {

    res.render('user', {
        title: 'user★',
    });
});

router.post('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    let admin_flg = '';

    knex("users")
        .select("*")
        .then((results) => {
            console.log('userId:' + userId);
            console.log('results[0].id:' + results[0].id);
            // userの数が取得できない
            // for文で回すより、findなどで取得したオブジェクトにuseridが含まれるか調べる

            for (let i = 0; i < results.lenght; i++) {
                if (userId === results[i].id) {
                    admin_flg = results[i].admin_flg;
            console.log('admin_flg1:' + admin_flg);
                }
            console.log('admin_flg2:' + admin_flg);
             }

            console.log('admin_flg3:' + admin_flg);
            res.render("user", {
                title: "user",
                results: results,
                admin_flg: admin_flg
            });
        })
        .catch(function (err) {
            console.error(err);
            res.render("user", {
                title: "user",
                errorMessage: [err.sqlMessage],
            });
        });
});

module.exports = router;