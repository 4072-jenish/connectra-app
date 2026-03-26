import API from "../axios";
import { AppDispatch, LikeState } from "../../types";

export const getLikes = (postId: number, userId: number) => async (dispatch: AppDispatch) => {
  try {
    const res = await API.get(`/like/allLike-post/${postId}`);
    const resData = res.data;
    const allLikes = Array.isArray(resData)
      ? resData
      : resData?.allLike || resData?.allLikes || [];

    const payload: LikeState = {
      count: allLikes.length,
      isLiked: allLikes.some((l: any) => l.userId === userId),
    };

    dispatch({
      type: "GET_LIKES",
      payload,
      postId
    });
  } catch (error: unknown) {
    console.error(error);
  }
};

export const toggleLike = (postId: number) => async (dispatch: AppDispatch) => {
  try {
    await API.post(`/like/toggleLike/${postId}`);

    dispatch({
      type: "TOGGLE_LIKE",
      postId
    });

    const userId = Number(localStorage.getItem("userId") || 0);
    dispatch(getLikes(postId, userId) as any);
  } catch (error: unknown) {
    console.error(error);
  }
};
