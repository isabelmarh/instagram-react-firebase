import React from 'react';
import useUser from '../../hooks/use-user';

export default function Sidebar() {
    const { user: { userId, username, fullName } } = useUser();
    return (
        <div>
            <p>Sidebar</p>
        </div>
    );
}
