import React, { useContext, useState } from 'react';
import { studentContext } from './context/context';
import axios from 'axios';
import ShowAbout from './showAbout';


function Students() {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [number, setNumber] = useState('');
    // const { addStudent } = useContext(studentContext);

    const createProduct = async (e) => {
      e.preventDefault();
  
      const formData = new FormData()
  
      formData.append('title', title)
      formData.append('number', number)
      formData.append('body', body)
  
      await axios.post(`http://127.0.0.1:8000/api/contacts`, formData).then(({data})=>{
       console.log(data.message)
      }).catch(({response})=>{
        if(response.status===422){
          console.log(response.data.errors)
        }else{
          console.log(response.data.message)
        }
      })
    }

  return (
    <div>
        <form class="text-center border border-light p-5" action="#!" onSubmit={createProduct}>

        <p class="h4 mb-4">about</p>

        {/* <!-- Title --> */}
        <input type="text" id="defaultSubscriptionFormPassword" class="form-control mb-4" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />

        {/* <!-- Email --> */}
        <input type="text" id="defaultSubscriptionFormPassword" class="form-control mb-4" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)}/>


        <input type="text" id="defaultSubscriptionFormPassword" class="form-control mb-4" placeholder="number" value={number} onChange={(e) => setNumber(e.target.value)}/>

        {/* <!-- Sign in button --> */}
        <button class="btn btn-info btn-block" type="submit">submit</button>
        </form>

        <ShowAbout />
    </div>
    
  )
}

export default Students