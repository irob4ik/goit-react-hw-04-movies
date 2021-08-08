import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import * as SearchApi from '../services/SearchApi';
import MoviesGallery from '../components/MoviesGallery/MoviesGallery';
import Searchbar from '../components/Searchbar/Searchbar';
import { useLocation } from 'react-router-dom';

export default function MoviesView() {
    const [search, setSearch] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loaderStatus, setLoaderStatus] = useState('init');
    const [error, setError] = useState(null);

    const location = useLocation();

    const handleInputSubmit = (input) => {
        setSearch(input);
        setLoaderStatus('init');
    }

    useEffect(() => {
        if (!location?.state?.searchVal && !search) {
            return;
        }

        if (!search) {
            setSearch(location?.state?.searchVal);
        }
        
        setLoading(true);

        SearchApi.fethMovieBySearch(search)
            .then(data => {            
            if (data.results.length === 0) {
                setMovies(data.results);
                setLoaderStatus('nothingFound');
                return;
            }

            setMovies(data.results);
            setLoaderStatus('init');
        })
        .catch(newError => {
            setError(newError);

            if (error) {
            console.log(error);
            }
        })
        .finally(() => setLoading(false))

    }, [search, error]);

    return (
        <>
            <Searchbar inputSubmit={handleInputSubmit} />

            {loading && loaderStatus === 'init' && <Loader />}

            {movies && 
                <MoviesGallery
                    gallery={movies}
                    searchOption={search}
                />
            }
            
            {loaderStatus === 'nothingFound'
                && search !== null
                && <h1>Nothing found.... Try again</h1>
            }
        </>
    );    
}