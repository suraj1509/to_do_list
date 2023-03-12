import React, { useContext, useState } from 'react'
import listContext from '../../state/ListContext'
import './AddList.css'
function AddList() {
  const [list ,setList]=useState({title:"",description:""})
  let context = useContext(listContext);
  let {addList}=context;

  const onChange=(e)=>{
    setList({...list ,[e.target.name]: e.target.value})
  }
 
  const handleAddList=async(e)=>{
    e.preventDefault();
    await addList(list.title,list.description)
    setList({title:"",description:""})
  }
  return (
    <div className='container'>
      <h2>Add a List</h2>
      <div className="margin-3">
  <label htmlFor="email" className="email_label">Title</label><br/>
  <input type="email" className="email_input" id="email" row="2" onChange={onChange} name="title" value={list.title}/>
</div>

<div className="margin-3">
  <label htmlFor="description" className="description_label">Description </label><br/>
  <textarea className="description_input" id="description" rows="3" onChange={onChange} name="description" value={list.description}></textarea>
</div>
<button className="btn btn-dark" onClick={handleAddList}>Add NOte</button>
    </div>
  )
}

export default AddList
