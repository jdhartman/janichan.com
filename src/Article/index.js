import React from 'react';

class Article extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      body: [],
      key: 0,
      index: 0
    }
    console.log("ITEM");
    console.log(this.props.location);
    console.log(this.props.location);
  }

  render() {
    var item = this.props.location.body;

    return (
      <div>
        <div className="blogImage">
          <img src={require('../images/cactus-' + this.props.location.index + '.svg')} alt="cactus boi"></img>
        </div>
        <h1 className="blogTitle">{item.title}</h1>
        <div dangerouslySetInnerHTML={{__html: item.content}}/>
      </div>
    );
  }
}

export default Article;