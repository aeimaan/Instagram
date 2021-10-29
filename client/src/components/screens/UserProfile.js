import React, {useState, useEffect, useContext} from "react";
import {UserContext} from '../../App.js';
import {useParams} from 'react-router-dom';


function Profile (){
  const [userProfile, setProfile] = useState(null);
  const [showFollow, setShowFollow] = useState(true);
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
    })
  },[])

  const followUser = () =>{
    fetch('/follow', {
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        followId: userid
      })
    }).then(res => res.json())
    .then(data=>{
      console.log(data);
      dispatch({type:"UPDATE", payload: {following:data.following, followers:data.followers}})
      localStorage.setItem("user", JSON.stringify(data))
      setProfile((prevState)=>{
        // console.log("userprofile" + userProfile);
        return {
          ...prevState,
          foundUser:{
                  ...prevState.foundUser,
                  followers:[...prevState.foundUser.followers, data._id]
          }
        }
      })
      setShowFollow(false);
    })
  }

  const unfollowUser = () =>{
    fetch('/unfollow', {
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        unfollowId: userid
      })
    }).then(res => res.json())
    .then(data=>{
      console.log(data);
      dispatch({type:"UPDATE", payload: {following:data.following, followers:data.followers}})
      localStorage.setItem("user", JSON.stringify(data))
      setProfile((prevState)=>{
        // console.log(data._id);
        const newFollower = prevState.foundUser.followers.filter(item => item !== data._id);
        return {
          ...prevState,
          foundUser:{
                  ...prevState.foundUser,
                  followers:newFollower
          }
        }
      })
      setShowFollow(true);
    })
  }

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
              <h5 className="profile-info">{userProfile.foundUser.followers.length} Followers</h5>
              <h5 className="profile-info">{userProfile.foundUser.following.length} Following</h5>
            </div>
            {showFollow?
              <button className="btn waves-effect waves-light blue darken-1"
                onClick={()=>followUser()}
              >Follow</button>:
              <button className="btn waves-effect waves-light blue darken-1"
                onClick={()=>unfollowUser()}
              >UnFollow</button>
            }
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
