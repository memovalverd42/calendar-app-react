import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useUiStore } from '../../src/hooks/useUiStore';
import { UiState, uiSlice } from '../../src/store';

/**
 * Función que crea un store de prueba para las pruebas de los hooks
 * @param initialState Estado inicial del store para las pruebas
 */
const getMockStore = ( initialState: UiState ) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: {...initialState}
    }
  });
}

describe('Pruebas en hook useUiStore', () => {
  
  test('debe de regresar los valores por defecto', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });
  });

  test('onOpenDateModal debe de colocar true en el isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });
    const { openDateModal } = result.current;
    act(() => {
      openDateModal();
    });
    expect( result.current.isDateModalOpen ).toBe(true);
  });

  test('closeDateModal debe de colocar en false el isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });
    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });
    const { closeDateModal } = result.current;
    act(() => {
      closeDateModal();
    });
    expect( result.current.isDateModalOpen ).toBe(false);
  });

  test('toggleDateModal debe de hacer el cambio de estado en isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });
    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });
    act(() => {
      result.current.toggleDateModal();
    });
    expect( result.current.isDateModalOpen ).toBe(false);
    act(() => {
      result.current.toggleDateModal();
    });
    expect( result.current.isDateModalOpen ).toBe(true);
  });

});