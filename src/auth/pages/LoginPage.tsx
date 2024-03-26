import { FormEvent, useEffect } from "react";
import { useAuthStore, useForm } from "../../hooks";
import "./LoginPage.css";
import Swal from "sweetalert2";

export interface LoginState {
  loginEmail: string;
  loginPassword: string;
}

export interface RegisterState {
  registerName: string,
  registerEmail: string,
  registerPassword1: string,
  registerPassword2: string,
}

const loginFormFields: LoginState = {
  loginEmail: '',
  loginPassword: '',
}

const registerFormFields: RegisterState = {
  registerName: '',
  registerEmail: '',
  registerPassword1: '',
  registerPassword2: '',
}

export const LoginPage = () => {

  const { startLogin, startRegister, errorMessage } = useAuthStore();

  const { 
    loginEmail, 
    loginPassword, 
    onInputChange: onLoginInputChange,
  } = useForm( loginFormFields );

  const { 
    registerName,
    registerEmail, 
    registerPassword1, 
    registerPassword2, 
    onInputChange: onRegisterInputChange,
  } = useForm( registerFormFields );

  const onLoginSubmit = ( e: FormEvent ) => {
    e.preventDefault();
    startLogin({email: loginEmail, password: loginPassword});
  }

  const onRegisterSubmit = ( e: FormEvent ) => {
    e.preventDefault();

    if( registerPassword1 !== registerPassword2 ) {
      Swal.fire('Error', 'Contraseñas no son iguales', 'error');
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword1
    });
  }

  useEffect(() => {
    if( errorMessage !== null ) {
      Swal.fire('Error en la autenticación perro', errorMessage, 'error');
    }
  }, [ errorMessage ]);
  

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={ onLoginSubmit }>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"

                name="loginEmail"
                value={ loginEmail }
                onChange={ onLoginInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"

                name="loginPassword"
                value={ loginPassword }
                onChange={ onLoginInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={ onRegisterSubmit }>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"

                name="registerName"
                value={ registerName }
                onChange={ onRegisterInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"

                name="registerEmail"
                value={ registerEmail }
                onChange={ onRegisterInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"

                name="registerPassword1"
                value={ registerPassword1 }
                onChange={ onRegisterInputChange }
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"

                name="registerPassword2"
                value={ registerPassword2 }
                onChange={ onRegisterInputChange }
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
