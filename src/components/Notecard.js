import { Link } from 'react-router-dom';

function Notecard(props) {
    const {id, title, description, date, time} = props.note;

    return (
        <Link to={`/viewnote/${id}`} state={props.note} className='note-link'>
            <div className='note'>
                <div className='title'>{title}</div>
                {
                    (description.length < 100) ? 
                        <div className='description'>{description}  </div> : 
                        <div className='description'> {description.substring(0, 100)} <Link to={`/viewnote/${id}`} className='readmore'>...Read More</Link>  </div>
                }
                <div className='date-time'>
                    <div>{date}</div>
                    <div>{time}</div>
                </div>
            </div>
        </Link>
    );
}

export default Notecard;