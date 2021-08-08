import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as SearchApi from '../services/SearchApi';
import styles from '../components/CastView/castView.module.css';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

export default function CastView() {
    const [casts, setCasts] = useState([]);
    const { moviesId } = useParams();

    useEffect(() => {
        SearchApi.fetchCastById(moviesId)
        .then(data => {
            setCasts(data.cast)
        })
    }, [moviesId])
    return (
        <>
            { casts && <>
                <ul className={styles.castsGrid}>
                    {casts.map(cast =>
                        <li key={cast.id}>
                            <p>{`Actor: ${cast.name}`}</p>
                            <p>{`Character: ${cast.character}`}</p>
                            <img
                                src={`${IMAGE_URL}${cast.profile_path}`}
                                alt={''}
                                className={styles.trendingItem_image}
                            />
                        </li>)}
                </ul>
            </>}
        </>
    );
}