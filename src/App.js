import React, { Component } from 'react';
import logo from './logo.svg';
import profile from './janice.jpg';
import cactus from './images/cactus-1.svg';
import './App.css';

class Social extends React.Component {

}

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="profile-header">
          <h1>Janice Chan</h1>
        </div>
        <div className="profile-description">
          <div className="profile-des" id="profile-pic"> <img src={profile} alt="Janice Chan"></img> </div>
          <div className="profile-des"><h2>I'm a super cute sophomore at Purdue University who loves her boyfriend a lot.</h2></div>
        </div>
      </div>
    );
  } 
}

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [],
      key: 0,
      index: 0
    }
  }

  Article() {
    
  }

  render() {
    var item = this.props.body;

    return (
      <a href={item.link}>
        <div className="blogContent">
          <div className="blogImage">
            <img src={require('./images/cactus-' + this.props.index + '.svg')} alt="cactus boi"></img>
          </div>
          <h1 className="blogTitle"> {item.title} </h1>
        </div>
      </a>
    );
  }
}

class ArticleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {articles: []};
  }

  componentDidMount() {
    this.ArticleTable();
  }

  ArticleTable() {
    const https = require("https");
    const url =
      "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffetchrss.com%2Frss%2F5a33f9568a93f891398b4567705220079.xml"; 
    https.get(url, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        body = JSON.parse(body);
        console.log(body);
        this.setState({articles: body.items});
      });
    });   
  }

  render() {
    var ranInt = Math.floor(Math.random() * (6)) + 1;
    const articles = this.state.articles.map((item, i) => (
      <Article body={item} key={i} index={((ranInt + i) % 6) + 1}/>
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
 

class App extends Component {

  render() {
    return (
      <div>
        <Profile />
        <ArticleTable />
      </div>
    );
  }

}

export default App;
