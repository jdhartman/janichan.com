import React from 'react';
import showdown from 'showdown';
import './index.css';

const fs = window.electron.remote.require("fs");
const dialog = window.electron.remote.dialog;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      converter : new showdown.Converter(),
      markdown : '# hello, markdown!',
      html : "",
      savedArticle : {},
      filepath: ""
    }

    this.changeMarkdown = this.changeMarkdown.bind(this);
    this.changeTitle= this.changeTitle.bind(this);
    this.newBlog = this.newBlog.bind(this);
    this.openBlog = this.openBlog.bind(this);
    this.saveChangesDialog = this.saveChangesDialog.bind(this);
  }

  componentDidMount() {
    

    this.state.converter.setOption("openLinksInNewWindow", true);
    this.state.converter.setOption("emoji", true);
    var convertedHtml = this.state.converter.makeHtml(this.state.markdown);

    this.setState({
      html : convertedHtml
    })
  }

  changeMarkdown(event) {
    var updatedArticle = {};

    updatedArticle.title = this.state.title;
    updatedArticle.content = event.target.value;
    
    console.log(updatedArticle);
    var convertedHtml = this.state.converter.makeHtml(event.target.value);

    try { 
      if(this.state.filepath !== "") {
        fs.writeFile(this.state.filepath, JSON.stringify(updatedArticle)); 

        this.setState({
          savedArticle : updatedArticle
        });
      }
    }
    catch(e) { console.log(e); }

    this.setState({
      markdown : event.target.value,
      html : convertedHtml
    })
  }

  changeTitle(event) {
    var updatedArticle = {};

    updatedArticle.title = event.target.value;
    updatedArticle.content = this.state.markdown;

    console.log(updatedArticle);

    try { 
      if(this.state.filepath !== "") {
        fs.writeFile(this.state.filepath, JSON.stringify(updatedArticle)); 

        this.setState({
          savedArticle : updatedArticle,
          title: event.target.value,
        });
      }
    }
    catch(e) { console.log(e); }
  }

  async newBlog(event) {

    try {
      
      this.saveChangesDialog();

      var blogFile = await dialog.showSaveDialog({
        filters: [{
          name: 'txt',
          extensions: ['txt']
        }]
      });
  
      if(blogFile) {
        fs.writeFile(blogFile, ""); 
        this.setState({
          filepath : blogFile
        })
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  async openBlog(event) {
    try {
      this.saveChangesDialog();

      var blogFile = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{
          name: 'txt',
          extensions: ['txt']
        }]
      });
  
      console.log(blogFile[0]);
      if(blogFile[0]) {
        var openBlogFile = fs.readFileSync(blogFile[0]);
        var fileContent = JSON.parse(openBlogFile);
        
        this.setState({
          filepath : blogFile[0],
          markdown : fileContent.content,
          title: fileContent.title,
          savedArticle : fileContent
        })
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  async saveChangesDialog() {
    if(this.state.filepath !== "") {
      var currentBlogFile = fs.readFileSync(this.state.filepath);
      var fileContent = JSON.parse(currentBlogFile);
      if(fileContent.content !== this.state.savedArticle.content 
        || fileContent.title !== this.state.savedArticle.title) {
        var buttonIndex = await dialog.showMessageBox({
          message: "Would you like to save your changes?",
          buttons: ["save", "cancel", "don't save"]
        })

        switch(buttonIndex) {
          case 0:
            fs.writeFile(this.state.filepath, JSON.stringify(this.state.savedArticle));
            break;
          case 1:
            return;
          case 2:
            break;
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          Title: 
          <input value={this.state.title} onChange={this.changeTitle}/>
          <button onClick={this.newBlog}>New Blog</button>
          <button onClick={this.openBlog}>Open Blog</button>
          {this.state.filepath === "" ? "No file" : this.state.filepath}
        </div>
        <div className="Viewers">
          <div className="mdViewer">
            <textarea id="mdText" value={this.state.markdown} onChange={this.changeMarkdown} />
          </div>
          <div className="htmlViewer">
            <div id="htmlText" dangerouslySetInnerHTML={{__html: this.state.html}}/>  
          </div>
          Need help with Markdown? <a target="_blank" rel="noopener noreferrer" href="https://www.markdownguide.org/basic-syntax/">This will help dinky.</a>
        </div>
      </div>
    );
  }
}

export default App;
