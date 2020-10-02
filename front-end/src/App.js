import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Editor from "./components/Editor";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/db")
    .then(res=>res.text())
    .then(res=>this.setState({apiResponse: res}));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>{this.state.apiResponse}</p>
          <Router>
            <Switch>
              // TODO: Add route for root, e.g "/" and render homepage component
              <Route path="/editor">
                <Editor />
              </Route>
            </Switch>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
