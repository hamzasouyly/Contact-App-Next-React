import React, { useState, useEffect } from 'react';
import Students from "./students";
import {studentContext} from "./context/context";
import axios from 'axios';

export default function Home() {

  const [students, setStudents] = useState([]);
  const initialFormState = { id: null, title: "", body: "", number:"" };
  const [studentid, setStudentid] = useState(initialFormState);
  const [editing, setEditing] = useState(false);
  
  
  const addStudent = (student) => {
    const newStudents = [...students, student];
    setStudents(newStudents);
    localStorage.setItem('students', JSON.stringify(newStudents));
  }
    // console.log(studentid);

    const handleInputChange = event => {
      const { name, value } = event.target;
      const newStudent = { ...studentid, [name]: value }
      setStudentid(newStudent);
    };

    useEffect(() => {
      const initialStudents = localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")) : [];
      setStudents(initialStudents);
      fetchProducts() 
      setStudentid(initialFormState);
      return () => {
        console.log('component will unmount');
      };
    }, []);

    const removeStudent = (item) => {
      const newStudents = students.filter(student => student !== item);
      setStudents(newStudents);
      localStorage.setItem('students', JSON.stringify(newStudents));
    }

    const fetchProducts = async () => {
      await axios.get(`http://127.0.0.1:8000/api/contacts`).then(({data})=>{
        setStudents(data.data)
        console.log(data)
      })
  }

  const deleteStudent = async (slug) => {
    
    const newStudents = students.filter(student => student.slug !== slug);
      setStudents(newStudents);
      localStorage.setItem('students', JSON.stringify(newStudents));
      
    await axios.delete(`http://127.0.0.1:8000/api/contacts/${slug}`).then(({data})=>{
      fetchProducts() 
      console.log(data)
    })
    
}

    const editStudent = (slug) => {
      const editIdStudent = students.find(student => student.slug === slug);
      setStudentid(editIdStudent);
      setEditing(true);
      // fetchProducts() 
      console.log(editIdStudent)
    }

  return (
    <div className="">
      <h1>Home</h1>
      
      <studentContext.Provider value={{ addStudent, editStudent, studentid, setEditing, editing, handleInputChange }}>
        <Students />
      </studentContext.Provider>

      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">title</th>
      <th scope="col">body</th>
      <th scope="col">number</th>
    </tr>
  </thead>
  { students.length > 0  && students.map((student, i) =>
    <tbody>
    <tr key={i}>
      <th scope="row">{student.id}</th>
      <td>{student.title}</td>
      <td>{student.body}</td>
      <td>{student.number}</td>
      <td onClick={() => editStudent(student.slug)}><i class="fas fa-pen"></i></td>
      <td onClick={() => deleteStudent(student.slug)}><i class="fas fa-trash"></i></td>
    </tr>
  </tbody>
     )}

</table>
      
    </div>
    
  )
}
