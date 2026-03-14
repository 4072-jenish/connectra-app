import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Feed from "./Pages/Feed";
import CreatePost from "./Pages/CreatPost";
import Users from "./Pages/Users";
import Profile from "./Pages/Profile";
import Followers from "./Pages/Followers";
import Search from "./Pages/Search"

import ProtectedRoute from "./Components/ProtectedRoute";

function App(){

  return(

    <BrowserRouter>

      <Routes>

        {/* Public */}
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        {/* Private */}

        <Route path="/feed" element={
          <ProtectedRoute>
            <Feed/>
          </ProtectedRoute>
        }/>

        <Route path="/create-post" element={
          <ProtectedRoute>
            <CreatePost/>
          </ProtectedRoute>
        }/>

        <Route path="/users" element={
          <ProtectedRoute>
            <Users/>
          </ProtectedRoute>
        }/>

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }/>

        <Route path="/followers" element={
          <ProtectedRoute>
            <Followers/>
          </ProtectedRoute>
        }/>

        <Route path="/search" element={
          <ProtectedRoute>
            <Search/>
          </ProtectedRoute>
        }/>

      </Routes>

    </BrowserRouter>

  )

}

export default App;