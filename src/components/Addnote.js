import '../App.css';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import back from '../images/back.png';
import done from '../images/done.png';


function Addnote(props) {

    const navigate = useNavigate();
    const titleRef = useRef(null);
    const [error, setError] = useState("");

    useEffect(()=> {
        titleRef.current.focus();
    }, [])

    const [input, setInput] = useState({
        id: "",
        title: "",
        description: "",
        date: "",
        time: ""
    });

    function handleSubmit(e) {
        e.preventDefault();

        if (input.title==="") {
            setError('Title is required!'); return;
        }
        if (input.description==="") {
            setError('Description is required!'); return;
        }

        props.addNote(input);
        setInput(previousState => {
            return {...previousState, title: "", description: ""}
        })

        navigate(-1);
    }

    return(
        <>
            <header>
                <h1>
                    <Link to="/" className='link'><img src={back} alt='back'/></Link>
                    <span>Add New Note</span>
                </h1>
                <img src={done} alt='done' onClick={handleSubmit}/>
            </header>
            <section>
                {error === "" ? <></> : <div className='error'>
                                            <span className='icon'>&#9888;</span>
                                            <span className='error-text'>{error}</span>
                                            <span className='icon' onClick={()=>{setError("")}}>&#10005;</span></div>}
                <form>
                    <input type='text' 
                        ref={titleRef}
                        placeholder='Type your title'
                        value={input.title}
                        onChange={(e) => {
                            setInput(previousState => {
                                return {...previousState, title: e.target.value}
                            });
                            setError("");
                        }}
                       
                    /><br/>

                    <textarea 
                        placeholder='Type description of your note' 
                        rows={25}
                        value={input.description}
                        onChange={(e) => {
                            setInput(previousState => {
                                return {...previousState, description: e.target.value}
                            });
                            setError("");
                        }}
                    ></textarea>
                </form>
            </section>
            
        </>
    );
}

export default Addnote;