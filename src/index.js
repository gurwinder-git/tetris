import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


// const store = createStore(reducers, composeEnhancers(
//   applyMiddleware(thunk)
// ))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

