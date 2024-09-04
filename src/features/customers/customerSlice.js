import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
    fullName: "",
    nationalId: "",
    createdAt: ""
};
// Old way of implementing reducer and action creator functions      
/* export default function customerReducer(state = initialStateCustomer, action) {
    switch(action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            }

        case "customer/updateName":
            return {
                ...state,
                fullName: action.payload
            }

        default:
            return state;
        }
    }
        
export function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer",
        payload: {
            fullName: fullName,
            nationalID: nationalID,
            createdAt: new Date().toISOString()
        }
    }
}

export function updateName(fullName) {
    return {
        type: "customer/updateName",
        payload: fullName
    }
} */


// Modern way of implementing reducers and action creator functions
const customerSlice = createSlice({
    name: "customer",
    initialState: initialStateCustomer,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalId){
                return {
                    payload: {
                        fullName,
                        nationalId,
                        createdAt: new Date().toISOString()
                    }
                };
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalId = action.payload.nationalId;
                state.createdAt = action.payload.createdAt;
            }
        },
        updateName(state, action) {
            state.fullName = action.payload;
        }
    }
});

export const { createCustomer, updateName } = customerSlice.actions; 
export default customerSlice.reducer;
