import { useEffect, useState } from "react";
import API from "../Services/axios";

function EditProfile() {

  const [user,setUser] = useState({
    name:"",
    email:"",
    bio:""
  });

  useEffect(()=>{
    const getProfile = async () =>{
      const {data} = await API.get("/auth/userProfile");
      setUser(data.user);
    };

    getProfile();
  },[]);

  const handleChange = (e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    await API.put("/auth/editUser",user);

    alert("Profile updated!");
  };

  return (
    <div className="container mt-5">

      <h2>Edit Profile</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <textarea
          name="bio"
          value={user.bio}
          onChange={handleChange}
          placeholder="Bio"
        />

        <button type="submit">
          Update Profile
        </button>

      </form>

    </div>
  );
}

export default EditProfile;