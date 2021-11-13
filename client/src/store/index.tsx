import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import React, {FC} from "react";
import {composeWithDevTools} from "redux-devtools-extension";

import {UserType} from "../type/User";
import auth, {AuthState} from "./auth";
import notify, {NotifyState} from "./notify";
import darkMode, {DarkModeState} from "./theme";
import search, {SearchState} from "./search";
import profile from "./profile";
import status, {STATUS} from "./status";
import homePosts, {PostState} from "./homePost";
import profilePosts, {ProfilePostsState} from "./profilePost";
import postDetail, {PostDetailState} from "./postDetail";
import discover, {DiscoverState} from "./discover";

const reducer=combineReducers({
  auth,
  notify,
  darkMode,
  search,
  profile,
  status,
  homePosts,
  profilePosts,
  postDetail,
  discover
});

export interface State {
  auth: AuthState;
  notify: NotifyState;
  darkMode: DarkModeState;
  search: SearchState;
  profile: UserType,
  status: STATUS,
  homePosts: PostState,
  profilePosts: ProfilePostsState,
  postDetail: PostDetailState,
  discover: DiscoverState,
}

const store=createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const DataProvider: FC=({children})=>{
  return (
    <Provider store={store}>{children}</Provider>
  );
};

export default DataProvider;