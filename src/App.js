import React from 'react';
import HomePage from './Components/HomePage/HomePage';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Header from './Components/Header/Header';
import UserDashboard from './Components/UserDashBoard/UserDashboard';
import ProtectedRoute from './Helpers/ProtectedRoute';
import DiscoverSites from './Components/DiscoverSites/Discover';
import UserSubscriptions from './Components/UserSubscriptions/UserSubscriptions';
import Feeds from './Components/SiteUrlFeeds/Feeds';
import { AuthProvider } from './Contexts/AuthContext';
import UserFeeds from './Components/UserFeedsList/UserFeeds';
import SiteFeeds from './Components/SiteFeedsList/SiteFeeds';
import SearchFeed from './Components/SearchFeed/SearchFeed';

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
                            <ProtectedRoute path="/discover" component={DiscoverSites} />
                            <ProtectedRoute path="/subscriptions" component={UserSubscriptions} />
                            <ProtectedRoute path="/feeds" component={Feeds} />
                            <ProtectedRoute path="/userfeeds" component={UserFeeds} />
                            <ProtectedRoute path="/sitefeeds" component={SiteFeeds} />
                            <ProtectedRoute path="/searchfeed" component={SearchFeed} />
                        </Switch>
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
