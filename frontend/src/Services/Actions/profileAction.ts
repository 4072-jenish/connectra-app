import API from "../axios";
import { AppDispatch } from "../../store";

export const getProfile = (id?: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "PROFILE_LOADING" });

    let payload;

    if (id) {
      const { data } = await API.get(`/auth/user/${id}`);

      payload = {
        user: data,
        posts: data.posts || [],
        followers: (data.followers || []).map((f: any) => f.follower || f),
        following: (data.following || []).map((f: any) => f.following || f),
      };
    } else {
      const [postsRes, userRes, followRes] = await Promise.all([
        API.get("/post/userPost"),
        API.get("/auth/userProfile"),
        API.get("/follow/getFollowData"),
      ]);

      payload = {
        user: userRes.data.user,
        posts: postsRes.data,
        followers: followRes.data.followers || [],
        following: followRes.data.following || [],
      };
    }

    dispatch({
      type: "GET_PROFILE",
      payload,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (postId: number) => async (dispatch: AppDispatch) => {
  try {
    await API.delete(`/post/deletePost/${postId}`);

    dispatch({
      type: "DELETE_POST",
      payload: postId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAccount = () => async (dispatch: AppDispatch) => {
  try {
    await API.delete("/auth/deleteUser");

    localStorage.removeItem("token");

    dispatch({ type: "LOGOUT" });

    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};