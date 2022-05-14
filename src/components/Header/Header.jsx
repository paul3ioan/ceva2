import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {mainContract, stakingContract} from './../../absolutePath';
import { fetchData } from "./../../redux/data/dataActions";

import {useState} from 'react';

const Header = ({ handleConnect }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  const blockchain = useSelector(state => state.blockchain);
  const [working,setWorking] = useState(false);
  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null && blockchain.stackingContract) {
        dispatch(fetchData(blockchain.account));
    }
};
  const handleApproval = () =>{
    if(working === true) return;
    let gasLimit = 265000;
    let totalGasLimit = String(gasLimit);

    setWorking(true);
    blockchain.smartContract.methods
      .setApprovalForAll(stakingContract.CONTRACT_ADDRESS, true)
      .send({
        to: mainContract.CONTRACT_ADDRESS,
        from: blockchain.account,
      })
      .once("error", (err) => {
        console.log(err);
        setWorking(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setWorking(false);
        dispatch(fetchData(blockchain.account));
      });
    getData();
  }
  return (
    <div>
      <header className="customContainer flex justify-center flex-col md:justify-between md:flex-row items-center">
        <div className=" lg:w-30p md:w-50p">
          <Link to={"/ceva2/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        {(location.pathname === "/ceva2" || location.pathname === "/ceva2/" )&&
        <div>
          <button
            className="bg-secondary-blue text-lg font-medium py-4 px-12 rounded-md border border-secondary-blue hover:bg-transparent hover:text-secondary-blue duration-500"
            onClick={(e) =>{e.preventDefault(); handleConnect()}}
          >
            Connect Wallet
          </button>
        </div>}
          {(location.pathname === "/ceva2/stack" || location.pathname === '/ceva2/stack/') && data.walletOfOwner && data.walletOfOwner.length!== 0 && data.approved === false && <button
            className="bg-secondary-blue text-lg font-medium py-4 px-12 rounded-md border border-secondary-blue hover:bg-transparent hover:text-secondary-blue duration-500"
            onClick={(e) =>{e.preventDefault(); handleApproval()}}
          >
            Set Approval
          </button>}
      </header>
    </div>
  );
};

export default Header;
