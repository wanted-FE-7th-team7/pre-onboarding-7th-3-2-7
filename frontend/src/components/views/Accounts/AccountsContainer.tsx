import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getAccountStatusName } from "./Accounts.utils";
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

/*

- 고객명(user_name) : 고객ID 를 참조하여 실제 이름으로 보여져야 합니다.
    - 고객명을 누를 경우 사용자 상세화면으로 이동합니다.

*/

const getItems = (page: number = 0) => {
  return axios.get<Accounts[]>("/api/accounts", { params: { page } });
};

const getEncryptedNumber = (accountNumber: string) =>
  accountNumber
    .split("")
    .reduce(
      (prev, cur, idx) =>
        idx === 0 || idx === accountNumber.length - 1
          ? (prev += cur)
          : (prev += "*"),
      ""
    );

const getBrokerName = (brokerId: BrokerId) => BROKER_INFO[brokerId];
const getUserName = (accountId: number) => accountId;
const seperateNumber = (number: string) => Number(number).toLocaleString();

function AccountsContainer() {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery(["accounts"], () =>
    getItems(page)
  );
  const accounts = data?.data;
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [page]);

  const decreasePage = () => setPage((page) => (page > 1 ? page - 1 : page));
  const increasePage = () =>
    setPage((page) => (accounts?.length !== 0 ? page + 1 : page));

  const moveUserPage = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  } else {
    if (accounts) {
      return (
        <div>
          <div className="flex gap-3">
            <button className="text-3xl" onClick={decreasePage}>
              {"<"}
            </button>
            <span className="w-5 text-3xl">{page}</span>
            <button className="text-3xl" onClick={increasePage}>
              {">"}
            </button>
          </div>

          <div className="flex">
            <div className="w-40 p-3 overflow-hidden font-bold text-center bg-slate-500">
              고객명
            </div>
            <div className="w-40 p-3 overflow-hidden font-bold text-center bg-slate-500">
              브로커명
            </div>
            <div className="w-40 p-3 overflow-hidden font-bold text-center bg-slate-500">
              계좌번호
            </div>
            <div className="w-40 p-3 overflow-hidden font-bold text-center bg-slate-500">
              계좌상태
            </div>
            <div className="w-40 p-3 overflow-hidden font-bold text-center bg-slate-500">
              계좌명
            </div>
            <div className="w-40 p-3 overflow-hidden font-bold text-center bg-slate-500">
              평가금액
            </div>
            <div className="w-40 p-3 overflow-hidden font-bold text-center bg-slate-500">
              입금금액
            </div>
            <div className="w-40 p-3 overflow-hidden font-bold text-center bg-slate-500">
              계좌활성화여부
            </div>
            <div className="w-40 p-3 overflow-hidden font-bold text-center bg-slate-500">
              계좌개설일
            </div>
          </div>

          {accounts.length !== 0 ? (
            accounts.map((account) => (
              <div key={account.uuid} className="flex">
                <button
                  className="w-40 h-20 p-0 m-0 overflow-hidden text-center bg-slate-400"
                  onClick={() => moveUserPage(account.user_id)}
                >
                  {getUserName(account.user_id)}
                </button>
                <div className="w-40 h-20 overflow-hidden text-center bg-slate-400">
                  {getBrokerName(account.broker_id)}
                </div>
                <div className="w-40 h-20 overflow-hidden text-center bg-slate-400">
                  {getEncryptedNumber(account.number)}
                </div>
                <div className="w-40 h-20 overflow-hidden text-center bg-slate-400">
                  {getAccountStatusName(account.status)}
                </div>
                <div className="w-40 h-20 overflow-hidden text-center bg-slate-400">
                  {account.name}
                </div>
                <div className="w-40 h-20 overflow-hidden text-center bg-slate-400">
                  {seperateNumber(account.assets)}
                </div>
                <div className="w-40 h-20 overflow-hidden text-center bg-slate-400">
                  {seperateNumber(account.payments)}
                </div>
                <div className="w-40 h-20 overflow-hidden text-center bg-slate-400">
                  {account.is_active ? "활성" : "비활성"}
                </div>
                <div className="w-40 h-20 overflow-hidden text-center bg-slate-400">
                  {account.created_at.slice(0, 10)}
                </div>
              </div>
            ))
          ) : (
            <div>데이터가 없습니다.</div>
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default AccountsContainer;
