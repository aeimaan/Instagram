import React, {useState, useEffect, useContext} from "react";
import {UserContext} from '../../App.js';
import {useParams} from 'react-router-dom';


function Profile (){
  const [userProfile, setProfile] = useState(null);
  const {state, dispatch} = useContext(UserContext);
  const {userid} = useParams();

  useEffect(()=>{
    fetch(`/user/${userid}`,{
      headers:{
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      if(result.error){
        console.log(result.error);
      }else{
        console.log(result);
        setProfile(result);
      }
      // console.log(posts[0].photo);
    })
  },[])

  return(
    <>
    {userProfile ?
      <div className="profile">
        <div className="profile-card">
          <div className="img-container">
          <img className="profile-pic"
          src="https://upleap.com/blog/wp-content/uploads/2018/10/how-to-create-the-perfect-instagram-profile-picture.jpg"/>
          </div>
          <div className="info-card">
          <h4 className="profile-name">{userProfile? userProfile.foundUser.username:"loading"}</h4>
            <div className="profile-info-card">
              <h5 className="profile-info">{userProfile? userProfile.foundPosts.length:"loading"} Post</h5>
              <h5 className="profile-info">40 followers</h5>
              <h5 className="profile-info">40 following</h5>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="gallery">
          {
            userProfile.foundPosts.map(item=>{
            return(
            <img className="item" key={item._id} src={item.photo} alt={item.title}/>
            )
          })
        }
        </div>
      </div>

      : <h2>loading.....</h2>}


    </>
  )
}

export default Profile;
