import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IEvent } from '../../calendar';

// const event: IEvent =   {
//   title: 'Mi cumpleaños',
//   notes: 'Comprarme algo',
//   start: new Date('2024-02-26T10:00:00'),
//   end: new Date('2024-02-26T12:00:00'),
//   bgColor: '#fafafa',
//   user: {
//     id: '123',
//     name: 'Guillermo'
//   }
// }

export interface CalendarState {
  isLoadingEvents: boolean;
  events: IEvent[];
  activeEvent: IEvent | null;
}

const initialState: CalendarState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onActiveEvent: ( state, { payload }: PayloadAction<IEvent> ) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: ( state, { payload }: PayloadAction<IEvent> ) => {
      state.events.push( payload );
      state.activeEvent = null;
    },
    onUpdateEvent: ( state, { payload }: PayloadAction<IEvent> ) => {
      state.events = state.events.map( e => ( e.id === payload.id) ? payload : e );
      state.activeEvent = null;
    },
    onDeleteEvent: ( state ) => {
      if( state.activeEvent ){
        state.events = state.events.filter( e => e.id !== state.activeEvent?.id );
        state.activeEvent = null;
      }
    },
    onLoadEvents: ( state, { payload }: PayloadAction<IEvent[]> ) => {
      // state.events = payload;
      payload.forEach( event => {
        const exists = state.events.some( dbEvent => dbEvent.id === event.id );
        if( !exists ) {
          state.events.push(event);
        }
      })
      state.isLoadingEvents = false;
    },
    onLogoutCalendar: ( state ) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
})

export const { 
  onActiveEvent, 
  onAddNewEvent, 
  onDeleteEvent,
  onUpdateEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;

export default calendarSlice.reducer;