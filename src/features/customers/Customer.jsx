import { useSelector } from "react-redux";

export default function Customer() {
    const customer = useSelector(store => store.customer);
    const {fullName, nationalID, createdAt} = customer;

    return(
        <h2>Welcome, {fullName}</h2>
    )
}