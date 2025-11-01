import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { WatchLaterContext } from "../../contexts/watchLaterContext";

const AddToWatchLaterIcon = ({ movie }) => {
  const context = useContext(WatchLaterContext);

  const handleAdd = (e) => {
    e.preventDefault();
    context.addToWatchLater(movie);
  };

  return (
    <IconButton aria-label="add to watch later" onClick={handleAdd}>
      <WatchLaterIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchLaterIcon;
