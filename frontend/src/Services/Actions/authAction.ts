import API from "../axios";
import { AppDispatch, User } from "../../types";

export const getUserProfile = () => async (dispatch: AppDispatch) => {
  try {
    const { data }: { data: { user: User } } = await API.get("/auth/userProfile");

    dispatch({
      type: "GET_USER",
      payload: data.user,
    });
  } catch (error: unknown) {
    console.log(error);
  }
};