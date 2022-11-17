//pages/users/form

import { ChangeEvent, useState } from "react";
import useUserCRUD from "./hooks/useUserCRUD";

function UsersCRUDContainer() {
  const { lastUserId, createUser, updateUserName, deleteUser, fullUsers } =
    useUserCRUD();
  const [updateUser, setUpdateUser] = useState({ userId: "", userName: "" });
  const [deleteUserId, setDeleteUserId] = useState("");

  const changeUpdateUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateUser({ ...updateUser, [name]: value });
  };

  return (
    <>
      <h1>CRUD</h1>
      <div className="flex gap-10">
        <button
          className="bg-blue-500 border "
          onClick={() => createUser(lastUserId)}
          type="button"
        >
          CREATE
        </button>

        <form
          className="flex"
          onSubmit={(e) => {
            e.preventDefault();
            updateUserName(updateUser);
          }}
        >
          <input
            type="text"
            value={updateUser.userId}
            onChange={changeUpdateUser}
            name="userId"
            placeholder="update userId"
          />
          <input
            type="text"
            value={updateUser.userName}
            onChange={changeUpdateUser}
            name="userName"
            placeholder="update userName"
          />
          <input type="submit" className="bg-blue-500 border " value="UPDATE" />
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            deleteUser(deleteUserId);
          }}
        >
          <input
            type="text"
            value={deleteUserId}
            placeholder="delete userId"
            onChange={(e) => setDeleteUserId(e.target.value)}
          />
          <button className="bg-blue-500 border ">DELETE</button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        {fullUsers.map((user) => (
          <div key={user.id} className="flex gap-4">
            <div>{user.id}</div>
            <div>{user.name}</div>
            <div>{user.age}</div>
            <div>{user.address}</div>
            <div>{user.birth_date}</div>
            <div>{user.created_at}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UsersCRUDContainer;
