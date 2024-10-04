import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import UserListItem from "./UserListItem";
import { useThunk } from "../hooks/use-thunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
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

  let content;
  if (isLoadingUsers) {
    return (
      <div className="p-4">
        content = <Skeleton times={2} className="p-4 h-10 w-full" />
      </div>
    );
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return (
        <div key={data.id} className="mb-2 border rounded">
          <UserListItem user={user} />
        </div>
      );
    });
  }

  return (
    <div>
      <div className="flex justify-between m-3">
        <h1 className="text-xl m-2">Users</h1>

        <Button
          loading={isCreatingUser}
          primary
          rounded
          onClick={handleUserAdd}
        >
          + Add User
        </Button>

        {/* {creatingUserError && <div>Error creating user!</div>} */}
      </div>
      {content}
    </div>
  );
}
