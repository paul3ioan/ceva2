import React, { useState } from "react";

const Slider = () => {
  const carousels = [
    "-2400",
    "-2000",
    "-1600",
    "-1200",
    "-800",
    "-400",
    "0",
    "400",
    "800",
    "1200",
  ];

  const [carouselCards, setCarouselCards] = useState(carousels);

  const changeCarousel = (index) => {
    const poppedItem = carouselCards.pop();
    const updatedCarousel = [poppedItem, ...carouselCards];
    setCarouselCards(updatedCarousel);
  };
  return (
    <div>
      <div className="HomeCarousel">
        <div
          style={{
            height: "500px",
            width: "1040px",
          }}
          className="relative"
        >
          {/* Arrow section Starts */}
          <div
            className=" arrow absolute w-auto z-10"
            style={{
              top: "190px",
            }}
          >
            <div
              className="arrow-rapper"
              onClick={() => {
                changeCarousel(0);
              }}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="chevron-right"
                class="w-6 h-6"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"
                ></path>
              </svg>
            </div>
          </div>
          {carouselCards.map((card, index) => {
            return (
              <div
                key={index}
                className="CarouselCard"
                style={{
                  transform: `translate(${card}px , 0px) ${
                    card === "800" ? "scale(1)" : "scale(0.7)"
                  }`,
                  zIndex: "2",
                  opacity: `${card === "800" ? "1" : "0.1"}`,
                  cursor: "default",
                }}
              >
                <div className="image-wrapper">
                  <img
                    className="w-full h-full rounded-md"
                    src={`images/${index}.png`}
                    alt=""
                  />
                  <div className="lg:py-4 text-white">
                    <h2 className=" font-medium text-2xl">Card Name</h2>
                    <p className="text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing
                      elit....
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
