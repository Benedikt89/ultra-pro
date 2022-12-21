import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./auth/authReducer";
import {AuthActions} from "./auth/actions";
import appReducer from "./app/reducer";
import {AppActions} from "./app/actions";
import modsReducer from "./mods/reducer";
import {ModsActions} from "./mods/actions";
import ordersReducer from "./orders/reducer";
import {OrdersActions} from "./orders/actions";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    mods: modsReducer,
    orders: ordersReducer
});

export type AppActionsType = AuthActions | AppActions | ModsActions | OrdersActions;

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware]
})


export type GetStateType = typeof store.getState;
export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;


type AsyncAction = (dispatch: (action: AnyAction) => any) => void;
type Dispatcher = (action: AsyncAction | AnyAction) => void

export const useAppDispatch: () => AppDispatch & ThunkDispatch<any, any, any> = useDispatch

export default store;
