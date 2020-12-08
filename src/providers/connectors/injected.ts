const ConnectToInjected = async () => {
  let provider = null;
  // Typed window object breaks compilation in junction with other libs
  let anyWindow = window as any;

  if (typeof anyWindow.ethereum !== 'undefined') {
    provider = anyWindow.ethereum;
    try {
      if (typeof provider.request !== 'undefined') {
        await provider.request({method: 'eth_requestAccounts'})
      } else {
        await provider.enable()
      }
    } catch (error) {
      throw new Error('User Rejected');
    }
  } else if (anyWindow.web3) {
    provider = anyWindow.web3.currentProvider;
  } else {
    throw new Error('No Web3 Provider found');
  }
  return provider;
};

export default ConnectToInjected;
