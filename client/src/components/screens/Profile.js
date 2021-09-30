import React, {useState, useEffect, useContext} from "react";
import {UserContext} from '../../App.js';


function Profile (){
  const [posts, setPosts] = useState([]);
  const {state, dispatch} = useContext(UserContext);
  console.log(state);

  useEffect(()=>{
    fetch('/myposts',{
      headers:{
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result.posts);
      setPosts(result.posts);
      // console.log(posts[0].photo);
    })
  },[])

  return(
    <div className="profile">
      <div className="profile-card">
        <div className="img-container">
        <img className="profile-pic"
        src="https://upleap.com/blog/wp-content/uploads/2018/10/how-to-create-the-perfect-instagram-profile-picture.jpg"/>
        </div>
        <div className="info-card">
          <h4 className="profile-name">{state?state.username:"loading"}</h4>
          <div className="profile-info-card">
            <h5 className="profile-info">40 posts</h5>
            <h5 className="profile-info">40 followers</h5>
            <h5 className="profile-info">40 following</h5>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="gallery">
        {
          posts.map(item=>{
          return(
          <img className="item" key={item._id} src={item.photo} alt={item.title}/>
          )
        })
      }
      </div>
    </div>
  )
}

export default Profile;
