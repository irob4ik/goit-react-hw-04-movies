import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './moviesGallery.module.css';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

export default function MoviesGallery({ gallery, searchOption }) {
    const location = useLocation();

    return (
        <ul className={styles.trendingGallery}>
            {gallery.map(item =>
                <li key={item.id}>
                    <Link to={{
                        pathname: `/movies/${item.id}`,
                        state: {
                            from: location,
                            option: searchOption,
                        },                        
                    }}>
                        <img
                            src={`${IMAGE_URL}${item.poster_path}`}
                            alt={item.title
                                ? item.title
                                : item.name}
                            className={styles.trendingItem_image}                    
                        />                    
                    </Link>                
                </li>)
            }
        </ul>
    );
}