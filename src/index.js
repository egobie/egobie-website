import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
