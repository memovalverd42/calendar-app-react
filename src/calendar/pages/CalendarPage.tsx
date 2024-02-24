import { SyntheticEvent, useState } from 'react';
import { Calendar, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CustomCalendarModal, Navbar } from '../';
import { localizer, getMessagesES } from '../../helpers';

export interface User {
  _id: string;
  name: string;
}

export interface IEvent {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: User;
}

const events: IEvent[] = [
  {
    title: 'Mi cumpleaños',
    notes: 'Comprarme algo',
    start: new Date('2022-09-20T10:00:00'),
    end: new Date('2022-09-20T12:00:00'),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Guillermo'
    }
  },
]


export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = ( event: IEvent, start: Date, end: Date, isSelected: boolean ) => {
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

  const onDoubleClick = ( event: IEvent, e: SyntheticEvent ) => {
    console.log( event );
  }

  const onSelect = ( event: IEvent, e: SyntheticEvent ) => {
    console.log( event );
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

    </>
  )
}
