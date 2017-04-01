/* NPM Libraries*/
import express from 'express';
import bodyParser from 'body-parser';

/* Webpack Libraries*/
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import connectdb from './connectdb';

/* Mongoose Models */
import users from './model/users';

/* Routes */
import index from './routes/index';
import login from './routes/login';
import signUp from './routes/signUp';

const app = express();

const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler, {
	hot:true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true 
}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', index);
app.use('/login', login);
app.use('/signUp', signUp);

app.listen(3000, () => {
	console.log('running on localhost:3000')
});