import axios from "axios";
import { newNote } from "../models/note";

export const getNotes = async()=>
    await axios.get('/api/notes');

export const createNotes = async(note: newNote)=>
    await axios.post('/api/notes',note);