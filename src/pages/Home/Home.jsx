import React from "react";
import Slider from "../../components/HomeComponents/Slider";
import img0 from "../../assets/images/0.png";

import WelcomeText from "../../components/HomeComponents/WelcomeText";

const Home = ({ handleConnect }) => {
  return (
    <section className="overflow-hidden" style={{height:"100vh",}}>
      <div className="">
        <div className="container py-4 md:py-20">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            style={{
              height: "100%",
            }}
          >
            <div className="col-span-1 z-50 ">
              <WelcomeText />
            </div>
            <div className="col-span-1 ">
              <Slider />
            </div>
          </div>
        </div>
      
      </div>
    </section>
  );
};

export default Home;
