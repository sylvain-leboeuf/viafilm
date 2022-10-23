import React, { useCallback, useEffect, useState } from 'react'

import detailCloseIcon from './images/detail-close-icon.svg';
import durationIcon from './images/duration-icon.svg';
import noPoster from './images/no-poster.jpg';
import closeIcon from './images/close-icon.svg';

const DetailView = ({ movieID, apiKey, detailViewChange }) => {

  const [movie, setMovie] = useState('');
  const [credits, setCredits] = useState('');

  const handleDetailedViewChange = useCallback(event => {
    detailViewChange(false);
  },[detailViewChange])

    useEffect(() => {
      const getDetails = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`);
        const data = await response.json();
        setMovie(data);
      }
      const getCredits = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`);
        const data = await response.json();
        setCredits(data);
      }
      getDetails();
      getCredits();
  },[movieID, apiKey]);
  
  return (

      <div className="popin detail">
        <div className="detail-close">
          <img src={detailCloseIcon} alt="Stäng" onClick={handleDetailedViewChange} />
        </div>
        {
          movie?.length !== 0
          ? (
            <div>
              <div className="detail-card">
                <div className="poster-left">
                  <img 
                    src={movie.poster_path !== null ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}` : noPoster} 
                    alt={<h2>{movie.title}</h2>}
                    className="poster"
                  />
                </div>
                <div className="infos-right">
                  <h2>{movie.title}</h2>
                  <span className="date">{movie.release_date.slice(0, 4)}</span>
                  <div className="genres">
                    {
                      movie.genres.map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                      ))
                    }
                  </div>
                  <div className="duration">
                    <img src={durationIcon} className="duration-icon" alt="Tid" />
                    {Math.floor(movie.runtime / 60)} {' t '} {movie.runtime % 60} {' m '}
                  </div>
                  <div className="tagline">{movie.tagline}</div>
                </div>
                {
                  movie.overview?.length !== 0 
                  ? (
                    <div className="recap">
                      <h3>Översikt på engelska: </h3>
                      {movie.overview}
                    </div>
                  ) : (
                    ``
                  )
                }
                <div className="recap">
                  <h3>Mer information: </h3>
                  <div>Originaltitel: <strong>{movie.original_title}</strong></div>
                  {
                    credits?.length !== 0
                    ? (
                        <div>
                          {
                            credits.crew.map((crew) => (
                              crew.job === 'Director' && <div key={crew.id}>Regisserad av <strong>{crew.name}</strong></div>
                            ))
                          }
                          {
                            credits.cast?.length !== 0
                            ? (
                              <div>
                                { `Med ` }
                                { credits.cast[0] !== undefined && credits.cast[0].name?.length !==0 && <span><strong>{credits.cast[0].name}</strong>, </span> }
                                { credits.cast[1] !== undefined && credits.cast[1].name?.length !==0 && <span><strong>{credits.cast[1].name}</strong> och </span> }
                                { credits.cast[2] !== undefined && credits.cast[2].name?.length !==0 && <span><strong>{credits.cast[2].name}</strong>. </span> }
                              </div>
                            ) :  (
                              ``
                            )
                          }
                          </div>
                    ) : (
                      ``
                    )
                  }
                </div>
              </div>
              {
                movie.backdrop_path !== null ? (
                  <img src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}`} alt={<h2>{movie.title}</h2>} className="background" />
                ) : (
                  <div className="background-replacement"></div>
                )
              }
            </div>
            
          ) : (
            ``
          )
        }
        <div className="button close" onClick={handleDetailedViewChange}>
          <span>Stäng</span>
          <img src={closeIcon} className="close-icon" alt="" />
        </div>
      </div>

  );
}

export default DetailView;