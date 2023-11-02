import { useLocation, Link } from 'react-router-dom';
import '../App.css';

function DeleteNote(props) {
    const location = useLocation();
    const note = location.state;

    function del() {
        props.removeNote(note.id);
        // alert("Note deleted sucessfully!");
    }

    return(
        <>
            <header>
                <h1>Confirm - Delete</h1>
            </header>
            <section id='delete'>
                <div className="confirm-box">
                    <p>Are you sure? <br/><br/> Permenently delete your note "{note.title}"? You can't undo this after deleting.</p>
                    <div>
                        <Link to={`/viewnote/${note.id}`} className="btn cancel">Cancel</Link>
                        <Link to="/"
                            className="btn delete"
                            onClick={del}
                        >
                            Delete
                        </Link>
                    </div>
                   
                </div>
            </section>
        </>
    );
}

export default DeleteNote;