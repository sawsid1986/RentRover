import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { authReducer } from "./core/auth/auth.reducer";

export const appReducer: ActionReducerMap<AppState> = {
    auth: authReducer
}