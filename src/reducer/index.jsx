import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import transactionReducer from "../slices/transactionSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    transaction: transactionReducer,
})

export default rootReducer