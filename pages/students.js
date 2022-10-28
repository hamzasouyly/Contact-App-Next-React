import React, { useContext, useState, useEffect } from 'react';
import { studentContext } from './context/context';
import axios from 'axios';
function Students() {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [number, setNumber] = useState(0);
    const { addStudent } = useContext(studentContext);
    const { studentid, setStudentid } = useContext(studentContext);
    const { handleInputChange } = useContext(studentContext);
    const { editing, setEditing } = useContext(studentContext);
    // const [studentedit, setStudentedit] = useState(studentid);
    
    console.log('edit' + studentid.title)

    const handleSubmit = (e) => {
      e.preventDefault();
      const student = {
        title,
        body,
        number
      }
      
      addStudent(student);
      setTitle("")
      setBody("")
      setNumber(0)
    }

    // useEffect(() => {
    //   setStudentedit(studentid);
    // }, []);



    const createProduct = async (e) => {
      e.preventDefault();

      const student = {
        title,
        body,
        number
      }

      addStudent(student);
      setTitle("")
      setBody("")
      setNumber(0)
  
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


    const updateStudent = async (e) => {
      e.preventDefault();

      setEditing(false);
      // setStudentid(users.map(studentid => (studentid => studentid.slug === slug)));

      // setStudentid(studentid);
  
      const formData = new FormData()
      
      formData.append('_method', 'PATCH');
      formData.append('title', studentid.title)
      formData.append('number', studentid.number)
      formData.append('body', studentid.body)

      
  
      await axios.post(`http://127.0.0.1:8000/api/contacts/${studentid.slug}`, formData).then(({data})=>{
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
      {/* {editing ? (<h1>edit {studentid.title}</h1>) : (<h1>lol</h1>)} */}

      {editing ? (
        <form class="text-center border border-light p-5" action="#!" onSubmit={updateStudent}>

        <p class="h4 mb-4">Subscribe</p>

        {/* <!-- Title --> */}
        <input type="text" id="defaultSubscriptionFormPassword" class="form-control mb-4" placeholder="title" name="title" value={studentid.title} onChange={handleInputChange} />

        {/* <!-- Email --> */}
        <input type="text" id="defaultSubscriptionFormPassword" class="form-control mb-4" placeholder="body" name="body" value={studentid.body} onChange={handleInputChange}/>


        <input type="text" id="defaultSubscriptionFormPassword" class="form-control mb-4" placeholder="number" name="number" value={studentid.number} onChange={handleInputChange}/>

        {/* <!-- Sign in button --> */}
        <button class="btn btn-info btn-block" type="submit">Update</button>
        <button class="btn btn-info btn-block" type="submit" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <form class="text-center border border-light p-5" action="#!" onSubmit={createProduct}>

        <p class="h4 mb-4">Subscribe</p>

        {/* <!-- Title --> */}
        <input type="text" id="defaultSubscriptionFormPassword" class="form-control mb-4" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />

        {/* <!-- Email --> */}
        <input type="text" id="defaultSubscriptionFormPassword" class="form-control mb-4" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)}/>


        <input type="text" id="defaultSubscriptionFormPassword" class="form-control mb-4" placeholder="number" value={number} onChange={(e) => setNumber(e.target.value)}/>

        {/* <!-- Sign in button --> */}
        <button class="btn btn-info btn-block" type="submit">submit</button>
        </form>
      )}
        
        
       

       

    </div>
    
  )
}

export default Students