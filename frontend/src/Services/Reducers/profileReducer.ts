import { AnyAction } from "redux";
import { User } from "../../types";

interface Post {
  id: number;
  content: string;
  image?: string;
  createdAt: string;
  likes?: any[];
  comments?: any[];
}

interface ProfileState {
  user: User | null;
  posts: Post[];
  followers: User[];
  following: User[];
  loading: boolean;
}

const initialState: ProfileState = {
  user: null,
  posts: [],
  followers: [],
  following: [],
  loading: false,
};

export const profileReducer = (
  state: ProfileState = initialState,
  action: AnyAction
): ProfileState => {
  switch (action.type) {
    case "PROFILE_LOADING":
      return { ...state, loading: true };

    case "GET_PROFILE":
      return {
        ...state,
        user: action.payload.user,
        posts: action.payload.posts,
        followers: action.payload.followers,
        following: action.payload.following,
        loading: false,
      };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.payload),
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};