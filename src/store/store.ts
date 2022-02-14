import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import authReducer from "./auth/authReducer";
import {AuthActions} from "./auth/actions";
import appReducer from "./app/reducer";
import {AppActions} from "./app/actions";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
});



const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type GetStateType = typeof store.getState;
export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppActionsType = AuthActions | AppActions;

export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
  > = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AppActionsType
  >

export default store;
