const { MONGO_DB, NODE_ENV, JWT_SECRET = 'super-dev-secret' } = process.env;

const DEF_MONGO_DB = 'mongodb://localhost:27017/news_explorer';

module.exports = {
  MONGO_DB,
  NODE_ENV,
  JWT_SECRET,
  DEF_MONGO_DB,
};
