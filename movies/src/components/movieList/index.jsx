import React from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";

const MovieList = (props) => {
  const movieCards = props.movies.map((movie) => (
    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
      <Movie movie={movie} action={props.action} />
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      {movieCards}
    </Grid>
  );
};

export default MovieList;
