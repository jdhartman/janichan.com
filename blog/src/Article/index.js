import React from 'react';
import {withFirebase} from '../Firebase';

class Article extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.firebase.db);
    this.state = {
      article: this.props.location.body,
      id: this.props.location.pathname.split("/")[2],
      index: Math.floor(Math.random() * (6)) + 1,
      loading: true
    }
  }

  componentDidMount() {
    if(this.state.body === undefined) {
      console.log("ITEM " + this.state.id);
      this.props.firebase.db.collection('articles').doc(this.state.id).get().then(snapshot => {

          console.log("Snapshot");
          console.log(snapshot.data());

          this.setState({
            article : snapshot.data(),
            loading : false
          })
      });
    }
    else {
      this.setState({
        loading : false
      })
    }
  }

  render() {
    const {loading, article, index} = this.state;

    return loading ? 
    (<div> loading... </div>) :
    (
      <div>
        <div className="blogImage">
        <img src={require('../images/cactus-' + index + '.svg')} alt="cactus boi"></img>
        </div>
        <h1 className="blogTitle">{article.title}</h1>
        <div dangerouslySetInnerHTML={{__html: article.content}}/>
      </div>
    );
  }
}

export default withFirebase(Article);