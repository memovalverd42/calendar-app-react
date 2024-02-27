import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IEvent } from '../../calendar';

const event: IEvent =   {
  _id: new Date().getTime(),
  title: 'Mi cumpleaños',
  notes: 'Comprarme algo',
  start: new Date('2024-02-26T10:00:00'),
  end: new Date('2024-02-26T12:00:00'),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Guillermo'
  }
}

export interface CalendarState {
  events: IEvent[];
  activeEvent: IEvent | null;
}

const initialState: CalendarState = {
  events: [event,],
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
      state.events = state.events.map( e => ( e._id === payload._id) ? payload : e );
      state.activeEvent = null;
    },
    onDeleteEvent: ( state ) => {
      if( state.activeEvent ){
        state.events = state.events.filter( e => e._id !== state.activeEvent?._id );
        state.activeEvent = null;
      }
    }
  },
})

export const { 
  onActiveEvent, 
  onAddNewEvent, 
  onDeleteEvent,
  onUpdateEvent,
} = calendarSlice.actions;

export default calendarSlice.reducer;