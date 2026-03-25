import { AnyAction } from "redux";
import { User } from "../../types";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AnyAction
): AuthState => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};