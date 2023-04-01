import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { newNote, Note } from "../../models/note";
import { AxiosResponse } from "axios";
import { getNotes, createNotes } from "../../api/notes.api";
import { RootState } from "../store";

export const fetchGetNotes = createAsyncThunk<Note[]>(
    'notes/fetchGetNotes',
    async()=>{
        try {
            const response: AxiosResponse<Note[]> = await getNotes();
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const fetchCreateNote = createAsyncThunk<Note, newNote>(
    'notes/fetchCreateNote',
    async(note:newNote)=>{
        try {
            const response: AxiosResponse<Note> = await createNotes(note);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)
interface InitialState{
    notes: Note[],
    showAddNoteDialog: boolean
}

const initialState: InitialState = {
    notes: [],
    showAddNoteDialog: false
};

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers:{
        setShowAddNoteDialog: (state, action: PayloadAction<boolean>)=>{
            state.showAddNoteDialog = action.payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchGetNotes.fulfilled,(state, actions: PayloadAction<Note[]>)=>{
            state.notes = [...actions.payload]
        })
        .addCase(fetchCreateNote.fulfilled,(state, actions: PayloadAction<Note>)=>{
            state.notes = [...state.notes, actions.payload]
            state.showAddNoteDialog = false
        })
        
    },
});

export default noteSlice.reducer
export const {setShowAddNoteDialog} = noteSlice.actions
export const selectNotes = (state: RootState) => state.notes
export const selectshow = (state: RootState) => state.showAddNoteDialog