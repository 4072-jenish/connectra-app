import API from "../axios";
import { AppDispatch, User } from "../../types";

export const getUserProfile = () => async (dispatch: AppDispatch) => {
  try {
    const { data }: { data: User | { user: User } } = await API.get("/auth/userProfile");
    const user = "user" in data ? data.user : data;

    dispatch({
      type: "GET_USER",
      payload: user,
    });
  } catch (error: unknown) {
    console.error(error);
  }
};
