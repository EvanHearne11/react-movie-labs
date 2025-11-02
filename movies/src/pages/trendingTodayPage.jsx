import React from "react";
import { getMovies, getTrendingToday } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToWatchLaterIcon from '../components/cardIcons/addToWatchLater';
import { Box } from "@mui/material";

const TrendingTodayPage = () => {
const [page ,setPage] = React.useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["Trending","Today"],
    queryFn: getTrendingToday,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))


  return (
    <Box sx={{ backgroundColor: '#202136ff', minHeight: '100vh', paddingTop: '80px' }}>
    <PageTemplate
      title="Trending Today"
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

export default TrendingTodayPage;