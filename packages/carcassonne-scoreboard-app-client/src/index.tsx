// https://github.com/mavi888/web-client-appsync-test/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { AMPLIFY } from './config';

import * as serviceWorker from './serviceWorker';
import { App } from './components';

import './index.css';

Amplify.configure(AMPLIFY);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
