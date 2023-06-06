import React, { useEffect, useState } from 'react';
import { IdentifiableUser } from "./User";
import { Link, Outlet } from 'react-router-dom';
import { userRepository } from './UserRepository';
import './user.css';

export function UsersComponent() {
    const [users, setUsers] = useState<IdentifiableUser[]>();
    useEffect(() => {
        userRepository.getAllUsers().then(users => {
            setUsers(users)
        })
    }, []);
    return (<div>
        {users?.map(
            user => (<div>{user.username} <img className='user-image' src={user.photo?.toString()} alt='profile picture'></img> <Link to={""+user._id}>Edit</Link>
            <hr></hr>
            </div>)
        )}
        <Outlet/>
    </div>)
}