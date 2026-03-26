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
      const [postsRes, userRes] = await Promise.all([
        API.get("/post/userPost"),
        API.get("/auth/userProfile"),
      ]);

      const user = userRes.data.user || userRes.data;

      payload = {
        user,
        posts: postsRes.data,
        followers: (user.followers || []).map((f: any) => f.follower || f),
        following: (user.following || []).map((f: any) => f.following || f),
      };
    }

    dispatch({
      type: id ? "GET_OTHER_PROFILE" : "GET_MY_PROFILE",
      payload,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "PROFILE_ERROR",
      payload: "We couldn't load that profile. Please try again.",
    });
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
    console.error(error);
  }
};

export const deleteAccount = () => async (dispatch: AppDispatch) => {
  try {
    await API.delete("/auth/deleteUser");

    localStorage.removeItem("token");

    dispatch({ type: "LOGOUT" });

    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
};
