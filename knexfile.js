// Update with your config settings.

module.exports = {

  development: {
    client: "mysql",
    connection: {
      database: "todo_app",
      port: 3307,
      user: "app_user",
      password: "app_user",
      //DBの値をそのまま取ってくる
      dateStrings: true
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "root",
      password: "root",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "root",
      password: "root",
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};