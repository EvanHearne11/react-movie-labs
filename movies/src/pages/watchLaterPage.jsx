import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { WatchLaterContext } from "../contexts/watchLaterContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromWatchLater from "../components/cardIcons/removeFromWatchLater";

const WatchLaterMoviesPage = () => {
  const { watchLater: movieIds } = useContext(WatchLaterContext);

  const watchLaterQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    })),
  });

  const isPending = watchLaterQueries.find((q) => q.isPending === true);
  if (isPending) return <Spinner />;

  const movies = watchLaterQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Watch Later"
      movies={movies}
      action={(movie) => <RemoveFromWatchLater movie={movie} />}
    />
  );
};

export default WatchLaterMoviesPage;
