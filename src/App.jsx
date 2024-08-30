import { useSelector } from "react-redux";

import AccountOperations from "./features/accounts/AccountOperations.jsx";
import Customer from "./features/customers/Customer.jsx";
import CreateCustomer from "./features/customers/CreateCustomer.jsx";
import BalanceDisplay from "./features/accounts/BalanceDisplay.jsx";

export default function App() {
  const fullName = useSelector(store => store.customer.fullName);

  return(
    <div>
      <h1>🏦The React-Redux Bank💵</h1>
      {fullName === "" ? 
        <CreateCustomer  />
        :
      <>
        <Customer />
        <AccountOperations />
        <BalanceDisplay />
      </>
      }
    </div>
  )
}