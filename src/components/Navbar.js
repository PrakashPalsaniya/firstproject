import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="flex justify-around items-center h-12 text-blue-500 text-2xl  mb-5 font-semibold pt-3">
      <NavLink
        to="/"
        className="px-2 py-1 rounded-lg transition duration-200 font-semibold font-mono "
        style={({ isActive }) =>
          isActive
            ? { color: '#ffffff', background: '#7600dc' }
            : {}
        }
      >
        Home
      </NavLink>
      
      <NavLink
        to="/pastes"
        className="px-2 py-1 rounded-lg transition duration-200 font-mono font-semibold"
        style={({ isActive }) =>
          isActive
            ? { color: '#fff', background: '#7600dc' }
            : {}
        }
      >
        Paste
      </NavLink>
    </div>
  );
};
