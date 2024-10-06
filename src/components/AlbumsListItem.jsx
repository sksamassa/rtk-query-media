import React from "react";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";


export default function AlbumsListItem({ album }) {
  const [removeAlbum, results] =  useRemoveAlbumMutation()

  const handleRemoveAlbum = () => {
    removeAlbum(album)
  }

  const header = <div className="flex gap-x-2">
  <Button loading={results.isLoading} onClick={handleRemoveAlbum} primary rounded className="bg-red-700 text-white"><GoTrashcan /></Button>
    {album.title}
  </div>;

  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
}
