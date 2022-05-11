import React from "react";
import Slider from "../../components/HomeComponents/Slider";
import img0 from "../../assets/images/0.png";

import WelcomeText from "../../components/HomeComponents/WelcomeText";

const Home = ({ handleConnect }) => {
  return (
    <section className="overflow-hidden pb-20">
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
        {/* Second Section */}
        <div className="customContainer h-full flex justify-center items-center flex-col">
          <div className="grid gap-6">
            <div className="md:w-3/4 lg:order-1 order-2 w-full m-auto bg-white shadow-2xl rounded-md p-4 text-center flex justify-center items-center">
              <div>
                <img src={img0} alt="" className="rounded-md" />
                <h2 className="text-4xl font-medium py-4">Card Name</h2>
                <p className="text-sm font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Vitae tempora doloribus, perspiciatis ab nam deleniti. Quaerat
                  rerum ex nostrum voluptate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
