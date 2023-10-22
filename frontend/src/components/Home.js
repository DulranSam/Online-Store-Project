import { useState } from "react"
import Axios from "axios";

export default function AllItems(){
    const [items,setItems] = useState([]);

    async function StoreItems(e){
        e.preventDefault();
        try{
            const r = await Axios.get("http://localhost:8000/verify").then((r)=>{
                setItems(r.data);
            }).catch((e)=>{
                setItems(e.response.data)
            }).finally(()=>{
                console.log("Got store items (or not)");
            })
        }catch(error){
            console.log(error);
        }
    };
    return(
        <div className="container">
        <form onSubmit={StoreItems}>
        <p>{JSON.stringify(items)}</p>
        <button type="submit">Show all items</button>
        </form>
        </div>
    )
};