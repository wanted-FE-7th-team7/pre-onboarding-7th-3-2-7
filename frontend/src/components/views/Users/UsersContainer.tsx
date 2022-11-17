import Layout from "components/common/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "../UsersCRUD/models/User";
import { getUserDetail } from "../UsersCRUD/services/users.service";

function UsersContainer() {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const user = await getUserDetail(pid);
      setUser(user);
      setIsLoading(false);
    };
    if (pid) {
      fetchData();
    }
  }, [pid]);

  if (isLoading) {
    return (
      <>
        <div>
          <h1>사용자 정보</h1>
          <h1> Loading... </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h1>사용자 정보</h1>
        <table>
          <thead />
          <tbody>
            {user && (
              <>
                <tr className="border">
                  <th className="p-2 border" />
                  <td className="p-2 bg-white border">{user.name}</td>
                  <th className="p-2 border">12</th>
                  <td className="p-2 bg-white border">{user.email}</td>
                  <th className="p-2 border">13</th>
                  <td className="p-2 bg-white border">{user.age}</td>
                </tr>
                <tr className="border">
                  <th className="p-2 border">11</th>
                  <td className="p-2 bg-white border">{user.gender_origin}</td>
                  <th className="p-2 border">12</th>
                  <td className="p-2 bg-white border">{user.birth_date}</td>
                  <th className="p-2 border">13</th>
                  <td className="p-2 bg-white border">{user.phone_number}</td>
                </tr>
                <tr className="border">
                  <th className="p-2 border">11</th>
                  <td className="p-2 bg-white border">{user.address}</td>
                  <th className="p-2 border">12</th>
                  <td className="p-2 bg-white border">{user.detail_address}</td>
                  <th className="p-2 border">13</th>
                  <td className="p-2 bg-white border">{user.last_login}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UsersContainer;
