const UserRouter = require('./UserRouter');
const NewsRouter = require('./NewsRouter');
const RankTouter = require('./RankRouter');
const Test = require('./test');

const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/news', NewsRouter);
    app.use('/api/rank', RankTouter);
    app.use('/', Test);
};

module.exports = routes;
