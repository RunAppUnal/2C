import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Index = () => (
    <App/>
);

ReactDOM.render(<Index/>, document.getElementById('root'));
registerServiceWorker();