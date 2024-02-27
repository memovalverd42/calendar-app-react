import { useAppDispatch, useAppSelector } from "."
import { IEvent } from "../calendar";
import { onActiveEvent, onAddNewEvent, onDeleteEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

  const { events, activeEvent } = useAppSelector( state => state.calendar );
  const dispatch = useAppDispatch();

  const setActiveEvent = ( calendarEvent: IEvent ) => {
    dispatch( onActiveEvent( calendarEvent ) );
  }

  const startSavingEvent = async( calendarEvent: IEvent ) => {
    //TODO: llegar al backend

    if( calendarEvent._id ) {
      // Actualizando...
      dispatch( onUpdateEvent({ ...calendarEvent }) );
    } else {
      // Creando...
      dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
    }

  }

  const startDeleteEvent = () => {
    dispatch( onDeleteEvent() );
  }

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: activeEvent !== null,
    //* Methods
    setActiveEvent,
    startDeleteEvent,
    startSavingEvent,
  }

}