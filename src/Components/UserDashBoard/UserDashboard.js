import React, { useEffect } from 'react'
import authChecker from '../../Helpers/authChecker'
import { useHistory } from "react-router"

function UserDashboard() {
    const history = useHistory();

    useEffect(() => {
        authChecker(history);
    })
   
    return (
        <div>
            Welcome to the dashboard
        </div>
    )
}

export default UserDashboard
