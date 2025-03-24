import { Link } from 'react-router-dom';
import { AuthLayout } from '../';
import { useAuthStore, useForm } from '../../hooks';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const RegisterPage = () => {

  const { startRegister, errorMessage } = useAuthStore();
  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange } = useForm(registerFormFields);

  const registerSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerPassword2) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }
    startRegister({ name: registerName, email: registerEmail, password: registerPassword });
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage])
  

  return (
    <AuthLayout title='Crea una cuenta'>
      <form onSubmit={registerSubmit}>
        <div className="mb-2">
          <label className="text-sm font-medium text-gray-500">Nombre</label>
          <input
            type="text"
            className="w-full border-2 rounded-sm p-2.5 mt-1 border-gray-100 focus:border-blue-500 focus:outline-none"
            name="registerName"
            value={registerName}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <label className="text-sm font-medium text-gray-500">Email</label>
          <input
            type="email"
            className="w-full border-2 rounded-sm p-2.5 mt-1 border-gray-100 focus:border-blue-500 focus:outline-none"
            name="registerEmail"
            value={registerEmail}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <label className="text-sm font-medium text-gray-500">Contraseña</label>
          <input
            type="password"
            className="w-full border-2 rounded-sm p-2.5 mt-1 border-gray-100 focus:border-blue-500 focus:outline-none"
            name="registerPassword"
            value={registerPassword}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            className="w-full border-2 rounded-sm p-2.5 mt-1 border-gray-100 focus:border-blue-500 focus:outline-none"
            placeholder="Repite la contraseña"
            name="registerPassword2"
            value={registerPassword2}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="flex justify-center my-4">
          <button className="bg-blue-500 text-white text-lg rounded-sm h-12 w-full">
            Crear cuenta
          </button>
        </div>
        <div className="flex gap-2 justify-center mb-4">
          <p className="text-sm">¿Ya tienes una cuenta?</p>
          <Link
            className="text-sm text-blue-500 font-medium"
            to="/auth/login"
          >
            Logearse
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
