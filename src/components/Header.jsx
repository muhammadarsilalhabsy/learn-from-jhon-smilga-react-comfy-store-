import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { logoutUser } from "../features/user/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userState.user);
  const handleLogout = () => {
    navigate("/");
    dispatch(clearCart());
    dispatch(logoutUser());
  };
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {/* USER */}
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-6 items-center">
            <p className="text-xs sm:text-sm">Hallo, {user.username}</p>
            <button
              className="btn btn-xs btn-primary btn-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="text-xs sm:text-sm link link-hover">
              Sign In / Guest
            </Link>
            <Link to="/register" className="text-xs sm:text-sm link link-hover">
              Create an account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
