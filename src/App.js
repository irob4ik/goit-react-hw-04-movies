import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Appbar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import Loader from './components/Loader/Loader';

const HomeView = lazy(() => import('./views/HomeView'));
const MoviesView = lazy(() => import('./views/MoviesView'));
const NotFoundView = lazy(() => import('./views/NotFoundView'));
const MovieDetailsView = lazy(() => import('./views/MovieDetailsView'));

export default function App() {

  return (
    <Container>
      <Appbar />

      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route exact path="/">
            <HomeView/>
          </Route>

          <Route exact path="/movies">
            <MoviesView/>
          </Route>
          
          <Route path="/movies/:moviesId">
            <MovieDetailsView /> 
          </Route>
            
          <Route path="">
            <NotFoundView/>
          </Route>
        </Switch>
      </Suspense>      
      
    </Container>    
  );
}