import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import MoviesContextProvider from "./contexts/moviesContext";
import WatchLaterContextProvider from "./contexts/watchLaterContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import TrendingTodayPage from "./pages/trendingTodayPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import WatchLaterPage from "./pages/watchLaterPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
        <WatchLaterContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path ="/movies/watchLater" element= {<WatchLaterPage/>} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path= "/movies/trending/today" element= {<TrendingTodayPage/>} />
            <Route path= "/movies/top-rated" element= {<TopRatedMoviesPage/>} />
            <Route path="/person/:id" element={<ActorDetailsPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          </WatchLaterContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);
