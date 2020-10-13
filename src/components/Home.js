import React, { useState, useEffect } from 'react';
import {
    API_URL, 
    API_KEY, 
    IMAGE_BASE_URL, 
    BACKDROP_SIZE, 
    POSTER_SIZE
} from '../config';

// import components
import HeroImage from './elements/HeroImage';
import SearchBar from './elements/SearchBar';
import Grid from './elements/Grid';
import MovieThumb from './elements/MovieThumb';
import LoadMoreBtn from './elements/LoadMoreBtn';
import Spinner from './elements/Spinner';

const Home = () => {
    const [state, setState] = useState({ movies: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    console.log(state);

    const fetchMovies = async endpoint => {
        setError(false);
        setLoading(true);

        try {
            const result = await (await fetch(endpoint)).json();
            console.log(result);
            setState(prev => ({
                ...prev,
                movies: [...result.results],
                heroImage: prev.heroImage || result.results[0],
                currentPage: result.page,
                totalPages: result.total_pages
            }));
        } catch (error) {
            setError(true);
            console.log(error);
        }
        setLoading(false);

    }

    useEffect(() => {
        fetchMovies(`${API_URL}movie/popular/?api_key=${API_KEY}`);
    }, []);

    return (
        <>
            <HeroImage />
            <SearchBar />
            <Grid />
            <MovieThumb />
            <Spinner />
            <LoadMoreBtn />
        </>
    );
}

export default Home;