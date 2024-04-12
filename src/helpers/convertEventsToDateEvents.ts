import { parseISO } from 'date-fns';
import { EventData } from '../api/types';


export const convertEventsToDateEvents = ( events: EventData[] ) => {

  return events.map( event => {
    event.start = parseISO( (event.start) as unknown as string );
    event.end = parseISO( (event.end) as unknown as string );

    return event
  });

}