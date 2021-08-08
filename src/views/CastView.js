import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as SearchApi from '../services/SearchApi';

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
                <ul>
                    {casts.map(cast =>
                        <li key={cast.id}>
                            <p>{`Actor: ${cast.name}`}</p>
                            <p>{`Character: ${cast.character}`}</p>
                            <img
                                src={`${IMAGE_URL}${cast.profile_path}`}
                                alt={''}
                            />
                        </li>)}
                </ul>
            </>}
        </>
    );
}