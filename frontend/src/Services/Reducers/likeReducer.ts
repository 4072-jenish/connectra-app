import { AnyAction } from "redux";

interface LikeState {
  likes: number;
  isLiked: boolean;
}

const initialState: LikeState = {
  likes: 0,
  isLiked: false,
};

export const likeReducer = (
  state: LikeState = initialState,
  action: AnyAction
): LikeState => {
  switch (action.type) {
    case "GET_LIKES":
      return {
        ...state,
        likes: action.payload.count,
        isLiked: action.payload.isLiked,
      };

    case "TOGGLE_LIKE":
      return {
        ...state,
        isLiked: !state.isLiked,
        likes: state.isLiked
          ? state.likes - 1
          : state.likes + 1,
      };

    default:
      return state;
  }
};