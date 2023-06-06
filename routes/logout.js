const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  // nullでセッションを削除
  req.session = null;
  // トップページへ
  res.redirect('/');
});

module.exports = router;