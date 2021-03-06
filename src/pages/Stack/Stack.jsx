import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/swiper.min.css";
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css'
import {stakingContract} from './../../absolutePath';
import { fetchData } from "./../../redux/data/dataActions";

import "./Stack.css";
import GetWidth from "../../hooks/GetWidth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Stack = () => {
  const blockchain = useSelector(state => state.blockchain);
  const navigate = useNavigate();
  const [working,setWorking] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null && blockchain.stackingContract) {
        dispatch(fetchData(blockchain.account));
    }
};
  useEffect(() =>{
    if(data.loading || blockchain.loading)
    return null;
  },[data, blockchain])
  useEffect(() =>{
    if(!blockchain.account)
    {
      navigate('ceva2/');
      return null;
    }
  },[blockchain.account])
  const stake = (item) => {
    if(!data.approved)
    {
      alert("You need to be approved before making a stacking!");
      return;
    }
    let gasLimit = 265000;
    let totalGasLimit = String(gasLimit);

    setWorking(true);
    blockchain.stackingContract.methods
      .stake([item])
      .send({
        // gasLimit: totalGasLimit,
        to: stakingContract.CONTRACT_ADDRESS,
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
  };
  const unstake = (item) => {
    let gasLimit = 266000;
    let totalGasLimit = String(gasLimit);

    setWorking(true);
    blockchain.stackingContract.methods
      .unstake([item])
      .send({
        // gasLimit: totalGasLimit,
        to: stakingContract.CONTRACT_ADDRESS,
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
  };

  const { width } = GetWidth();
  return (
    <div className="lg:h-screen h-full" style={{minHeight: "100vh"}}>
      <section className="customContainer py-20 pb-0">
        <div style={{alignItems:"center", justifyContent:"space-between"}}className= "py-2 flex justify-between align-middle w-full xol">
        <Link to ="/ceva2/">
        <button style={{paddingTop: "10px", paddingBottom: "10px"}} className="bg-twitter sm:mr-4 mb-6 sm:mb-0 text-white px-10  font-medium  rounded-md border border-twitter hover:bg-transparent hover:text-twitter duration-500"
          >
            Back
          </button>
          </Link>
          <p className="font-semibold px-10  text-black text-center flex">
          Your Metamask wallet Address Connected with: {blockchain.account}
        </p>
        </div>
        {/* Slider Container */}
        <div>
          <Swiper
            slidesPerView={
              width > 1024 ? 4 : width > 768 ? 3 : width > 576 ? 2 : 1
            }
            spaceBetween={30}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {data?.walletOfOwner && data?.walletOfOwner.length !== 0 && data.walletOfOwner.map((item) => (
              <SwiperSlide key={item}>
                <div className="p-4 bg-white shadow-2xl rounded-md ">
                  <img
                    src={`images/${item}.png`}
                    alt="slide"
                    className="rounded-md"
                  />
                  TOKEN ID: {item}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button className="bg-twitter py-2 rounded-md font-medium w-full text-xl cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      {
                        working === false ? stake(item) : "";
                      }
                    }}
                      >
                      Stack
                    </button>
                    <button disabled={true} className="bg-gray-800 py-2 w-full rounded-md font-medium text-xl"
                    style={{"background": "gray"}}
                    onClick={(e) => {
                      e.preventDefault();
                      {
                        working === false ? unstake(item) : "";
                      }
                    }}>
                  
                      Unstack
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
             {data?.stakedNfts && data?.stakedNfts.length!== 0 && data.stakedNfts.map((item) => (
              <SwiperSlide key={item}>
                <div className="p-4 bg-white shadow-2xl rounded-md ">
                  <img
                    src={`images/${item}.png`}
                    alt="slide"
                    className="rounded-md"
                  />
                  {item}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button disabled={true}  className="bg-twitter py-2 rounded-md font-medium w-full text-xl cursor-pointer"
                    style={{"background": "gray"}}
                    onClick={(e) => {
                      e.preventDefault();
                      {
                        working === false ? stake(item) : "";
                      }
                    }}
                      >
                      Stack
                    </button>
                    <button className="bg-red-600 py-2 w-full rounded-md font-medium text-xl"
                    
                    onClick={(e) => {
                      e.preventDefault();
                      {
                        working === false ? unstake(item) : "";
                      }
                    }}>
                  
                      Unstack
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 py-20">
          <div className="w-full bg-primary rounded-md shadow-2xl p-6">
            <h2 className="text-3xl font-bold">Total Stacked</h2>
            <p className="text-4xl font-semibold py-4">{data.walletOfOwner?.length === 0 ? "0" : parseInt(parseInt(data.stakingAmount) / data.walletOfOwner?.length * 100)}%</p>
            <div class="w-ful rounded-full h-3 shadow-2xl bg-white">
              <div
                class="bg-black h-3 rounded-full"
                style={{
                  width: `${data.stakingAmount === 0 ? "0" : 100* parseInt(data.stakingAmount) / data.walletOfOwner?.length + data.stakingAmount}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="w-full bg-primary rounded-md shadow-2xl p-6">
            <h2 className="text-3xl font-bold">My Stacked</h2>
            <p className="text-4xl font-semibold py-4">{data.stakingAmount}</p>
            <div class="w-full h-3"></div>
          </div>
          <div className="w-full bg-primary rounded-md shadow-2xl p-6">
            <h2 className="text-3xl font-bold">$Reward Token</h2>
            <p className="text-4xl font-semibold py-4">{data?.pendingReward && data.pendingReward?.length < 18 ? "0" : data.pendingReward.substring(0, data.pendingReward.length - 18)}</p>
            <div class="w-full h-3"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stack;
