import { CommonActions } from "@react-navigation/native";

const SIGN_IN = "sign_in";
const SIGN_OUT = "sign_out";

export function signInAction() {
  return { type: SIGN_IN };
}

export function signOutAction() {
  return { type: SIGN_OUT };
}

const initialState = {
  signedIn: false,
};

export default function blogAuthReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, signedIn: true };
    case SIGN_OUT:
      return CommonActions.reset({ ...state, signedIn: false });
    default:
      return state;
  }
}

//using the blog authentication for signIn functions
