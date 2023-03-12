import { useState } from "react";
import ListContext from "./ListContext";
import axios from 'axios'


const ListState =(props)=>{
    const listInitial = []
    const [lists,setLists]=useState(listInitial)
//fetching all lists===========================================================================
    const fetchalllists=async()=>{
        const config = {
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
          };
          const url = "http://localhost:5000/restapi/list/fetchalllists";
     let res = await  axios.get(url, config)

     setLists(res.data)
 
    }

    //adding all lists===========================================================================
    const addList=async(title,description)=>{
        const config = {
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
          };
          const url = "http://localhost:5000/restapi/list/addlist";
          const data ={
            title:title,                            
            description: description
          }
         
         
     let res = await  axios.post(url,data,config)
  
       
         setLists(lists.concat(res.data)) 
    }

    //==========================================================================
    const deleteList=async(id)=>{
        const config = {
            headers:{
                
                "auth-token": localStorage.getItem('token'),
            }
          };
          const url = `http://localhost:5000/restapi/list/deletelist/${id}`;
    
     let res = await  axios.delete(url,config)
     console.log(res)
    let newList =  lists.filter((list)=>list._id !== id)
    setLists(newList)
    }
    
    const editList=async(id,title,description)=>{
        const config = {
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
          };
          const url = `http://localhost:5000/restapi/list/editlist/${id}`;
    
          const data ={
           
            title:title,                            
            description: description
          }
         
         
     let res = await  axios.put(url,data,config)
     console.log(res)
     let newList = lists
     for (let index = 0; index < newList.length; index++) {
        if(newList[index]._id === res.data._id){
            newList[index] = res.data
        }
        
     }
     
    setLists(newList)
    if(res.status === 200){
        return true
    }
    }
    return(
        <ListContext.Provider value={{lists,fetchalllists,addList,deleteList,editList}}>
            {props.children}
        </ListContext.Provider>
    )
}

export default ListState;