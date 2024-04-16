import { IEvent } from '../../src/calendar/types/types';
import { CalendarState } from '../../src/store/calendar/calendarSlice';

export const events: IEvent[] = [
  {
    id: '1',
    title: 'Mi cumpleaños',
    notes: 'Comprarme algo',
    start: new Date('2024-02-26T10:00:00'),
    end: new Date('2024-02-26T12:00:00'),
    bgColor: '#fafafa',
    user: {
      id: '123',
      name: 'Guillermo'
    }
  },
  {
    id: '2',
    title: 'Cita con el doctor',
    notes: 'Llevar los análisis',
    start: new Date('2024-02-27T10:00:00'),
    end: new Date('2024-02-27T12:00:00'),
    bgColor: '#fafafa',
    user: {
      id: '123',
      name: 'Guillermo'
    }
  },
  {
    id: '3',
    title: 'Cita con el dentista',
    notes: 'Llevar los análisis',
    start: new Date('2024-02-28T10:00:00'),
    end: new Date('2024-02-28T12:00:00'),
    bgColor: '#fafafa',
    user: {
      id: '123',
      name: 'Guillermo'
    }
  }
];


export const calendarInitialState: CalendarState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
}

export const calendarWithEventsState: CalendarState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
}

export const calendarWithActiveEventState: CalendarState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
}