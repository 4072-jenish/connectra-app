import { AnyAction } from "redux";
import { Comment } from "../../types";

interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
};

export const commentReducer = (
  state: CommentState = initialState,
  action: AnyAction
): CommentState => {
  switch (action.type) {
    case "GET_COMMENTS_SUCCESS":
      return {
        ...state,
        comments: action.payload || [],
      };

    case "ADD_COMMENT":
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };

    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter(
          (c) => c.id !== action.payload
        ),
      };

    case "EDIT_COMMENT":
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id === action.payload.id
            ? { ...c, text: action.payload.text }
            : c
        ),
      };

    default:
      return state;
  }
};