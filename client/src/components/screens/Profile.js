import React, {useState, useEffect, useContext} from "react";
import {UserContext} from '../../App.js';


function Profile (){
  const [posts, setPosts] = useState([]);
  const {state, dispatch} = useContext(UserContext);
  const [img, setImage] = useState('');
  const [url, setUrl] = useState('');

  console.log(state);

  useEffect(()=>{
    fetch('/myposts',{
      headers:{
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log("result" , state);
      setPosts(result.posts);
      // console.log(posts[0].photo);
    })
  },[])

  useEffect(async ()=>{
    if(img){
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "instagram");
      data.append("cloud_name", "cloudeimaan");
      let res = await fetch("https://api.cloudinary.com/v1_1/cloudeimaan/image/upload",
        {
          method:"post",
          body:data
        })
        res.json()
        .then(data=>{
          // console.log(data.url);
          setUrl(data.url);
          // console.log(data);
          // localStorage.setItem('user', JSON.stringify({...state, pic:data.url}))
          // dispatch({type:"UPDATEPIC", payload:data.url})

          fetch('updatepic', {
            method:'put',
            headers:{
              "Content-Type" : "application/json",
              "Authorization" : "Bearer " + localStorage.getItem('jwt')
            },
            body : JSON.stringify({
              pic: data.url
            })
          }).then(res => res.json())
          .then(result => {
            console.log(result);
            localStorage.setItem('user', JSON.stringify({...state, pic:result.pic}))
            dispatch({type:"UPDATEPIC", payload:result.pic})
          })

        })
        .catch(err=>{
          console.log(err);
        })
    }
  },[img])

  const updatePhoto =  (file) =>{
    setImage(file)

  }

  return(
    <div className="profile">
      <div className="profile-card">
        <div className="img-container">
        <img className="profile-pic"
        src={state? state.pic: "loading"}/>
        </div>
        <div className="info-card">
          <h4 className="profile-name">{state?state.username:"loading"}</h4>
          <div className="profile-info-card">
            <h5 className="profile-info">{posts.length} Post</h5>
            <h5 className="profile-info">{state?state.followers.length:"loading"} Followers</h5>
            <h5 className="profile-info">{state?state.following.length:"loading"} Following</h5>
          </div>
          <div className="file-field input-field">
            <div className="btn blue darken-1">
              <span>Upload Profile Picture</span>
              <input type="file"
                onChange={(e)=>updatePhoto(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
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
