//開発環境
const environment = "development";

// requre()関数でknexの設定ファイルであるknexfile.jsを読み込む
// さらに[environment]とすることで、developmentの設定を読み込む
const config = require("../knexfile.js")[environment];

const knex = require("knex")(config);

// 右辺に外部から読み込みたいものを指定
module.exports = knex;

//knex.jsの環境構築完了