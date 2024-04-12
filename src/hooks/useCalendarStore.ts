import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "."
import { EventResponse,EventsResponse, calendarApi } from "../api";
import { IEvent } from "../calendar";
import { convertEventsToDateEvents } from "../helpers";
import { onActiveEvent, onAddNewEvent, onDeleteEvent, onLoadEvents, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

  const { events, activeEvent } = useAppSelector( state => state.calendar );
  const dispatch = useAppDispatch();
  const { user } = useAppSelector( state => state.auth );

  const setActiveEvent = ( calendarEvent: IEvent ) => {
    dispatch( onActiveEvent( calendarEvent ) );
  }

  const startSavingEvent = async( calendarEvent: IEvent ) => {

    const id = calendarEvent.id;

    try {

      if( id ) {
        // Actualizando...
        await calendarApi.put(`/events/${id}`, calendarEvent);
        dispatch( onUpdateEvent({ ...calendarEvent }));
        return;
      } 
  
      // Creando...
      const { data } = await calendarApi.post<EventResponse>('/events', calendarEvent);
      dispatch( onAddNewEvent({ 
        ...calendarEvent, 
        id: data.event.id,
        user: {
          id: user!.uid,
          name: user!.name,
        }
      }));
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any ) {
      console.log(error);
      Swal.fire('Error al guardar', error.response?.data.msg, 'error');
    }
  
  }

  const startDeleteEvent = async() => {

    try {
      
      await calendarApi.delete(`/events/${activeEvent?.id}`);

      dispatch( onDeleteEvent() );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      Swal.fire('Error al guardar', error.response?.data.msg, 'error');
    }

  }

  const startLoadingEvents = async() => {
    try {
      const { data } = await calendarApi.get<EventsResponse>('/events');
      const events = convertEventsToDateEvents( data.events );
      dispatch( onLoadEvents(events as unknown as IEvent[]) );
    } catch (error) {
      console.log(error);
    }
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
    startLoadingEvents,
  }

}