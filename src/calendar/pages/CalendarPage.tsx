/* eslint-disable @typescript-eslint/no-unused-vars */
import { SyntheticEvent, useState } from 'react';
import { Calendar, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CustomCalendarModal, FabAddNew, FabDelete, IEvent, Navbar } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

  const { events, setActiveEvent } = useCalendarStore();

  const { openDateModal } = useUiStore();

  const [_lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = ( _event: IEvent, _start: Date, _end: Date, _isSelected: boolean ) => {
    // console.log( {event, start, end, isSelected} );

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      display: 'block'
    }

    return {
      style
    }

  }

  const onDoubleClick = ( event: IEvent, _e: SyntheticEvent ) => {
    console.log( event );
    openDateModal();
  }

  const onSelect = ( event: IEvent, _e: SyntheticEvent ) => {
    setActiveEvent( event )
  }

  const onViewChange = ( view: View ) => {
    setLastView( view );
    localStorage.setItem('lastView', view);
  } 

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={ localizer }
        defaultView='week'
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}

        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />

      <CustomCalendarModal />

      <FabAddNew/>
    
      <FabDelete/>
      

    </>
  )
}
