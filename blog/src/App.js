import React, { Component } from 'react';
import Article from './Article';
import Home from './Home';
import {withFirebase} from './Firebase';
import { Switch, Route } from 'react-router-dom';
import './App.css';


class App extends Component {

constructor(props) {
	super(props);
	this.state = {
		open: false,
		uid: '',
		username: '',
		button: 'Sign Up',
	}
}

render() {
  return (
    <Switch>
      <Route path='/article/:id' component={Article} />
      <Route path='/' component={Home} />
    </Switch>
  );
}

}

export default withFirebase(App);
