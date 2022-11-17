import { ACCOUNT_STATUS } from "./accountStatus";

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
