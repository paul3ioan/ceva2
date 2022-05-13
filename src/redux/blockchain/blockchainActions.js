// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log
import {mainContract,mainContractAbi, configNetWorkID, stakingContract, stakingContractAbi} from "../../absolutePath";
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const abi = mainContractAbi;
    const CONFIG = mainContract;
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        if (networkId == configNetWorkID) {
          const SmartContractObj = new Web3EthContract(
            abi,
            CONFIG.CONTRACT_ADDRESS
          );
          const StackinContractObg = new Web3EthContract(
            stakingContractAbi,
            stakingContract.CONTRACT_ADDRESS,
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              stackingContract: StackinContractObg,
              web3: web3,
            })
          );
          
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed(`Change network to Ethereum.`));
          alert("Change network to Ethereum");
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
        alert("Something went wrong.");
      }
    } else {
     
      dispatch(connectFailed("Install Metamask."));
      alert("Install Metamask.");
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};