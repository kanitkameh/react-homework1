import React, { useEffect, useState } from 'react';
import { IdentifiableUser } from "./User";
import { Outlet } from 'react-router-dom';
import { userRepository } from './UserRepository';

export function UsersComponent() {
    const [users, setUsers] = useState<[IdentifiableUser]>();
    useEffect(() => {
        userRepository.getAllUsers().then(users => {
            setUsers(users)
        })
    }, []);
    return (<div>
        {users?.map(
            user => (<div>{user.username} <a href={"/users/" + user.id}>Edit</a></div>)
        )}
        <Outlet/>
    </div>)
}