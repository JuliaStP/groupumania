import React, { useState } from 'react';
import Header from './Header';
import "../styles/SignIn.css";
import "../styles/Profile.css";

import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import Avatar from "@mui/material/Avatar";

function Profile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    const handleUpdateProfile = () => {
        // Logic to update profile
    };

    const handleDeleteProfile = () => {
        // Logic to delete profile
    };

    return (
        <div>
            <Header/>,
        <div className='container'>
            <h1>Profile</h1>
            {/* <div>
                <Avatar></Avatar>
                <label>Profile Picture:</label>
                <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                {profilePicture && (
                    <img src={URL.createObjectURL(profilePicture)} alt="Profile" style={{ maxWidth: '200px' }} />
                )}
            </div> */}
            <Avatar className="avatar" >
            <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                {profilePicture && (
                    <img src={URL.createObjectURL(profilePicture)} alt="Profile" style={{ maxWidth: '200px' }} />
                )}
            </Avatar>
            <FormLabel className="label">
              First Name*
              <Input
                className="input"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => this.setState({ firstName: e.target.value })}
              />
            </FormLabel>
            <FormLabel className="label">
              Last Name*
              <Input
                className="input"
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => this.setState({ lastName: e.target.value })}
              />
            </FormLabel>
            <FormLabel className="label">
              Email*
              <Input
                className="input"
                type="email"
                name="email"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </FormLabel>
            <FormLabel className="label">
              Password*
              <Input
                className="input"
                type="password"
                name="password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </FormLabel>
            <div className='btn-container'>
                <button className="button btn" onClick={handleUpdateProfile}>Update</button>
                <button className="button btn" onClick={handleDeleteProfile}>Delete</button>
            </div>
     {/* <div>
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={handleFirstNameChange} />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={handleLastNameChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} />
            </div>
            <div>
                <button onClick={handleUpdateProfile}>Update Profile</button>
                <button onClick={handleDeleteProfile}>Delete Profile</button>
            </div> */}
        </div>
    </div>

    );
}

export default Profile;