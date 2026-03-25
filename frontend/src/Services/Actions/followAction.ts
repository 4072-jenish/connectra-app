import API from "../axios";
import { AppDispatch, FollowData } from "../../types";

export const getFollowData = () => async (dispatch: AppDispatch) => {
  try {
    const { data }: { data: FollowData } = await API.get("/follow/getFollowData");

    dispatch({
      type: "GET_FOLLOW_DATA",
      payload: data,
    });
  } catch (error: unknown) {
    console.log(error);
  }
};

export const followUser = (id: number) => async (dispatch: AppDispatch) => {
  try {
    await API.post(`/follow/followUser/${id}`);

    dispatch({
      type: "FOLLOW_USER",
      payload: id,
    });
  } catch (error: unknown) {
    console.log(error);
  }
};