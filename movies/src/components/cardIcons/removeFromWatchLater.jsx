import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { WatchLaterContext } from "../../contexts/watchLaterContext";

const RemoveFromWatchLaterIcon = ({ movie }) => {
  const context = useContext(WatchLaterContext);

  const handleRemove = (e) => {
    e.preventDefault();
    context.removeFromWatchLater(movie);
  };

  return (
    <IconButton
      aria-label="remove from watch later"
      onClick={handleRemove}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWatchLaterIcon;
