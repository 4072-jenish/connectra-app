import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import VerifyOTP from "../Pages/VerifyOTP";
import Feed from "../Pages/Feed";
import CreatePost from "../Pages/CreatPost";
import Users from "../Pages/Users";
import Profile from "../Pages/Profile";
import EditProfile from "../Pages/EditProfile";
import Search from "../Pages/Search";
import PublicRoute from "../Components/PublicRoute";
import ProtectedRoute from "../Components/ProtectedRoute";


const IndexRouter =  () => {
  return(
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />

      <Route element={<ProtectedRoute children={undefined} />}>
             
          <Route path="/feed" element={<Feed /> } />
          <Route path="/create-post"element={<CreatePost />}/>
          <Route path="/users"element={<Users />}/>
          <Route path="/profile/:id"element={<Profile />}/>
          <Route path="/profile"element={<Profile />}/>
          <Route path="/editProfile"element={<EditProfile />}/>
          <Route path="/search"element={<Search />}/>
      </Route>
       
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default IndexRouter;