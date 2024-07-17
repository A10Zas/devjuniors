import { Link, NavLink } from "react-router-dom";
import { LuLogOut as Logout } from "react-icons/lu";
import useStore from "../store/useStore";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/blogs",
    label: "Blogs",
  },
  {
    href: "/create-post",
    label: "Create Post",
  },
];

const Header = () => {
  const { logout, user } = useStore();
  return (
    <header className="mb-auto px-8 py-2 md:py-4 border-b border-gray-600 flex justify-between top-0 sticky z-10 bg-[#0C1425]">
      <div className="cursor-pointer font-extrabold md:text-xl flex items-center text-center">
        <Link to="/">Dev Juniors</Link>
      </div>
      <nav className="hidden md:block">
        <ul className="flex gap-x-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-gray-400"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          {user ? (
            <li className="flex">
              <button
                className="flex items-center gap-2 hover:text-white"
                onClick={logout}
              >
                Logout <Logout />
              </button>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
      <div className="block md:hidden">
        <div className="drawer drawer-end">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-48 min-h-full bg-base-200 text-base-content">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-400"
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
