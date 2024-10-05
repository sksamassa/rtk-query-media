import React from "react";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

export default function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;

  if (isLoading) {
    content = <Skeleton className="h-8 w-full" times={3} />;
  } else if (error) {
    content = <div>Error fetching albums.</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;

      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos in the album
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={results.isLoading} primary rounded onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}
