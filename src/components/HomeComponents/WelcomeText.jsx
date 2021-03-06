const WelcomeText = () => {
  return (
    <>
      <div className="px-3 py-8 uppercase text-black text-center">
        <h2 className="text-5xl font-bold py-6">
          Welcome to Shiba puppy Metaverse Staking App
        </h2>
        <p className="text-secondary-yellow font-semibold">
          SHIBA PUPPY CLUB is a collection of 3344 UNIQUE NFT's items that are
          directly connected to the Metaverse and the cryptocurrency world
        </p>
        <p className="pt-8 font-semibold">
          We are hosted on the Ethereum blockchain
        </p>
        <div className="pt-8 flex flex-col sm:flex-row justify-center">
          
        <button style={{background:"#2DE370"}} className="sm:mr-4 mb-6 sm:mb-0 text-black px-10 font-medium py-4 rounded-md hover:bg-transparent hover:text-twitter duration-500"
          onClick={() => window.open("https://metararity.com/collection/shiba_puppy_metaverse", "_blank")}>
            MetaRarity
          </button>
          <button style={{background:"#1868B7"}} className="sm:mr-4 mb-6 sm:mb-0 text-white px-10 font-medium py-4 rounded-md border border-twitter hover:bg-transparent hover:text-twitter duration-500"
          onClick={() => window.open("https://opensea.io/collection/shibapuppymetaverseofficial", "_blank")}>
            Opensea
          </button>
          <button className="bg-twitter sm:mr-4 mb-6 sm:mb-0 text-white px-10 font-medium py-4 rounded-md border border-twitter hover:bg-transparent hover:text-twitter duration-500"
          onClick={() => window.open("https://twitter.com/Shiba_Puppy_NFT", "_blank")}>
            Follow Twitter
          </button>
          <button className="bg-discord text-white px-10 font-medium py-4 rounded-md border border-discord hover:bg-transparent hover:text-discord duration-500"
          onClick={() => window.open("https://discord.com/invite/shibapuppyclub", "_blank")}>
            Join Discord
          </button>
        </div>
      </div>
    </>
  );
};

export default WelcomeText;
