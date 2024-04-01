import React from "react";
import { Container, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-2 shadow-md bg-gray-500 rounded-b-2xl">
      <Container>
        <nav className="flex">
          <div className="mr-4 ">
            <Link to="/"><img className="object-cover rounded-full h-12 w-12 shadow-2xl hover:shadow-gray-100 duration-700 hover:rotate-[360deg] hover:scale-[1.2]" src="blog.png"></img></Link>
          </div>
          <ul className="flex ml-auto gap-3">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-block px-6 py-2 duration-500 hover:bg-blue-300 rounded-full"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus ? (
              <li>
                <LogoutBtn />
              </li>
            ) : null}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
