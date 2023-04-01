import NoteModel from "../models/note";
import { RequestHandler} from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req,res,next)=>{
    try {
        const note = await NoteModel.find().exec();
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

export const getNote: RequestHandler = async(req,res,next)=>{
    const noteId = req.params.noteId;
    
    try {
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note id");
        }
        const note = await NoteModel.findById(noteId).exec();
        if(!note){
            throw createHttpError(404,"note not found");
        } 
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

interface createNoteBody{
    title?: string;
    text?: string;
}

export const createNote: RequestHandler<unknown, unknown,createNoteBody, unknown> = async (req,res,next)=>{
    const {title, text} = req.body
    try{
        if(!title){
            throw createHttpError(400, "Note must have a title")
        }

        const newNote = await NoteModel.create({
            title,
            text
        })

        res.status(201).json(newNote);
    }catch(error){
        next(error);
    }
}

interface UpdateNoteId{
    noteId: string;
}

interface UpdateNoteBody{
    title?: string;
    text?: string;
}

export const updateNote: RequestHandler<UpdateNoteId,unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const {title, text} = req.body;
    try {
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note id");
        }
        if(!title){
            throw createHttpError(400, "Note must have a title")
        }
        const note = await NoteModel.findByIdAndUpdate(noteId,{title,text},{new: true});
        if(!note){
            throw createHttpError(404,"note not found");
        }
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

export const deleteNote: RequestHandler= async (req, res, next) => {
    const noteId = req.params.noteId;
    try {
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note id");
        }
        const note = await NoteModel.findByIdAndDelete(noteId);
        if(!note){
            throw createHttpError(404,"note not found");
        }
        res.status(204).json(note);
    } catch (error) {
        next(error);
    }
}