import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Article from '../Article';

class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [],
      key: 0,
      index: 0
    }
    console.log(this.props.body);
  }

  render() {
    var item = this.props.body;

    return (
      <div>
        <Link to={{
          pathname:'/article/' + item.id, 
          body: item,
          index: this.props.index}}>
          <div className="blogContent">
            <div className="blogImage">
              <img src={require('../images/cactus-' + this.props.index + '.svg')} alt="cactus boi"></img>
            </div>
            <h1 className="blogTitle"> {item.title}</h1>
          </div>
        </Link>
      </div>
    );
  }
}

export {ArticleItem};