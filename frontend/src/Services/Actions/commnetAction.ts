import API from "../axios";
import { AppDispatch, Comment } from "../../types";

export const getComments = (postId: number) => async (dispatch: AppDispatch) => {
  try {
    const { data }: { data: Comment[] } = await API.get(`/comment/allComment-post/${postId}`);

    dispatch({
      type: "GET_COMMENTS_SUCCESS",
      payload: data || [],
    });
  } catch (error: unknown) {
    console.error(error);
  }
};

export const addComment = (postId: number, text: string) => async (dispatch: AppDispatch) => {
  try {
    const { data }: { data: Comment } = await API.post(`/comment/addComment/${postId}`, {
      comment: text,
    });

    dispatch({
      type: "ADD_COMMENT",
      payload: data,
    });
  } catch (error: unknown) {
    console.error(error);
  }
};

export const deleteComment = (id: number) => async (dispatch: AppDispatch) => {
  try {
    await API.delete(`/comment/deleteComment/${id}`);

    dispatch({
      type: "DELETE_COMMENT",
      payload: id,
    });
  } catch (error: unknown) {
    console.error(error);
  }
};

export const editComment = (id: number, text: string) => async (dispatch: AppDispatch) => {
  try {
    await API.put(`/comment/editComment/${id}`, {
      comment: text,
    });

    dispatch({
      type: "EDIT_COMMENT",
      payload: { id, text },
    });
  } catch (error: unknown) {
    console.error(error);
  }
};
