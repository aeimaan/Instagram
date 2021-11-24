import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

function Login (){
  const history = useHistory();
  const [username, setName]= useState("");
  const [password, setPassword]= useState("");
  const [email, setEmail]= useState("");
  const [img, setImage] = useState('');
  const [url, setUrl] = useState(undefined);

  useEffect(()=>{
    if(url){
      uploadFields();
    }
  },[url])

  // SENDS FILES TO THE CLOUD
  const pfpDetails = async () =>{
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

const uploadFields = () =>{
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(email)){
    M.toast({html: "invalid email goofy"});
    return;
  }



fetch("/signup",
{
  method:"post",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    username,
    password,
    email,
    pic:url
  })
}).then(res=>res.json()).then(data=>{
    if(data.error){
      M.toast({html: data.error});
    }else{
      M.toast({html: data.message});
      history.push('/login');
    }
}).catch(err=>{
  console.log(err);
})

}

  const PostData = ()=>{
    if(img){
      pfpDetails()
    }else{
      uploadFields();
    }

  }

  function updateName(e){
    setName(e.target.value);
  }
  function updateEmail(e){
    setEmail(e.target.value);
  }
  function updatePassword(e){
    setPassword(e.target.value);
  }


  return(
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Email"
          value={email} onChange={updateEmail}
        />
        <input type="text" placeholder="Username"
          value={username} onChange={updateName}
        />
        <input type="password" placeholder="Password"
          value={password} onChange={updatePassword}
        />
        <div className="file-field input-field">
          <div className="btn blue darken-1">
            <span>Upload Profile Picture</span>
            <input type="file"
              onChange={(e)=>setImage(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
      </div>
        <button className="btn waves-effect waves-light blue darken-1"
          onClick={()=>PostData()}>
        Signup</button>
        <p className="switch">Already have an account? <Link className="link" to="/login">Login</Link></p>
     </div>
    </div>
  )
}

export default Login;
