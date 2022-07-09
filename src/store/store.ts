import { configureStore } from "@reduxjs/toolkit";
import {shoppingCartSlice} from '../reducers/shoppingReducer';
import {crudApiSlice} from '../reducers/crudReducer';


const store = configureStore({
    reducer:{
        shoppingCart:shoppingCartSlice.reducer,
        crudApi:crudApiSlice.reducer
    }
});

store.subscribe(()=>console.log("getState->",store.getState().crudApi.db));

export default store;