import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom"
import './App.css';

// Components
import Home from './auth/home'
import Login from './auth/login'
import Private from './auth/private'
import SignUp from './auth/signup'
import { ProvideAuth } from "./auth/auth";
import Logout from "./auth/logout";
import ForgotPassword from "./auth/forgotPassword";
import ResetPassword from "./auth/resetPassword";


function App() {
  return (
    <ProvideAuth>
      <Router>
        <ul style={{display:'flex', justifyContent:'flex-end', margin:'10px 0 50px 0'}}>
          <li style={{listStyleType: 'none', margin:'20px'}}> <Link to="/login"> Login </Link> </li>
          <li style={{listStyleType: 'none', margin:'20px'}}> <Link to="/signup"> Register </Link> </li>
          <li style={{listStyleType: 'none', margin:'20px'}}> <Link to="/"> Home </Link> </li>
          <li style={{listStyleType: 'none', margin:'20px'}}> <Link to="/private"> Private </Link> </li>
          <li style={{listStyleType: 'none', margin:'20px'}}> <Link to="/logout"> Logout </Link> </li>
        </ul>
        <Switch>
          <Route path="/login"> <Login /> </Route>
          <Route path="/signup"> <SignUp /> </Route>
          <Route path="/private"> <Private /> </Route>
          <Route path="/logout"> <Logout /> </Route>
          <Route path="/forgot"> <ForgotPassword /> </Route>
          <Route path="/reset/:userId/:token"> <ResetPassword /> </Route>
          <Route exact path="/"> <Home /> </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
