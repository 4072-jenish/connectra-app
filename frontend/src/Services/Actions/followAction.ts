import API from "../axios";
import { AppDispatch, FollowData } from "../../types";

export const getFollowData = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get("/follow/getFollowData");

    // { followers: [{ ...followFields, follower: {id,name,email,avatar} }], following: [...] }
    // Frontend expects `followers` to be a flat `User[]`.
    const followersUsers =
      (data?.followers || [])
        .map((f: any) => f?.follower)
        .filter(Boolean) || [];

    // Following items from backend don't include user details (only ids).
    // Keep it empty to avoid rendering incorrect shapes.
    const followingUsers: never[] = [];

    dispatch({
      type: "GET_FOLLOW_DATA",
      payload: { followers: followersUsers, following: followingUsers } satisfies FollowData,
    });
  } catch (error: unknown) {
    console.error(error);
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
    console.error(error);
  }
};
