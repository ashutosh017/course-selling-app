import { useEffect } from "react"
import axios from 'axios'
import { be_url } from "./Gate"
const token = localStorage.getItem("token")
export default function User(){
    useEffect(()=>{
        const fetchCourses = async ()=>{
            try{
                const data = await axios.get(`${be_url}/user/courses`,{
                    headers:{
                        token
                    }
                })
                console.log(data);
            }catch(error){
                console.log(error);
            }

        }
        fetchCourses();
    })
    return <>
    <div className="bg-red-700 mx-4 ">
    User route
    </div>
    </>
}