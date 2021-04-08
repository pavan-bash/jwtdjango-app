import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Switch>
          <Route path="/signin" component={Login} />
          <Route path="/signup" component={Register} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
