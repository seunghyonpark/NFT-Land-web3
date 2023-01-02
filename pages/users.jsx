import { useState, useEffect } from 'react';

import { userService } from '../services';

export default Users;

function Users() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <div className="card mt-4">
            <h4 className="card-header">You&apos;re logged in with Next.js 11 & Basic HTTP Authentication!!</h4>
            <div className="card-body">
                <h6>Users from secure api end point</h6>
                {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        )}
                    </ul>
                }
                {!users && <div className="spinner-border spinner-border-sm"></div>}
            </div>
        </div>
    );
}
