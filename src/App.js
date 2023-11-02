import Noteslist from "./components/Noteslist";
import Addnote from "./components/Addnote";
import DeleteNote from "./components/DeleteNote";
import UpdateNote from "./components/UpdateNote";
import {Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Footer from './components/Footer';
import Viewnote from './components/Viewnote';
import axios from 'axios';
import './App.css';


function App() {

  const apiUrl = "http://localhost:3004/notes";

  let [list, setList] = useState([]);

  async function retrieveNotes() {
    const response = await axios.get(apiUrl);
    return response.data;
  }

  useEffect(()=> {
    const getAllNotes = async () => {
      const allNotes = await retrieveNotes();
      if (allNotes) setList(allNotes);
    }
    getAllNotes();

  }, []);

  async function addNote(note) {
      const id = uuidv4();
      note.id = id;
      note.date = new Date().toDateString();
      note.time = new Date().toLocaleTimeString();
      const response = await axios.post(apiUrl, note)
      setList([response.data, ...list]);
  }

  async function removeNote(id) {
    await axios.delete(`${apiUrl}/${id}`);
    const removedList = list.filter((note) => {
      return note.id!==id;
    })
    setList(removedList);
  }

  async function editNote(editednote) {
    editednote.date = new Date().toDateString();
    editednote.time = new Date().toLocaleTimeString();
    const removedList = list.filter((note) => {
      return note.id!==editednote.id;
    })
    const response = await axios.put(`${apiUrl}/${editednote.id}`, editednote);
    setList([response.data, ...removedList]);
  }

  return (
    <>
        <Routes>
          <Route path="/" element={<Noteslist list={list}/>} />
          <Route path="/deletenote/:id" element={<DeleteNote removeNote={removeNote}/>} />
          <Route path="/updatenote/:id" element={<UpdateNote editNote={editNote} />} />
          <Route path="/newnote" element={<Addnote addNote={addNote} />}  />
          <Route path="/viewnote/:id" element={<Viewnote list={list}/>}  />
        </Routes>
        <Footer/>
    </>
  );
}

export default App;
