import { Dispatch } from "redux";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  userId: number;
  user?: {
    name?: string;
    avatar?: string;
  };
}

export interface FollowData {
  followers: User[];
  following: User[];
}

export interface LikeState {
  count: number;
  isLiked: boolean;
}

// Generic Dispatch Type
export type AppDispatch = Dispatch<any>;