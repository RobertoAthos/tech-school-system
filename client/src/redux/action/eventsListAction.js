import axios from "axios";
const apiUrl = "http://localhost:5000/api/events";

export const getAllEvents = async (dispatch) => {
    dispatch({ type: 'GET_EVENTS_REQUEST' });
  
    try {
      const res = await axios.get(apiUrl + "/events/admin");
      dispatch({ type: 'GET_EVENTS_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'GET_EVENTS_FAILURE', payload: error });
    }
  };
  

  export const createEvent = (payload) => async (dispatch) => {
    dispatch({ type: 'POST_EVENTS_REQUEST' });
  
    try {
      const res = await axios.post(apiUrl + "/events/new/admin", {
        title: payload.eventTitle,
        id_admin: payload.eventId,
        description: payload.eventDescription,
      });
      dispatch({ type: 'POST_EVENTS_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'POST_EVENTS_FAILURE', payload: error });
    }
  };
  

  export const deleteEvent = (payload) => async (dispatch) => {
    dispatch({ type: 'DELETE_EVENTS_AREQUEST' });
  
    try {
      const res = await axios.delete(apiUrl + "/events/admin/:id" + payload.eventId);
      dispatch({ type: 'DELETE_EVENTS_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'DELETE_EVENTS_FAILURE', payload: error });
    }
  };