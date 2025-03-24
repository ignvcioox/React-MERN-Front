import { useAuthStore } from '../../hooks';

export const Navbar = () => {

  const { startLogout, user } = useAuthStore();

  return (
    <div className="flex items-center bg-blue-500 p-4 mb-4 text-white justify-between">
      <div>
        <i className="fas fa-calendar-alt" />
        &nbsp;
        {user.name}
      </div>
      <div>
        <i className="fas fa-sign-out-alt" />
        &nbsp;
        <button
          onClick={startLogout}
        >
          Salir
        </button>
      </div>
    </div>
  )
}