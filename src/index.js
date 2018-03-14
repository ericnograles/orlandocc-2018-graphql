import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Assets needed before load
import 'roboto-fontface/css/roboto/roboto-fontface.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// Commenting Service Worker; causes all routing to come from client instead of passing to server
// registerServiceWorker();
