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

class App extends React.Component {
  render() {
    return (
      <div>
      <br/>
        <div class="container">
        <h2> This is me testing </h2>
        <p> testing paragraph </p>
        <ul>
        <li> testing </li>
        <li> list </li>
        </ul>
        <p> seems to be working </p>
        <h2> This is another section </h2>
          <form action="http://localhost:9000/addContent" method="post">
            <div style={{width: '30%'}} class="form-group">
              <input  type="text" placeholder = "classID" name="classID"/>
            </div>
            <br/>
            <div style={{width: '30%'}} class="form-group">
              <input  type="text" placeholder = "lectureID" name="lectureID"/>
            </div>
            <br/>
            <div style={{width: '30%'}} class="form-group">
              <input  type="text" placeholder = "noteID" name="noteID"/>
            </div>
            <br/>
            <div style={{width: '30%'}} class="form-group">
              <textarea  type="text" placeholder = "content" name="content"/>
            </div>
            <br/>
            <div style={{width: '30%'}}>
              <button class="btn btn-success" type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
