import React from 'react';

// create a function to display the profile page with the user's information in teh local storage

const backgroundStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const profileContentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px'
};

const profileInfoStyle = {
    display: 'flex',
    alignItems: 'center'
};

const profileImageStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px'
};

const profileDetailsStyle = {
    marginLeft: '10px'
};

const Profile = () => {
    return (
        <div style={backgroundStyle}>
            <div style={profileContentStyle}>
                <h1>Profile</h1>
                <div style={profileInfoStyle}>
                    <img src={localStorage.getItem('picture')} alt="Profile" style={profileImageStyle} />
                    <div style={profileDetailsStyle}>
                        <p>Email: {localStorage.getItem('email')}</p>
                        <p>Name: {localStorage.getItem('name')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default  Profile; // export the Profile function