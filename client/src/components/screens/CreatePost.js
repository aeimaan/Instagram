import React from 'react';

function CreatePost(){
  return(
    <div className="card input-filed">
      <input type="text" placeholder="title" />
      <input type="text" placeholder="body" />
      <div className="file-field input-field">
        <div className="btn blue darken-1">
          <span>Upload image</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
    </div>
    <button className="btn waves-effect waves-light blue darken-1">Submit Post</button>
    </div>
  );
}

export default CreatePost;
