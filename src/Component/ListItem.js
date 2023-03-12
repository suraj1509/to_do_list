import React, { useContext, useEffect, useState } from 'react'
import listContext from '../state/ListContext'

function ListItem({ title, description, id }) {
  const [list ,setList]=useState({title:title,description:description})
  const [modal ,setModal]=useState(false)
  let { deleteList,editList } = useContext(listContext);

  let myStyle = {
    border: '1px solid black',
    boxShadow: "2px 2px 2px 2px grey",
    width: '40%',
    margin: '2px',
    paddingLeft: '2%',
    paddingTop: '2%',
    paddingRight: "2%",
    paddingBottom: "2%",
    background:'whitesmoke',
    borderRadius: '7px',
    
  }
let modalStyle={
  position:'absolute',
  top:"12%",
  left:"30%",
  padding:"30px",
  textAlign:"center",
  background:"grey",
  visibility:!modal?"hidden":"",
}
  const handleEdit = () => {
    setModal(!modal)
  }

  const handleEditList = async() => {
   let res = await editList(id,list.title,list.description)
  if(res){
    setModal(!modal)
  }
  }
  const onChange=(e)=>{
    setList({...list ,[e.target.name]: e.target.value})
  }
  const handleDelete = async () => {
    await deleteList(id)
  }
  
  return (
    <div>
      <div className='card' style={myStyle}>
        <h4>{title}</h4>
        <p>{description}</p>
        <button className="btn btn-dark"  onClick={handleEdit}>Edit</button>
        <button className="btn btn-dark" onClick={handleDelete}>Delete</button>
      </div>
      <div className='container' style={modalStyle}>
        <h2>Edit a Note</h2>
        <div className="margin-3">
          <label htmlFor="email" className="email_label">Title</label><br />
          <input type="email" className="email_input" id="email" row="2" onChange={onChange} name="title" value={list.title} />
        </div>

        <div className="margin-3">
          <label htmlFor="description" className="description_label">Description </label><br />
          <textarea className="description_input" id="description" rows="3" onChange={onChange} name="description" value={list.description}></textarea>
        </div>
        <button className="btn btn-dark" onClick={handleEditList}>Edit NOte</button>
        <button className="btn btn-dark"  onClick={handleEdit}>Close</button>
      </div>
    </div>
  )
}

export default ListItem
