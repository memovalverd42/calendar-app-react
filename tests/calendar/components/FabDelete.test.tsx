import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';

jest.mock('../../../src/hooks/useCalendarStore');


describe('Pruebas en <FabDelete />', () => {
  
  const mockStartDeleteEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar el componente correctamente', () => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      hasEventSelected: false
    });

    render(<FabDelete />)

    const button: HTMLButtonElement = screen.getByLabelText('btn-delete');

    expect( button.classList ).toContain('fab-danger');
    expect( button.classList ).toContain('btn-danger');
    expect( button.classList ).toContain('btn');

    expect( button.style.display ).toBe('none');
  });

  test('debe de mostrar el boton si hay evento activo', () => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      hasEventSelected: true
    });

    render(<FabDelete />)

    const button: HTMLButtonElement = screen.getByLabelText('btn-delete');
    expect( button.style.display ).toBe('');
  });

  test('debe de llamar a startDeleteEvent() con el click y evento activo', () => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      hasEventSelected: true,
      startDeleteEvent: mockStartDeleteEvent,
    });

    render(<FabDelete />);

    const button: HTMLButtonElement = screen.getByLabelText('btn-delete');

    fireEvent.click( button );

    expect( mockStartDeleteEvent ).toHaveBeenCalled();
  });

});