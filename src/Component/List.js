import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import listContext from '../state/ListContext'
import AddList from './AddList/AddList'
import ListItem from './ListItem';

function List() {
  let navigate = useNavigate()
  let context = useContext(listContext)
  let {lists,fetchalllists} = context;

  useEffect(()=>{
    if(localStorage.getItem('token')){
    fetchalllists(); }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  },[lists])

 
  return (
    <div>
      <AddList/>
      <div className='container'>
      <h2>Your Lists</h2>
      {lists.map((list)=>{
       return <div key={list._id}>
        <ListItem  title={list.title} description={list.description} id={list._id}/>
        </div>
      })}
      </div>
    </div>
  )
}

export default List
