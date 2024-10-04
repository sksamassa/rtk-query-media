import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

export default function UsersList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.users; // { data: [], isLoading, error }
  });

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .then(() => {
        setIsLoadingUsers(false);
      })
      .catch((err) => {
        setLoadingUsersError(err);
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  }, []);

  const handleUserAdd = () => {
    dispatch(addUser());
  };

  if (isLoadingUsers) {
    return (
      <div className="p-4">
        <Skeleton times={2} className="p-4 h-10 w-full" />
      </div>
    );
  }

  if (loadingUsersError) {
    return <div>Error fetching data...</div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div key={data.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-center items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex justify-between m-3">
        <h1 className="text-xl m-2">Users</h1>
        <Button primary rounded onClick={handleUserAdd}>
          + Add User
        </Button>
      </div>
      {renderedUsers}
    </div>
  );
}
