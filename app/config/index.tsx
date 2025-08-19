// config/index.tsx

import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { arbitrum, sepolia } from "@reown/appkit/networks";
import { cookieStorage, createStorage } from "wagmi";

// Get projectId from https://cloud.reown.com
export const projectId = "42a6993308d8b654fcc594c51bf22435"; //"80a3f4f080a4302638eab8547c9a46cf";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [sepolia, arbitrum];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
