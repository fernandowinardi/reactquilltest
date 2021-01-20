import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// import all pages
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import EditablePage from "./pages/EditablePage/EditablePage";
import QuizPage from "./pages/QuizPage/QuizPage";

// import NavBar 
import NavBar from "./components/NavBar/NavBar";

export default function App() {
  return (
    <Router>
    <div>
      <NavBar/>
        <Switch>
          <Route path="/login"> 
            <LoginPage/>
          </Route>
          <Route path="/signup">
            <SignUpPage/>
          </Route>
          <Route path="/editpage">
            <EditablePage/>
          </Route>
          <Route path="/quiz">
            <QuizPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
