import axios from "axios";

import { ACCOUNT_STATUS } from "./accountStatus";
import { BROKER_INFO } from "./brokerInfo";

type BrokerId = keyof typeof BROKER_INFO;
interface Accounts {
  assets: string;
  broker_id: BrokerId;
  created_at: string;
  id: number;
  is_active: boolean;
  name: string;
  number: string;
  payments: string;
  status: number;
  updated_at: string;
  user_id: number;
  uuid: string;
}

export const getAccountStatusName = (status: number) => {
  switch (status) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 9999:
      return ACCOUNT_STATUS[status];
    default:
      throw new Error(`해당 계좌 상태(${status})는 존재하지 않습니다.`);
  }
};

export const getEncryptedNumber = (accountNumber: string) =>
  accountNumber
    .split("")
    .reduce(
      (prev, cur, idx) =>
        idx === 0 || idx === accountNumber.length - 1
          ? (prev += cur)
          : (prev += "*"),
      ""
    );

export const getBrokerName = (brokerId: BrokerId) => BROKER_INFO[brokerId];
export const getUserName = (accountId: number) => accountId;
export const seperateNumber = (number: string) =>
  Number(number).toLocaleString();
