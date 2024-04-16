import React from "react";
import { render, screen } from "@testing-library/react";
import { AppRouter } from '../../src/router/AppRouter';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { MemoryRouter } from "react-router-dom";

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>
}));

jest.mock('react-modal', () => ({
  ...jest.requireActual('react-modal'),
  setAppElement: () => {}
}));

describe('Pruebas en AppRouter', () => {
  
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
    
    (useAuthStore as jest.Mock).mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);

    expect( mockCheckAuthToken ).toHaveBeenCalled();
    expect( screen.getByText('Cargando...') ).toBeTruthy();

  });

  test('debe de mostrar el login en caso de no estar autenticado', () => {
    
    (useAuthStore as jest.Mock).mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/auth/',]}>
        <AppRouter />
      </MemoryRouter>
    );

    expect( screen.getByText('Login') ).toBeTruthy();
    expect( container ).toMatchSnapshot();

  });

  test('debe de mostrar el calendario en caso de estar autenticado', () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect( screen.getByText('CalendarPage') ).toBeTruthy();
  });

});