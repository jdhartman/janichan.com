import React, { Component } from 'react';

import Profile from '../Profile';
import ArticleTable from '../ArticleTable';
import {withFirebase} from '../Firebase';


class Home extends Component {

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
      <div>
        <Profile />
        <ArticleTable />
      </div>
    );
  }

}

export default withFirebase(Home);