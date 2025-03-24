import { Link } from 'react-router-dom';
import { AuthLayout } from '../';
import { useAuthStore, useForm } from '../../hooks';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();
    const { loginEmail, loginPassword, onInputChange } = useForm(loginFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
     }, [errorMessage])


    return (
        <AuthLayout title='Inicia sesión'>
            <form onSubmit={loginSubmit}>
                <div className="mb-2">
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <input
                        type="email"
                        className="w-full border-2 rounded-sm p-2.5 mt-1 border-gray-100 focus:border-blue-500 focus:outline-none"
                        name="loginEmail"
                        value={loginEmail}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="text-sm font-medium text-gray-500">Contraseña</label>
                    <input
                        type="password"
                        className="w-full border-2 rounded-sm p-2.5 mt-1 border-gray-100 focus:border-blue-500 focus:outline-none"
                        name="loginPassword"
                        value={loginPassword}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="flex gap-2 mt-3 items-center">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="w-4 h-4"
                        />
                        <span className="text-sm">Mantener mi sesión iniciada</span>
                    </label>
                </div>
                <div className="flex justify-center my-4">
                    <button className="bg-blue-500 text-white text-lg rounded-sm h-12 w-full">
                        Iniciar sesión
                    </button>
                </div>
                <div className="flex gap-2 justify-center mb-4">
                    <p className="text-sm">¿Todavía no tienes una cuenta?</p>
                    <Link
                        className="text-sm text-blue-500 font-medium"
                        to="/auth/register"
                    >
                        Regístrate
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};
