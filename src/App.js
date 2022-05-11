import { Route, Routes, useNavigate } from "react-router-dom";
import React, {useEffect} from 'react';
import "./App.css";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import Home from "./pages/Home/Home";
import Stack from "./pages/Stack/Stack";
import { data } from "autoprefixer";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const blockchain = useSelector((state) => state.blockchain);
  const getData = () => {
      if (blockchain.account !== "" && blockchain.smartContract !== null && blockchain.stackingContract) {
          dispatch(fetchData(blockchain.account));
      }
  };
  useEffect(() => { 
      if(blockchain.account)
      {
        getData();
      }     
  }, [blockchain.account]);
  useEffect(() =>{
    if(!data.loading && data.walletOfOwner !== null)
    {
      navigate('/ceva2/stack')
    }

  },[data])
  const handleConnect = () => {
    dispatch(connect());
  };
  
  return (
    <main className="linearBg">
      <Header handleConnect={handleConnect} />
      <Routes>
        <Route path="/ceva2" element={<Home handleConnect={handleConnect} />} />
        <Route path="/ceva2/stack" element={<Stack />} />
      </Routes>
    </main>
  );
}

export default App;
