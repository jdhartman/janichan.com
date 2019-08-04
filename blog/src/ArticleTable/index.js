import React from 'react';
import ArticleItem from '../ArticleItem';
import {withFirebase} from '../Firebase';

class ArticleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {articles: []};
  }

  componentDidMount() {
    this.ArticleTable();
  }

  ArticleTable() {
    let items = [];

    this.props.firebase.db.collection('articles').get().then(snapshot => {

      let body = {};
      snapshot.forEach(doc => {
        
        body = doc.data();
        body.id = doc.id;

        items.push(body);
      });

      this.setState({
        articles : items
      })
    });  
  }

  render() {
    var ranInt = Math.floor(Math.random() * (6)) + 1;
    const articles = this.state.articles.map((item, i) => (
      <ArticleItem body={item} key={i} index={((ranInt + i) % 6) + 1}/>
    )); 
    return (
      <div className="article-table">
        <h2>Her Campus Articles</h2>
        {articles}
        <a href="https://www.hercampus.com/author/janice-chan"><h2 id="readMore">Read more articles from Her Campus</h2></a>
      </div>
    );
  }
}

export default withFirebase(ArticleTable);