import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Article from './Article';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Firebase, { FirebaseContext } from './Firebase';


ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
	<Router >
	<App/>
	</Router>
	</FirebaseContext.Provider>,
document.getElementById('root'));

registerServiceWorker();

//setInterval(tick, 1000);