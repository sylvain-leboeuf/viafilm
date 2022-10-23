import React, { useCallback, useEffect } from 'react'

import ratingIcon from './images/rating-icon.svg';
import noPoster from './images/no-poster.jpg';

const ItemCard = ({ item, movieIdChange, detailViewChange, animationDelay }) => {

  const handleDetailedViewChange = useCallback(event => {
    movieIdChange(item.id);
    detailViewChange(true);
  })

  const animationTimer = animationDelay*100;

  useEffect(() => {
    // fade in the card with a delay
    document.getElementById(`card-${item.id}`).style.opacity = "0";
    setTimeout(() => {fadeInCard()}, animationTimer);
  }, []);

  const fadeInCard = () => {
    document.getElementById(`card-${item.id}`).style.animation = `fade-in-bottom 0.05s ease-in-out`;
    document.getElementById(`card-${item.id}`).style.opacity = "1";
  }

  return (
		<div className="card" id={`card-${item.id}`}>
      <img 
        src={item.poster_path !== null ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.poster_path}` : noPoster} 
        alt={<h2>{item.title}</h2>}
        className="poster"
        onClick={handleDetailedViewChange}
      />
      <div className="description">
        <h2>{item.title}</h2>
        <span className="tags">
          {
            item.vote_count > 0 ? 
            (
              <span>
                <img className="rating-icon" src={ratingIcon} alt="" />&nbsp;{item.vote_average} | 
              </span>
            ) : (
              ` `
            )
          } {
            item.release_date !== undefined && item.release_date.slice(0, 4)
          }
        </span> 
      </div>     
      <div className="button more-info" onClick={handleDetailedViewChange}>Mer info</div>
		</div>
  );
}

export default ItemCard;