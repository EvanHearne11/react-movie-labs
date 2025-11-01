import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPersonDetails, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
} from "@mui/material";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch actor info
  const { data: person, error, isLoading, isError } = useQuery({
    queryKey: ["personDetails", { id }],
    queryFn: getPersonDetails,
  });

  // Fetch their movies
  const {
    data: credits,
    error: creditsError,
    isLoading: creditsLoading,
  } = useQuery({
    queryKey: ["personCredits", { id }],
    queryFn: getPersonMovieCredits,
  });

  if (isLoading || creditsLoading) return <Spinner />;
  if (isError || creditsError)
    return <h2>Error: {error?.message || creditsError?.message}</h2>;

  const movies = credits?.cast?.slice(0, 12); // top 12 movies

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back
      </Button>

      <Grid container spacing={3}>
        {/* Actor Image */}
        <Grid item xs={12} sm={4} md={3}>
          <Card>
            <CardMedia
              component="img"
              image={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  : "https://via.placeholder.com/400x600?text=No+Image"
              }
              alt={person.name}
            />
          </Card>
        </Grid>

        {/* Actor Info */}
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h4" gutterBottom>
            {person.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {person.known_for_department} | Born: {person.birthday}
            {person.place_of_birth ? ` in ${person.place_of_birth}` : ""}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {person.biography || "No biography available."}
          </Typography>
        </Grid>
      </Grid>

      {/* Actor's Movies */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Movies
        </Typography>
        <Grid container spacing={2}>
          {movies?.map((movie) => (
            <Grid item xs={6} sm={4} md={3} key={movie.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.05)" },
                  transition: "0.3s",
                }}
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="subtitle2" component="p">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.character ? `as ${movie.character}` : ""}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ActorDetailsPage;
