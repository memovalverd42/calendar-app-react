import { useAppDispatch, useAppSelector } from '.';
import { calendarApi } from '../api';
import { User, clearErrorMessage, onCheking, onLogin, onLogout } from '../store';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export const useAuthStore = () => {

  const { status, user, errorMessage } = useAppSelector( state => state.auth );
  const dispatch = useAppDispatch();

  const startLogin = async({ email, password }: LoginCredentials ) => {

    dispatch( onCheking() );

    try {

      const { data } = await calendarApi.post<User>('/auth', { email, password });
      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime().toString() );
      dispatch( onLogin( data ) );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

      console.log(error);
      dispatch( onLogout( 'Credenciales incorrectas' ) );
      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 10);
      
    }
    
  }
  
  const startRegister = async({ name, email, password }: RegisterCredentials) => {
    dispatch( onCheking() );
    
    try {
      
      const { data } = await calendarApi.post<User>('/auth/new', { name, email, password });
      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime().toString() );
      dispatch( onLogin( data ) );
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      
      console.log(error);
      dispatch( onLogout( error.response.data?.msg || 'Error' ) );
      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 10);
      
    }
  }

  const checkAuthToken = async() => {
    const token = localStorage.getItem('token')!;
    if(!token) return dispatch( onLogout(null) );

    try {
      
      const { data } = await calendarApi.get<User>('/auth/revalidate');
      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime().toString() );
      dispatch( onLogin( data ) );

    } catch (error) {
      
      localStorage.clear();
      dispatch( onLogout(null) );

    }
  }

  const startLogout = () => {
    localStorage.clear();
    dispatch( onLogout(null) );
  }
  
  return {
    //* Propiedades
    status,
    user,
    errorMessage,
    
    //* Metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  }

}