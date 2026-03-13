import { BrowserRouter,Routes,Route } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Feed from "./Pages/Feed";
import CreatePost from "./Pages/CreatPost";
import Users from "./Pages/Users";
import Profile from "./Pages/Profile";
import Followers from "./Pages/Followers";
import Search from "./Pages/Search";

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/followers" element={<Followers/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>

    </BrowserRouter>

  )

}

export default App;