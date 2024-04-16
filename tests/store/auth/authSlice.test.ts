import { authSlice } from '../../../src/store/auth/authSlice';
import { authenticatedState, errorMessageTest, initialState, notAuthenticatedState, notAuthenticatedWithErrorState } from '../../fixtures/authStates';
import { testUser } from '../../fixtures/testUser';


describe('Pruebas en authSlice', () => {
  
  test('debe de regresar el estado inicial', () => {
    const state = authSlice.getInitialState();
    expect( state ).toEqual( initialState );
  });

  test('debe de realizar un login', () => {
    const state = authSlice.reducer( initialState, authSlice.actions.onLogin( testUser ) );
    expect( state ).toEqual( authenticatedState );
  });

  test('debe de realizar el logout', () => {
    const state = authSlice.reducer( authenticatedState, authSlice.actions.onLogout(null) );
    expect( state ).toEqual( notAuthenticatedState );

    const state2 = authSlice.reducer( authenticatedState, authSlice.actions.onLogout(errorMessageTest) );
    expect( state2 ).toEqual( notAuthenticatedWithErrorState );
  });

  test('debe de limpiar el error message', () => {
    const state = authSlice.reducer( notAuthenticatedWithErrorState, authSlice.actions.clearErrorMessage() );
    expect( state ).toEqual( notAuthenticatedState );
  });

  test('debe de cambiar al estado cheking', () => {
    const state = authSlice.reducer( notAuthenticatedWithErrorState, authSlice.actions.onCheking() );
    expect( state ).toEqual( initialState );
  });

});