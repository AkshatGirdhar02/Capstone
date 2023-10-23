import { useLocation, useNavigate } from "react-router-dom"

function Difficulty_level(){
    const navigate=useNavigate();
    const location= useLocation();
    const type=new URLSearchParams(location.search).get('type')
    const username=new URLSearchParams(location.search).get('username')
    const handleDiff=(difficulty)=>{
        navigate(`/${type}?username=${username}&difficulty=${difficulty}&type=${type}`)
    }
    return <div>

        <button onClick={()=>handleDiff("easy")}>Easy</button>
        <button onClick={()=>handleDiff("medium")}>Medium</button>
        <button onClick={()=>handleDiff("hard")}>Ḥard</button>
    </div>

}
export default Difficulty_level