import { EventProps } from 'react-big-calendar';
import { IEvent } from '../pages/CalendarPage';

export const CalendarEvent = (props: EventProps<IEvent>) => {

  // console.log( props );

  const { event } = props;

  const { title, user } = event;

  return (
    <>
      <strong>{ title }</strong>
      <span> - { user.name }</span>
    </>
  )
}
