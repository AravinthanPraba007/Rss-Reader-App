import React from 'react';
import HomePage from './Components/HomePage/HomePage';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import Login from './Components/Login_Signup/Login';
import Signup from './Components/Login_Signup/Signup';
import Header from './Components/HomePage/Header';
import UserDashboard from './Components/UserDashBoard/UserDashboard';

function App() {
    return (
        <div>
             <BrowserRouter>
            <Header/>
            <div style={{paddingTop: '56px'}}>
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/home" component={UserDashboard} />
            </Switch>
            </div>
            </BrowserRouter>
        </div>
    )
}

export default App
