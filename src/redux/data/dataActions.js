// log
import store from "../store";
import {stakingContract} from "../../absolutePath"

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    
    try {
        let walletOfOwner = await store
        .getState()
        .blockchain.smartContract.methods.walletOfOwner(account).call();
        let contractBalance = await store
        .getState()
        .blockchain.stackingContract.methods.contractBalance().call();
        let pendingReward = await store
        .getState()
        .blockchain.stackingContract.methods.pendingTotalReward(account).call();
        let approved = await store.getState().blockchain.smartContract.methods.isApprovedForAll(account, stakingContract.CONTRACT_ADDRESS).call();
        let stakedNfts = await store
        .getState()
        .blockchain.stackingContract.methods.nftsStakedByUser(account).call();
        let stakingAmount =stakedNfts.length;
      dispatch(
        fetchDataSuccess({
          walletOfOwner,
          pendingReward,
          stakedNfts,
          approved,
          contractBalance,
          stakingAmount,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};