import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice.js";

export default function CreateCustomer() {
    const [name, setName] = useState("");
    const [nationalId, setNationalId] = useState("");

    const dispatch = useDispatch();

    function handleClick() {
        if(!name || !nationalId) return;
        dispatch(createCustomer(name, nationalId));
    }
    
    return(
        <div>
            <h2>Create new customer</h2>

            <div className="inputs">
                <div>
                    <label>Customer full name</label>
                    <input 
                        type="text" 
                        onChange={e => setName(e.target.value)}
                        value={name} 
                    />
                </div>

                <div>
                    <label>National ID</label>
                    <input 
                        type="text"
                        onChange={e => setNationalId(e.target.value)}
                        value={nationalId} 
                    />
                </div>

                <button onClick={handleClick}>Create new customer</button>
            </div>
        </div>
    )
}