import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}

export default function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(
    fetchUsers
  );
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  const { data } = useSelector((state) => {
    return state.users; // { data: [], isLoading, error }
  });

  useEffect(() => {
    doFetchUsers();
  }, []);

  const handleUserAdd = () => {
    doCreateUser();
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
        {isCreatingUser ? (
          <div>Creating User...</div>
        ) : (
          <Button primary rounded onClick={handleUserAdd}>
            + Add User
          </Button>
        )}
        {creatingUserError && <div>Error creating user!</div>}
      </div>
      {renderedUsers}
    </div>
  );
}
