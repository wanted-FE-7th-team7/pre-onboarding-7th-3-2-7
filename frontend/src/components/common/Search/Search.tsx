import React from "react";
import axios from "axios";

import useInput from "./useInput";
import Cookies from "js-cookie";

interface Props {
  searchText: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: React.FormEventHandler<HTMLFormElement>;
}

export default function Search({ searchText, handleSearch, onSearch }: Props) {
  return (
    <form onSubmit={onSearch}>
      <input
        className="w-full py-2 pl-10 text-sm leading-6 rounded-md shadow-sm appearance-none text-slate-900 placeholder-slate-400 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="검색어를 입력하세요"
      />
    </form>
  );
}
