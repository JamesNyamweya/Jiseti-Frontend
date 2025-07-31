import { useSelector } from "react-redux";
import { useLoginModal } from "../contexts/LoginModalContext";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const { openLogin } = useLoginModal();
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/", { replace: false }); 
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100); 
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#1F2937] text-white">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-xl font-bold">
            <img
              src="/src/assets/Jiseti_logo.png"
              alt="Jiseti"
              className="h-[30px]"
            />
          </Link>

          <nav className="hidden space-x-6 md:flex">
            <span
              onClick={handleHomeClick}
              className="hover:text-gray-300 px-3 py-2 rounded cursor-pointer"
            >
              Home
            </span>

            <Link
              to="/#about_us"
              className="hover:text-gray-300 px-3 py-2 rounded"
            >
              About us
            </Link>

            <Link
              to="/#works"
              className="hover:text-gray-300 px-3 py-2 rounded"
            >
              How it works
            </Link>

            {!user && (
              <Link
                to="/user_dash"
                className="hover:text-gray-300 px-3 py-2 rounded"
              >
                Report Now
              </Link>
            )}

            {user ? (
              <Link
                to="/logout"
                className="hover:text-gray-300 px-3 py-2 rounded hover:cursor-pointer"
              >
                Logout
              </Link>
            ) : (
              <button
                onClick={() => openLogin()}
                className="hover:text-gray-300 px-3 py-2 rounded hover:cursor-pointer"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
