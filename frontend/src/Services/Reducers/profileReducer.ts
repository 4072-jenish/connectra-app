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
  currentUser: User | null;
  profileUser: User | null;
  posts: Post[];
  followers: User[];
  following: User[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  currentUser: null,
  profileUser: null,
  posts: [],
  followers: [],
  following: [],
  loading: false,
  error: null,
};

export const profileReducer = (
  state: ProfileState = initialState,
  action: AnyAction
): ProfileState => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "PROFILE_LOADING":
      return { ...state, loading: true, error: null };

    case "PROFILE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload || "Unable to load profile right now.",
      };

    case "GET_MY_PROFILE":
      return {
        ...state,
        currentUser: action.payload.user,
        profileUser: null,
        posts: action.payload.posts,
        followers: action.payload.followers,
        following: action.payload.following,
        loading: false,
        error: null,
      };
      
    case "GET_OTHER_PROFILE":
      return {
        ...state,
        profileUser: action.payload.user,
        posts: action.payload.posts,
        followers: action.payload.followers,
        following: action.payload.following,
        loading: false,
        error: null,
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
