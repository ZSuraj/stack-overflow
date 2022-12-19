import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './UsersProfile.css'
import { Link } from 'react-router-dom'
import Friends from '../../components/Friends/Friends'
import ChatBot from '../../components/ChatBot/ChatBot'

const UserProfile = () => {

    const { id } = useParams()
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = Array.isArray(users) && users.filter((user) => user?._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)
    const [Switch, setSwitch] = useState(false)
    var User = useSelector((state) => (state.currentUserReducer))
    // const [friend, setFriend] = useState(false)

    const func = () => {
        window.location.reload()
    }
    
    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className='user-details'>
                            <Avatar backgroundColor="purple" color='white' fontSize='25px' px='40px' py='30px'>
                                {currentProfile?.name?.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            ) 
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                            ) : (
                                <ProfileBio currentProfile={currentProfile}/>
                            )
                        }
                    </>
                </section>
                <div className='friends-container'>
                    {
                        currentUser?.result._id === id ?
                        <Link to={`/Users/friends/${User?.result?._id}`} className="friend-link">Friends</Link> :
                        <Friends friendsList={currentUser?.result.friends} id={id} token={currentUser?.token} button={() => func()}/>
                    }
                </div>
            </div>
            <ChatBot />
        </div>
    )
}

export default UserProfile