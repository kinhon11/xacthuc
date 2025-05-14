import React from 'react';
import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Car size={28} className="text-orange-500" />
          <span className="text-xl font-bold">RentalCars</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-orange-400 transition-colors">
                Xác thực
              </Link>
            </li>
            <li>
              <Link to="/status" className="hover:text-orange-400 transition-colors">
                Trạng thái
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;