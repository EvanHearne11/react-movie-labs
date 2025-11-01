import React, { useState, createContext } from "react";

export const WatchLaterContext = createContext(null);

const WatchLaterContextProvider = (props) => {
  const [watchLater, setWatchLater] = useState([]);

  const addToWatchLater = (movie) => {
    let newWatchLater = [];
    if (!watchLater.includes(movie.id)) {
      newWatchLater = [...watchLater, movie.id];
    } else {
      newWatchLater = [...watchLater];
    }
    setWatchLater(newWatchLater);
  };

  const removeFromWatchLater = (movie) => {
    setWatchLater(watchLater.filter((mId) => mId !== movie.id));
  };

  return (
    <WatchLaterContext.Provider
      value={{
        watchLater,
        addToWatchLater,
        removeFromWatchLater,
      }}
    >
      {props.children}
    </WatchLaterContext.Provider>
  );
};

export default WatchLaterContextProvider;
