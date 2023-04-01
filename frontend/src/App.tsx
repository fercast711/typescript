import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import AddNoteDialog from "./components/AddNoteDialog";
import Note from "./components/Note";
import { fetchGetNotes, selectNotes, selectshow, setShowAddNoteDialog } from "./store/slice/noteSlice";
import { useAppDispatch } from "./store/store";
import styles from './styles/NotesPage.module.css'
import styleUtils from './styles/util.module.css';


function App() {
  const dispatch =  useAppDispatch();
  const notes = useSelector(selectNotes);
  const showAddNoteDialog = useSelector(selectshow)
  useEffect(()=>{
    dispatch(fetchGetNotes())
  },[dispatch])
  return (
    <Container>
      <Button 
      className={`mb-4 ${styleUtils.blockCenter}`}
      onClick={()=> dispatch(setShowAddNoteDialog(true))}>
        Add new notes
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
      {notes.map(note =>(
      <Col key={note._id}>
        <Note note={note} className={styles.note} />
      </Col>
      
    ))}
      </Row>
    {showAddNoteDialog && 
    <AddNoteDialog dispatch={dispatch}/>}
    </Container>
  );
}

export default App;
