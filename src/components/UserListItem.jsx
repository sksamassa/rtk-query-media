import React from "react";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import { useThunk } from "../hooks/use-thunk";

export default function UserListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleDelete = () => {
    doRemoveUser(user);
  };

  return (
    <div className="flex p-2 justify-between items-center cursor-pointer">
      <Button rounded className="bg-red-600 text-white" loading={isLoading} onClick={handleDelete}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user.</div>}
      {user.name}
    </div>
  );
}
