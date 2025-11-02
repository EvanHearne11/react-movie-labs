import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchLaterIcon from "../components/cardIcons/addToWatchLater";
import { getTopRatedMovies } from "../api/tmdb-api";
import { Box } from "@mui/material";

const TopRatedMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: getTopRatedMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results ?? [];

  return (
    <Box sx={{ backgroundColor: '#202136ff', minHeight: '100vh', paddingTop: '80px' }}>
    <PageTemplate
    
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => (
  <>
    <AddToFavoritesIcon movie={movie} />
    <AddToWatchLaterIcon movie={movie} />
  </>
)}

    />
    </Box>
  );
};

export default TopRatedMoviesPage;
