import { Router } from "express";
import * as NoteControllers from "../controllers/note.controllers";
const router = Router();

router.get('/',NoteControllers.getNotes)
router.get('/:noteId', NoteControllers.getNote)
router.post('/', NoteControllers.createNote)
router.put('/:noteId', NoteControllers.updateNote)
router.delete('/:noteId', NoteControllers.deleteNote)


export default router;