import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";

export default function UsersList() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => {
    return state.users; // { data: [], isLoading, error }
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  return <div>{data.length}</div>;
}
