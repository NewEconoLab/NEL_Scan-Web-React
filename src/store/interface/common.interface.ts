

export interface ICommonStore {
  language: string,
  network: string,
}

export interface ITransaction {
  txid: string,
  type: string,
  net_fee: string,
  sys_fee:string,
  gas: string,
  size: number,
  blockindex: number,
  version: number,
  vin: IVin[],
  vout: IOut[],
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