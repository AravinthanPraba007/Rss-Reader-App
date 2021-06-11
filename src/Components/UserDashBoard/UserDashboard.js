import React from 'react'
import { Button, Jumbotron} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
function UserDashboard() {
    const history = useHistory();
    return (
        <div>
            <div className="text-center">
            <Jumbotron>
                <h1>Welcome to Rss Reader App</h1>
            </Jumbotron>
            </div>
           <div className="text-center">
           <div>
           <Button className="mb-4 mt-4" variant="info" size="lg" active onClick={() => history.push('/subscriptions')}>
                   Manage your Rss Site Subscription!!
            </Button>
            </div>
            <div>
           <Button className="mb-4 mt-4" variant="success" size="lg" active onClick={() => history.push('/discover')}>
                   Want to explore Rss Sites!!
            </Button>
            </div>
           </div>
            <div>
                
            </div>
            </div>
    )
}

export default UserDashboard
