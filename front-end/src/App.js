import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Editor from "./components/Editor";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";

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
        <p>{this.state.apiResponse}</p>
        <Router>
          <Switch>
            // TODO: Add route for root, e.g "/" and render homepage component
            <Route path="/">
              <Dashboard />
            </Route>
            <Route path="/editor">
              <Editor />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
