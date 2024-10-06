import React from "react";
import { useRemovePhotoMutation } from "../store";
import { GoTrashcan } from "react-icons/go";

export default function PhotosListItem({ photo }) {
  const [removePhoto, removePhotoResults] = useRemovePhotoMutation();

  const handleRemoveAlbum = () => {
    removePhoto(photo)
  }
  return (
    <div className="relative m-2">
      <img className="h-20 w-20" src={photo.url} alt="random photo" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-70 cursor-pointer">
        <GoTrashcan onClick={handleRemoveAlbum} className="text-3xl" />
      </div>
    </div>
  );
}
