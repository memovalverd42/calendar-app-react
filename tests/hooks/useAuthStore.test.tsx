import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import { act, renderHook, waitFor } from '@testing-library/react';
import { AuthState, authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { useAuthStore } from "../../src/hooks";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";


/**
 * Función que crea un store de prueba para las pruebas del AuthHook
 * @param initialState Estado inicial del store para las pruebas
 */
const getMockStore = ( initialState: AuthState ) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer
    },
    preloadedState: {
      auth: { ...initialState }
    }
  });
}

describe('Pruebas en useAuthStore', () => {
  beforeEach(() => localStorage.clear());
  
  test('debe de retornar los valores por defecto', () => {
    const mockStore = getMockStore( initialState );

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    expect( result.current ).toEqual({
      status: 'checking',
      user: null,
      errorMessage: null,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test('startLogin debe de realizar el login correctamente', async() => {
    const mockStore = getMockStore( {...notAuthenticatedState} );
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act( async() => {
      await result.current.startLogin(testUserCredentials);
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: null,
      status: 'authenticated',
      user: expect.objectContaining({name: "Test User"})
    });
    expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
  });

  test('startLogin debe de fallar la autenticacion', async() => {
    const mockStore = getMockStore( {...notAuthenticatedState} );
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act( async() => {
      await result.current.startLogin({email: 'test4@google.com', password: '123456'});
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Credenciales incorrectas',
      status: 'not-authenticated',
      user: null
    });
    expect( localStorage.getItem('token') ).toBeNull();

    await waitFor(() => {
      expect( result.current.errorMessage ).toBeNull();
    });
  });

  test('startRegister debe de registrar un nuevo usuario', async() => {
    const mockStore = getMockStore( {...notAuthenticatedState} );
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    const userResponse = {
      ok: true,
      uid: "6619d9462342e078da278360",
      name: "Test User",
      token: "ABC123"
    }

    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue(Promise.resolve({
      data: userResponse
    }) as Promise<unknown>);

    await act(async () => {
      await result.current.startRegister({name: 'Test User', email: 'test@google.com', password: '123456'});
    });

    expect(result.current.user).toEqual(userResponse);

    spy.mockRestore();
  });

  test('startRegister debe de fallar por usuario existente', async() => {
    const mockStore = getMockStore( {...notAuthenticatedState} );
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    expect(result.current.errorMessage).toBe('El correo ya está registrado');
  });

  test('chekAuthToken debe de fallar si no hay token en storage', async() => {
    const mockStore = getMockStore( {...initialState} );
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    expect(result.current.status).toBe('not-authenticated');
  });

  test('chekAuthToken debe de autenticar si existe token en storage', async() => {
    const { data } = await calendarApi.post('/auth', testUserCredentials);
    localStorage.setItem('token', data.token);

    const mockStore = getMockStore( {...initialState} );
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: null,
      status: 'authenticated',
      user: expect.objectContaining({token: expect.any(String)})
    });
  });

});