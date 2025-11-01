import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/tournaments">Tournaments</Link>
      <Link to="/chefs">Chefs</Link>
    </nav>
  );
};

export default Navbar;

