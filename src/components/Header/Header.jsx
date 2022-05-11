import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
const Header = ({ handleConnect }) => {
  return (
    <div>
      <header className="customContainer flex justify-center flex-col md:justify-between md:flex-row items-center">
        <div className=" lg:w-30p md:w-50p">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div>
          <button
            className="bg-secondary-blue text-lg font-medium py-4 px-12 rounded-md border border-secondary-blue hover:bg-transparent hover:text-secondary-blue duration-500"
            onClick={(e) =>{e.preventDefault(); handleConnect()}}
          >
            Connect Wallet
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
