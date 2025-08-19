export const NEXT_PUBLIC_PROJECT_ID = "80a3f4f080a4302638eab8547c9a46cf";
export const TENDERLY_VIRTUAL_TESTNET_RPC = "";
// import PNTECH from "../../public/images/pntechicon.png";
// import USDT from "../../public/images/usdticon.png";

export const DYNAMIC_XYZ_ENVIRONMENTID = "31c182e8-0dc6-4d42-bce0-2be78381c3dc";
// export const API_URL = "http://10.11.2.58:5000/"; //local
export const API_URL = "https://stage-api.ponitech.com/"; //stage
export const CONTRACT_ADDRESS = {
  USDT_CONTRACT_ADDRESS: "0x20F1B533f7ed1F4ccb3f34d94Fc8595c9edFdA02",
  PONITECH_CONTRACT_ADDRESS: "0x2185dFdB1282a532Ede23A8F9CCC078e5CeA9dAC",
  ICO_CONTRACT_ADDRESS: "0xd4eD8402ee0d919CE1319562E2Ae8D302b80627a",
  BLOCKNUMBER: 8274955,
};
export const CONTRACT_TYPE = {
  ICO: "ico",
  PONITECH: "ponitech",
  USDT: "usdt",
  DYNAMIC: "dynamic",
};
export const NETWORK = {
  RPC: "https://ethereum-sepolia-rpc.publicnode.com",
  EXPLORER_URL: "https://sepolia.etherscan.io/tx/",
};

export const CONTRACT_METHODS = {
  DECIMALS: "decimals",
  BUYTOKEN: "buyTokens",
  CALCULATE_TOKENS: "calculateTokens",
  TOTAL_TOKEN_SOLD: "totalTokenSold",
  TOTAL_USDT_RAISED: "totalUSDTRaised",
  ICO_PHASE_START_TIME: "icoFirstPhaseStartTime",
  DEFAULT_PHASE: "defaultPhase",
  PHASE_INFO: "phaseInfo",
  REGISTER_USER: "isRegisterUser",
  REGISTERUSER_CLAIM: "registerUserClaimTokens",
  BUYERUSER_CLAIM: "buyerUserClaimToken",
  TRANSFER_OWNER_SHIP: "transferOwnership",
  OWNER: "owner",
};

export const BUY_TYPES = {
  TYPE1: "Eth",
  TYPE2: "USDT",
};

export const ETH_DECIMAL = 18;

export const TOTAL_HARDCAP = "40,000,000,000";
export const TOAL_AMOUNT = "500,000,000";

// eth =1, usdt=2
export const ethUsdtVal = ["1", "2"];

/* export const DROPDOWN_OPTIONS = [
  { value: "1", label: "ETH", icon: PNTECH.src },
  { value: "2", label: "USDT", icon: USDT.src },
]; */

export const USD_PRICE = 10 ** 8;
export const USD_DECIMAL = 8;

export const MENU_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "features", label: "Key Features" },
  { id: "whitepaper", label: "Whitepaper" },
  { id: "tokenomics", label: "Tokenomics" },
  { id: "roadmap", label: "Roadmap" },
  { id: "team", label: "Team" },
  { id: "faq", label: "FAQ" },
];

export const TOKEN_TYPE = {
  TOKEN_BOUGHT: "TokensBought",
};

export const EmailRegrx: any =
  /^[_a-zA-Z0-9-+]+(\.[_a-zA-Z0-9-+]+)*(\+[a-zA-Z0-9-]+)?@[a-zA-Z0-9-.]+(\.[a-zA-Z0-9]+)$/;
