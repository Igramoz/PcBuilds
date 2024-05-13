import React from 'react';
import { useNavigate } from "react-router-dom";


const ImgProfile = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "1%",
    cursor: "pointer"
};



const ProfileImage = ({Picture}) => {
    const Navigate = useNavigate();

    function imgProfileClick(){
        Navigate('/home/profile');
    }
    return (
        <img src={Picture} onClick = {imgProfileClick} alt="Profile" style={ImgProfile} />
    );
}

export default ProfileImage;