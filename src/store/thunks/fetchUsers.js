import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk('users/fetch', async() => {
  const response = await axios.get("http://localhost:3005/users")
  return response.data
})

// DEV ONLY!!!
const pause = (duration) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration)
    })
}