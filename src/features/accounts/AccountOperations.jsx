import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice.js";

export default function AccountOperations() {
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawalAmount, setWithdrawalAmount] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanPurpose, setLoanPurpose] = useState("");
    const [currency, setCurrency] = useState("USD");

    const dispatch = useDispatch();
    const account = useSelector(store => store.account);
    const { balance, loan, loanPurpose: loanReason, isLoading } = account;

    function handleDeposit() {
        if(!depositAmount) return;
        dispatch(deposit(depositAmount, currency));
        setDepositAmount("");
        setCurrency("USD");
    }

    function handleWithdrawal() {
        if(!withdrawalAmount) return;
        dispatch(withdraw(withdrawalAmount));
        setWithdrawalAmount("");
    }

    function handleRequestLoan() {
        if(loan > 0) return;
        dispatch(requestLoan(loanAmount, loanPurpose));
        setLoanAmount("");
        setLoanPurpose("");
    }

    function handlePayLoad() {
        if (balance <= loan) return;
        dispatch(payLoan())
    }

    return(
        <div>
            <h2>Your account operations</h2>

            <div className="inputs">
                <div>
                    <label>Deposit</label>
                    <input 
                        type="number" 
                        onChange={e => setDepositAmount(Number(e.target.value))}
                        value={depositAmount}
                    />
                    <select 
                        onChange={e => setCurrency(e.target.value)}
                        value={currency}    
                    >
                        <option value="USD">US Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">British Pound</option>
                    </select>
                    <button 
                        onClick={handleDeposit}
                        disabled={isLoading}
                    >
                            {isLoading ? "Converting" : `Deposit ${depositAmount}`}
                    </button>
                </div>

                <div>
                    <label>Withdrawal</label>
                    <input 
                        type="number" 
                        onChange={e => setWithdrawalAmount(e.target.value)}
                        value={withdrawalAmount}    
                    />
                    <button onClick={handleWithdrawal}>Withdrawal {withdrawalAmount}</button>
                </div>

                <div>
                    <label>Request loan</label>
                    <input 
                        type="number" 
                        onChange={e => setLoanAmount(Number(e.target.value))}
                        value={loanAmount}
                        />
                    <input 
                        type="text" 
                        placeholder="Loan purpose"
                        onChange={e => setLoanPurpose(e.target.value)}
                        value={loanPurpose}
                    />
                    <button onClick={handleRequestLoan}>Request loan</button>
                </div>

                    {loan > 0 && 
                    <div>
                        <span>Pay back ${loan} ({loanReason})</span>
                        <button onClick={handlePayLoad}>Pay loan</button>
                    </div>
                    }
                </div>
        </div>
    )
}