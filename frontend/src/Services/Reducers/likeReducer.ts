import { AnyAction } from "redux";

interface LikeData {
  count: number;
  isLiked: boolean;
}

interface LikeState {
  likesByPost: {
    [key: number]: LikeData;
  };
}

const initialState: LikeState = {
  likesByPost: {},
};

export const likeReducer = (
  state: LikeState = initialState,
  action: AnyAction
): LikeState => {
  switch (action.type) {

    case "GET_LIKES":
      return {
        ...state,
        likesByPost: {
          ...state.likesByPost,
          [action.postId]: action.payload, 
        },
      };

    case "TOGGLE_LIKE":
      const current = state.likesByPost[action.postId] || {
        count: 0,
        isLiked: false,
      };

      return {
        ...state,
        likesByPost: {
          ...state.likesByPost,
          [action.postId]: {
            count: current.isLiked
              ? current.count - 1
              : current.count + 1,
            isLiked: !current.isLiked,
          },
        },
      };

    default:
      return state;
  }
};