import { Avatar } from '@mui/material';
import React from 'react';
import './HeaderOption.css'
import { useSelector } from 'react-redux';
import {selectUser } from './features/userSlice'

function HeaderOption( {avatar, Icon, title, onClicked} ) {
    const user = useSelector(selectUser);

    return (
        <div onClick={onClicked} className='headerOption'>
            {Icon && <Icon className='headerOption__icon' />}
            {user && avatar && (
                <Avatar className='headerOption__icon' src={user.photoUrl}>{user.email[0]}</Avatar>
            )}
            <h3 className='headerOption__title' style={{textAlign: 'center'}}>{title}</h3>
        </div>
    )
}

export default HeaderOption
