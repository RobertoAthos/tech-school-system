import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createEvent,deleteEvent,getAllEvents} from '../redux/action/eventsListAction'
import { BiTrash } from 'react-icons/bi'

export default function EventsList() {

  const dispatch = useDispatch()
  const {
    isLoadingPost,
    successPost,
    errorPost,
    isLoading,
    events,
    error,
    isLoadingDelete,
  } = useSelector((state) => state.events);

  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [validationError, setValidationError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = (e)=> {
    e.preventDefault();

    if (eventTitle.length === 0) {
      setValidationError("Título é obrigatório");
    } else if (eventDescription.length === 0) {
      setValidationError("Descrição é obrigatória");
    }

    if (eventTitle && eventDescription) {
      setEventTitle("");
      setEventDescription("");
      setValidationError("");
      dispatch(createEvent({eventTitle,eventDescription}));
    }
  };
  
  const handleDelete = (eventId) => {
    dispatch(deleteEvent({ eventId }));
  };

  useEffect(() => {
    if (successPost) {
      setSuccess(successPost.message);
    } else if (errorPost) {
      setValidationError("Error: " + errorPost.message);
    }
  }, [successPost, errorPost]);

  useEffect(() => {
    setTimeout(() => {
      setSuccess("");
      setValidationError("");
    }, 3000);
  }, [success, validationError]);

  useEffect(() => {
    dispatch(getAllEvents);
  }, [dispatch, isLoadingPost, isLoadingDelete]);

  return (
    <div className='events-container'>
      <div className="validation-box">
      {validationError && (
            <div>
              <p className="invalid-feedback">{validationError}</p>
            </div>
          )}
          {success && (
            <div>
              <p className="valid-feedback">{success}</p>
            </div>
          )}
      </div>
      <div className="form-cointainer">
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Título' onChange={e=>setEventTitle(e.target.value)} value={eventTitle} />
            <input type="text" placeholder='Descrição' onChange={e=>setEventDescription(e.target.value)} value={eventDescription}/>
            <button type="submit" className="add-task-btn">
            {isLoadingPost ? "Adicionando evento ..." : "Adicionar Evento"}
          </button>
        </form>
      </div>
      <div className="events">
        <h2>Eventos</h2>
        {isLoading && <h2>Carregando...</h2>}

        {events.length === 0 ? (
            <h3>Nenhum evento encontrado</h3>
          ) : (
            events.events.map((event, index) => (
              <div key={index} className='tasks-card'>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <div className="button-task">
                <button onClick={() => handleDelete(event._id)} className='delete-btn'>
                  <BiTrash/>
                </button>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  )
}
