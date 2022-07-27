import '../App.css';
import { useState } from 'react';
import taskService from '../services/taskService';
import PropTypes from 'prop-types';

const Note = ({ task, tasks, setTasks }) => {

    const [showNote, setShowNote] = useState(false)
    const [noteText, setNoteText] = useState(task.notes)

    const handleTextChange = (event) => {
        setNoteText(event.target.value)
    }

    const handleShowNotesClick = e => {
        e.stopPropagation()
        if (showNote) 
        {
            let updatedTask = task;
            updatedTask.notes = noteText;

            taskService.update(updatedTask.id, updatedTask).then(returnedTask => {
                taskService.getAll()
                .then(setShowNote(!showNote))
                  .then(tasks => {
                      setTasks(tasks)
                })
              })
        }
        else {
            setShowNote(!showNote)
        }
    }

    return (
        <>
        <div className='showNotes' onClick={(e) => {handleShowNotesClick(e)}}>
            {showNote ? 'Save notes' : 'Show notes'}
        </div>
        <div>
            {showNote
                ? <textarea className='noteArea' rows='5' cols='36' onChange={handleTextChange} value={noteText}></textarea>
                : null
            }
        </div>
        </>
    )
}

Note.propTypes = {
    task: PropTypes.object,
    tasks: PropTypes.array,
    setTasks: PropTypes.func.isRequired
}

export { Note };