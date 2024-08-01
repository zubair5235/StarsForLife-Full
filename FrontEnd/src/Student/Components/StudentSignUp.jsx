import { useNavigate } from "react-router-dom";

function StudentSignUp(){
    const Navigate = useNavigate('');
    
    return(
        <>
        <div>signuppage</div>
        <button onClick={() => {Navigate('/studentlogin')}}>signup</button>
        </>
    );
}

export default StudentSignUp;