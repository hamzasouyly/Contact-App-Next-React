import React, { useState, useEffect } from 'react';
import Students from "./students";
import {studentContext} from "./context/context";
import axios from 'axios';

function ShowAbout() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchProducts();
        return () => {
          console.log('component will unmount');
        };
      }, []);

      const fetchProducts = async () => {
        await axios.get(`http://127.0.0.1:8000/api/contacts/`).then(({data})=>{
          setStudents(data.data)
          console.log('this from axios' ,  data)
        })
    }

    const deleteStudent = async (slug) => {
      await axios.delete(`http://127.0.0.1:8000/api/contacts/${slug}`).then(({data})=>{
        fetchProducts() 
        console.log('this from axios', data)
      })
      
  }
    

    console.log('this from usestate array' , students)

  return (
    <div>
        <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">title</th>
                    <th scope="col">body</th>
                    <th scope="col">number</th>
                    </tr>
                </thead>
                { students.length > 0  && students.map((student) =>
                    <tbody>
                    <tr key={student.id}>
                    <th scope="row">{student.id}</th>
                    <td>{student.title}</td>
                    {
                      console.log('this in the html' , student.title)
                    }
                    <td>{student.body}</td>
                    <td>{student.number}</td>
                    <td onClick={() => deleteStudent(student.slug)}><i class="fas fa-trash"></i></td>
                    </tr>
                </tbody>
                    )}
        </table>
    </div>
    
  )
}

export default ShowAbout