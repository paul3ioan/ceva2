const initialState = {
    loading: false,
    walletOfOwner: null,
    pendingReward: null,
    contractBalance: null,
    stakingAmount: null,
    stakedNfts: null,
    approved: false,
    error: false,
    errorMsg: "",
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHECK_DATA_REQUEST":
        return {
          ...state,
          loading: true,
          error: false,
          errorMsg: "",
        };
      case "CHECK_DATA_SUCCESS":
        return {
          ...state,
          loading: false,
          walletOfOwner:action.payload.walletOfOwner,
          pendingReward: action.payload.pendingReward,
          contractBalance: action.payload.contractBalance,
          stakingAmount: action.payload.stakingAmount,
          approved: action.payload.approved,
          stakedNfts: action.payload.stakedNfts,
          error: false,
          errorMsg: "",
        };
      case "CHECK_DATA_FAILED":
        return {
          ...initialState,
          loading: false,
          error: true,
          errorMsg: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default dataReducer;