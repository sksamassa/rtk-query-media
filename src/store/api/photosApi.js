import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints: (builder) => {
    return {
      fetchPhotos: builder.query({}),
      addPhoto: builder.mutation({}),
      deletePhoto: builder.mutation({}),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = photosApi;
