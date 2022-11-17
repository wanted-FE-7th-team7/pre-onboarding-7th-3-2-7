import axios from "axios";
import Cookies from "js-cookie";

export const getFullUsers = async () => {
  const url = `/api/users`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("에러발생", error);
  }
};

//TODO: 이거 왜 이래요?
export const getUserDetail = async (userId: string | string[] | undefined) => {
  const url = `/api/users/${userId}`;
  try {
    const res = await axios.get(url, {
      headers: { authorization: `Bearer ${Cookies.get("accessToken")}` },
    });
    return res.data;
  } catch (error) {
    console.error("에러발생", error);
  }
};
