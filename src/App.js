import React from 'react';
import HomePage from './Components/HomePage/HomePage';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import Login from './Components/Login_Signup/Login';
import Signup from './Components/Login_Signup/Signup';
import Header from './Components/HomePage/Header';
import UserDashboard from './Components/UserDashBoard/UserDashboard';
import ProtectedRoute from './Helpers/ProtectedRoute';
import Discover from './Components/UserDashBoard/Discover';
import UserSubscriptions from './Components/UserDashBoard/UserSubscriptions';
import Feed from './Components/UserDashBoard/Feed';
import { AuthProvider } from './Contexts/AuthContext';
import UserFeeds from './Components/FeedsList/UserFeeds';
import SiteFeeds from './Components/FeedsList/SiteFeeds';

function App() {
    return (
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <Header />
                    <div style={{ paddingTop: '56px' }}>
                        <Switch>
                            <Route path="/" component={HomePage} exact />
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={Signup} />
                            <ProtectedRoute path="/home" component={UserDashboard} exact />
                            <ProtectedRoute path="/discover" component={Discover} />
                            <ProtectedRoute path="/subscriptions" component={UserSubscriptions} />
                            <ProtectedRoute path="/feed" component={Feed} />
                            <ProtectedRoute path="/userfeeds" component={UserFeeds} />
                            <ProtectedRoute path="/sitefeeds" component={SiteFeeds} />
                        </Switch>
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
