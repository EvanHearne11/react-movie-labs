import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToWatchLaterIcon from '../components/cardIcons/addToWatchLater';
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const HomePage = () => {
  const [page, setPage] = React.useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover', page],
    queryFn:() => getMovies(page),
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
  const totalPages = data?.total_pages ?? 1;
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true

  return (
    <Box sx={{ backgroundColor: '#202136ff', minHeight: '100vh', paddingTop: '80px' }}>
    <PageTemplate
      title={`Discover Movies (Page ${page})`}
      movies={movies}
      action={(movie) => (
  <>
    <AddToFavoritesIcon movie={movie} />
    <AddToWatchLaterIcon movie={movie} />
  </>
)}

    />
    
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2e3440",
            color: "#fff",
            "&:hover": { backgroundColor: "#3b4252" },
          }}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2e3440",
            color: "#fff",
            "&:hover": { backgroundColor: "#3b4252" },
          }}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </Stack>
    </Box>
    
  );

};

export default HomePage;
