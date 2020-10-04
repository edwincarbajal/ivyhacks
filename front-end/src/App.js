import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Editor from "./components/Editor";
import "./App.css";
import Dashboard from "./components/Dashboard";

import Login from "./components/Login";
import Register from "./components/Register";
import Class from "./components/Class";
import Lecture from "./components/Lecture";
import ViewNote from "./components/ViewNote";
import StudyGuide from "./components/StudyGuide";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/edit/:classId/:lectureId/:noteId">
              <Editor />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/class/:classId/:lectureId/study-guide">
              <StudyGuide />
            </Route>
            <Route path="/class/:classId/:lectureId">
              <Lecture />
            </Route>
            <Route path="/class/:classId">
              <Class />
            </Route>
            <Route path="/note/:classId/:lectureId/:noteId">
              <ViewNote />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
