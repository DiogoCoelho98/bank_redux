import { createSlice } from "@reduxjs/toolkit";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
};


// Old way to implement reducer and action creator functions 
/* export default function accountReducer(state = initialStateAccount, action) {
    switch(action.type) {
        case "account/deposit":
            return {
                ...state, 
                balance: state.balance + action.payload,
                isLoading: false
            };
            
            case "account/withdraw":
                return {
                    ...state, 
                    balance: state.balance - action.payload
                };
                
                case "account/requestLoan":
                    if (state.loan > 0) return;
                    return {
                        ...state, 
                        loan: action.payload.amount,
                        loanPurpose: action.payload.purpose,
                        balance: state.balance + action.payload.amount
            };
            
            case "account/payLoan":
                return {
                    ...state, 
                    loan: 0, 
                    loanPurpose: "", 
                    balance: state.balance - state.loan
                };
                
            case "account/convertingCurrency":
                return {
                    ...state,
                    isLoading: true
                }
                
                default:    
                    return state;
            }
        }
        
export function deposit(amount, currency) {
    if (currency === "USD") {
        return {
            type: "account/deposit",
            payload: amount
        }
    }
    // Middleware to convert the currency in case it's not in USD
    return async function(dispatch, getState) {
        dispatch({
            type: "account/convertingCurrency"
        });

        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const converted = data.rates.USD;

        dispatch({
            type: "account/deposit",
            payload: converted
        });
    }
}

export function withdraw(amount) {
    return {
        type: "account/withdraw",
        payload: amount
    }
}

export function requestLoan(amount, purpose) {
    return {
        type: "account/requestLoan",
        payload: {
            amount: amount,
            purpose: purpose
        }
    }
}

export function payLoan() {
    return {
        type: "account/payLoan"
    }
} */




// Modern way to implement a reducer and action creator functions
const accountSlice = createSlice({
    // Name for the slice, used to generate action types
    name: "account",
    initialState: initialStateAccount,
    reducers: {
        deposit(state, action) {
            // Immer library handles state immutability 
            // Allowing us to directly modify the state as if it were mutable
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            // State is updated directly due to Immer, which takes care of immutability
            state.balance -= action.payload;
        },
        // Customizing the payload using prepare(). By default, Redux Toolkit action creators carry a single value in the payload, to send multiple values, use prepare() to structure the payload
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {
                        amount, 
                        purpose
                    }
                };
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            }
        },
        payLoan(state) {
            state.balance -= state.loan; 
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency(state) {
            state.isLoading = true;
        }
    }
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;


export function deposit(amount, currency) {
    if (currency === "USD") {
        return { 
            type: "account/deposit", 
            payload: amount 
        };   
    } else {
        // Middleware to convert the deposit amount currency to "USD"
        return async function (dispatch, getState) {
            dispatch({ 
                type: "account/convertingCurrency" 
            });
        
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
            const data = await res.json();
            const converted = data.rates.USD;
        
            dispatch({ 
                type: "account/deposit", 
                payload: converted 
            });
        };
    }
  }


export default accountSlice.reducer;