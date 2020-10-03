import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Editor from "./components/Editor";
import "./App.css";
import Dashboard from "./components/Dashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  getData() {
    fetch("http://localhost:9000/getLectures?class=CSC:323")
  .then(res=>res.text())
  .then(res=>this.setState({apiResponse: res}));
}

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="App">
        <p>{this.state.apiResponse}</p>
        <Router>
          <Switch>
            {/* TODO: Add route for root, e.g "/" and render homepage component */}
            <Route path="/editor">
              <Editor />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
