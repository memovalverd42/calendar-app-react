import { uiSlice } from '../../../src/store/ui/uiSlice';


describe('Pruebas en el UI slice', () => {
  
  test('debe de regresar el estado por defecto', () => {
    const state = uiSlice.getInitialState();
    expect( state.isDateModalOpen ).toBeFalsy();
  });

  test('debe de cambiar el isDateModalOpen correctamente', () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer( state, uiSlice.actions.onOpenDateModal() );
    expect( state.isDateModalOpen ).toBeTruthy();
    state = uiSlice.reducer( state, uiSlice.actions.onCloseDateModal() );
    expect( state.isDateModalOpen ).toBeFalsy();
  });

});