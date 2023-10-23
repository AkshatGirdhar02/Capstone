import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScorePage(){
    const location=useLocation();
    const {state:answers}=location;
    
    const getData=async()=>{
        await axios.post(`http://127.0.0.1:5001/check_answers`,{answers}).then((response)=>{
            console.log("getting")
            console.log(response.data)
        })
    }
    useEffect(()=>{
        getData();
    },[answers])
   return <div>
   <h1>Score Page</h1>
   <h2>Correct Answers:</h2>
   <ul>
     {answers.map((answer, index) => (
       <li key={index}>Answer {index + 1}: {answer}</li>
     ))}
   </ul>
   {/* Other content in the score page */}
 </div>
}
export default ScorePage;