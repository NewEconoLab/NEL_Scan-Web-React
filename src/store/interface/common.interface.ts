

export interface ICommonStore {
  language: string,
  network: string,
  socketInit: () => Promise<boolean>,
}

export interface ITransaction {
  txid: string,
  type: string,
  net_fee: string,
  sys_fee: string,
  gas: string,
  size: number,
  blockindex: number,
  blocktime: number,
  version: number,
  sender: string,
  vinout: IVinOut[],
  vout: IVinOut[],
}
export interface IVin {
  txid: string;
  vout: number;
}
export interface IOut {
  address: string;
  asset: string;
  n: number;
  value: string;
}
export interface IVinOut {
  address: string;
  assetJA: string;
}