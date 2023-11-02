import { Link, useParams} from 'react-router-dom';
import compose from '../images/compose.png';
import trash from '../images/trash-can.png';
import { useEffect, useState } from 'react';
import back from '../images/back.png'
import axios from 'axios';

function Viewnote() {

    const [note, setNote] = useState({});
    const {id} = useParams();


    useEffect(()=> {

        async function getNote() {
            const apiUrl = `http://localhost:3004/notes/${id}`;

            const response = await axios.get(apiUrl);
            setNote(response.data);
        }

        getNote();

    }, [id])

    return(
        <>
            <header>
                <h1>
                    <Link to="/" className='link'><img src={back} alt='back'/></Link>
                </h1> 
                <Link to={`/deletenote/${id}`} state={note}><img src={trash} alt='trash' className='trash'/></Link>
                <Link to={`/updatenote/${id}`} state={note}><img src={compose} alt='edit' className='edit'/></Link> 
            </header>
            <section className='viewnotes'>
                <h2>{note.title}</h2>
                <p>{note.description}</p>
            </section>
        </>
    );
}

export default Viewnote;