import react from "react";
import { GetUserFridgeContents } from "../utils/dbQuery/GetUserFridgeContents";
import getUserNameFromSessionID from "../utils/getUserNameFromSessionID";

const FridgeContentsPage = () => {
    const sessionID = localStorage.getItem('sessionID');

    if (sessionID){
    console.log(GetUserFridgeContents((getUserNameFromSessionID(sessionID))))
    return (<div><h1>Hi!!</h1></div>)}
    else{
        return (
            <div>
                <h1>You must be logged in to perform this action.</h1>
            </div>
        )
    }
}

export default FridgeContentsPage;