import { calendarSlice } from "../../../src/store";
import { calendarInitialState, calendarWithActiveEventState, calendarWithEventsState, events } from "../../fixtures/calendarStates";

describe('Pruebas en el calendarSlice', () => {
  
  test('debe de regresar el initialStae', () => {
    const state = calendarSlice.getInitialState();
    expect( state ).toEqual( calendarInitialState );
  });

  test('onActiveEvent debe de activar el evento', () => {
    const event = {...events[0]};
    const state = calendarSlice.reducer( calendarWithEventsState, calendarSlice.actions.onActiveEvent(event) );
    expect( state.activeEvent ).toEqual( event );
  });

  test('onAddNewEvent debe de agregar un nuevo evento', () => {
    const event = {...events[0]};
    const state = calendarSlice.reducer( calendarWithEventsState, calendarSlice.actions.onAddNewEvent(event) );
    // expect( state.events.length ).toBe( 4 );
    expect( state.events ).toEqual( [...events, event] );
  });

  test('onUpdateEvent debe de actualizar un nuevo evento', () => {
    const event = {...events[0]};
    event.title = 'Nuevo título';
    const state = calendarSlice.reducer( calendarWithEventsState, calendarSlice.actions.onUpdateEvent(event) );
    // expect( state.events[0] ).toEqual( event );
    expect( state.events ).toContain( event );
  });

  test('onDeleteEvent debe de eliminar un evento del store', () => {
    const state = calendarSlice.reducer( calendarWithActiveEventState, calendarSlice.actions.onDeleteEvent() );
    expect( state.events ).not.toContain( events[0] );
  });

  test('onLoadEvents debe de establecer los eventos', () => {
    const state = calendarSlice.reducer( calendarInitialState, calendarSlice.actions.onLoadEvents( events ) );
    expect( state.events ).toEqual( events );
  });

  test('onLogoutCalendar debe de establecer el initialState', () => {
    const state = calendarSlice.reducer( calendarWithActiveEventState, calendarSlice.actions.onLogoutCalendar() );
    expect( state ).toEqual( calendarInitialState );
  });

});