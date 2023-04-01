import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { newNote } from "../models/note";
import { fetchCreateNote, setShowAddNoteDialog } from "../store/slice/noteSlice";
import { AppDispatch } from "../store/store";
interface Props {
    dispatch: AppDispatch;
  };

const AddNoteDialog = ({dispatch}: Props) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<newNote>();

    const onSubmit = (input: newNote) => {
        dispatch(fetchCreateNote(input))
    };
    return ( 
        <Modal show onHide={()=> dispatch(setShowAddNoteDialog(false))}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Note
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                        type="text"
                        placeholder="Title"
                        isInvalid={!!errors.title}
                        {...register("title", {required: "Is title Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control 
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        {...register("text")}
                        />
                    </FormGroup>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                type="submit"
                form="addNoteForm"
                disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default AddNoteDialog;