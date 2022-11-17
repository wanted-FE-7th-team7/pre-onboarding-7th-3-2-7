import { faker } from "@faker-js/faker";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useFullUsersState } from "stores/fullUsers.recoil";
import { User } from "../models/User";
import { getFullUsers } from "../services/users.service";

function useUserCRUD() {
  const [fullUsers, setFullUsers] = useFullUsersState();
  const lastUserId = useRef<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFullUsers();
      setFullUsers(data);
      lastUserId.current = data.length;
    };
    fetchData();
  }, []);

  const createUser = (size: number) => {
    const uuid = faker.datatype.uuid();
    const newUser: User = {
      id: size + 1,
      uuid,
      name: faker.name.fullName(),
      photo: faker.internet.avatar(),
      email: faker.internet.email(),
      age: faker.datatype.number({ min: 20, max: 66 }),
      gender_origin: faker.datatype.number({ min: 1, max: 4 }),
      birth_date: faker.date
        .birthdate({ min: 20, max: 65, mode: "age" })
        .toString(),
      phone_number: faker.phone.number("010-####-####"),
      address: `${faker.address.country()} ${faker.address.city()}`,
      detail_address: faker.address.streetAddress(true),
      last_login: faker.date.between("2022-01-01", "2022-08-01").toString(),
      created_at: faker.date.between("2019-04-01", "2022-08-01").toString(),
      updated_at: faker.date.between("2019-04-01", "2022-08-01").toString(),
    };
    setFullUsers((prev) => [...prev, newUser]);
    if (lastUserId.current !== undefined) {
      lastUserId.current += 1;
    }
  };

  const updateUserName = ({
    userId,
    userName,
  }: {
    userId: string;
    userName: string;
  }) => {
    const newUsers = fullUsers.map((user) => {
      if (user.id === parseInt(userId)) {
        return { ...user, name: userName };
      }
      return user;
    });
    setFullUsers(newUsers);
  };

  const deleteUser = (userId: string) => {
    const newUsers = fullUsers.filter((user) => {
      if (user.id !== parseInt(userId)) {
        return true;
      }
      return false;
    });
    setFullUsers(newUsers);
  };

  return {
    lastUserId: lastUserId.current,
    createUser,
    updateUserName,
    deleteUser,
    fullUsers,
  };
}

export default useUserCRUD;
