import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css';

function CreatePost(){
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");


  useEffect(()=>{
    if(url != ""){
      console.log("heres the url 2:"  + url);
    fetch("http://localhost:5000/createpost",
    {
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        title:title,
        body: body,
        pic: url
      })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
          M.toast({html: data.error});
        }else{
          M.toast({html: "Post created successful"});
          history.push('/login');
        }
    }).catch(err=>{
      console.log(err);
    })}
  }, [url])


  // SENDS FILES TO THE CLOUD
  const postDetails = async () =>{
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
      })
      .catch(err=>{
        console.log(err);
      })
  }


  function updateTitle(e){
    setTitle(e.target.value);
  }
  function updateBody(e){
    setBody(e.target.value);
  }
  function updateImg(e){
    setImg(e.target.files[0]);
  }


  return(
    <div className="card input-filed">
      <input type="text" placeholder="title"
        value={title} onChange={updateTitle}
      />
      <input type="text" placeholder="body"
        value={body} onChange={updateBody}
      />
      <div className="file-field input-field">
        <div className="btn blue darken-1">
          <span>Upload image</span>
          <input type="file"
            onChange={updateImg}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
    </div>
    <button className="btn waves-effect waves-light blue darken-1"
      onClick={()=>postDetails()}
    >Submit Post</button>
    </div>
  );
}

export default CreatePost;
