import calendarApi from '../../src/api/calendarApi';


describe('Pruebas en el Calendar API', () => {

  test('debe de tener la configuración por defecto', () => {
    const { VITE_API_URL } = process.env;
    expect( calendarApi.defaults.baseURL ).toBe( VITE_API_URL );
  });

  test('debe de tener el x-token el header de las peticiones', async() => {
    const token = 'ABC123ABC123';
    localStorage.setItem('token', token);
    const res = await calendarApi.get('/auth')
                                 .then( res => res )
                                 .catch( res => res );
    expect( res.config.headers['x-token'] ).toBe( token );
  });

});