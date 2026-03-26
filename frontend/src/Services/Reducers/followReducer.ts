import { User } from "../../types";
import { AnyAction } from "redux";

interface FollowState {
  followers: User[];
  following: User[];
}

const initialState: FollowState = {
  followers: [],
  following: [],
};

export const followReducer = (
  state: FollowState = initialState,
  action: AnyAction
): FollowState => {
  switch (action.type) {
    case "GET_FOLLOW_DATA":
      return {
        ...state,
        followers: action.payload?.followers || [],
        following: action.payload?.following || [],
      };

    case "FOLLOW_USER":
      return {
        ...state,
        following: state.following,
      };

    default:
      return state;
  }
};
