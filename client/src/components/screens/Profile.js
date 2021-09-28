import react from "react";

function Profile (){
  return(
    <div className="profile">
      <div className="profile-card">
        <div className="img-container">
        <img className="profile-pic"
        src="https://upleap.com/blog/wp-content/uploads/2018/10/how-to-create-the-perfect-instagram-profile-picture.jpg"/>
        </div>
        <div className="info-card">
          <h4 className="profile-name">Eimaan Ashraf</h4>
          <div className="profile-info-card">
            <h5 className="profile-info">40 posts</h5>
            <h5 className="profile-info">40 followers</h5>
            <h5 className="profile-info">40 following</h5>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="gallery">
        <img className="item" src="https://upleap.com/blog/wp-content/uploads/2018/10/how-to-create-the-perfect-instagram-profile-picture.jpg"/>
        <img className="item" src="https://upleap.com/blog/wp-content/uploads/2018/10/how-to-create-the-perfect-instagram-profile-picture.jpg"/>
        <img className="item" src="https://upleap.com/blog/wp-content/uploads/2018/10/how-to-create-the-perfect-instagram-profile-picture.jpg"/>
        <img className="item" src="https://upleap.com/blog/wp-content/uploads/2018/10/how-to-create-the-perfect-instagram-profile-picture.jpg"/>
        <img className="item" src="https://upleap.com/blog/wp-content/uploads/2018/10/how-to-create-the-perfect-instagram-profile-picture.jpg"/>
        <img className="item" src="https://upleap.com/blog/wp-content/uploads/2018/10/how-to-create-the-perfect-instagram-profile-picture.jpg"/>
        <img className="item" src="https://upleap.com/blog/wp-content/uploads/2018/10/how-to-create-the-perfect-instagram-profile-picture.jpg"/>
      </div>
    </div>
  )
}

export default Profile;
