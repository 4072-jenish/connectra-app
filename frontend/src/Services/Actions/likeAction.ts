import API from "../axios";
import { AppDispatch, LikeState } from "../../types";

export const getLikes = (postId: number, userId: number) => async (dispatch: AppDispatch) => {
  try {
    const res = await API.get(`/like/allLike-post/${postId}`);

    const allLikes = res.data.allLike || [];

    const payload: LikeState = {
      count: allLikes.length,
      isLiked: allLikes.some((l: any) => l.userId === userId),
    };

    dispatch({
      type: "GET_LIKES",
      payload,
    });
  } catch (error: unknown) {
    console.log(error);
  }
};

export const toggleLike = (postId: number) => async (dispatch: AppDispatch) => {
  try {
    await API.post(`/like/toggleLike/${postId}`);

    dispatch({
      type: "TOGGLE_LIKE",
    });
  } catch (error: unknown) {
    console.log(error);
  }
};