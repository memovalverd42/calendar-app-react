import { AuthState } from "../../src/store/auth/authSlice"
import { testUser } from "./testUser"


export const initialState: AuthState = {
  status: 'checking',
  user: null,
  errorMessage: null,
}

export const authenticatedState: AuthState = {
  status: 'authenticated',
  user: testUser,
  errorMessage: null,
}

export const notAuthenticatedState: AuthState = {
  status: 'not-authenticated',
  user: null,
  errorMessage: null,
}

export const errorMessageTest = 'Error en el login'

export const notAuthenticatedWithErrorState: AuthState = {
  status: 'not-authenticated',
  user: null,
  errorMessage: errorMessageTest,
}