import express from "express";
import routerNote from "./routes/note.routes";
import * as middlewareNotes from "./middleware/notes.middleware";
import morgan from "morgan";
const app = express();

app.use(morgan("dev"))
app.use(express.json());
app.use('/api/notes',routerNote)
app.use(middlewareNotes.notFound)
app.use(middlewareNotes.getError)


export default app;