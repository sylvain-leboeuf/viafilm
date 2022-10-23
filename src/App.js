import { useEffect, useState } from 'react';

import './App.css';

import ItemCard from './ItemCard';
import DetailView from './DetailView';

import viafilmLogo from './images/viafilm-logo.svg';
import searchIcon from './images/search-icon.svg';
import searchIconSmall from './images/search-icon-small.svg';
import closeIcon from './images/close-icon.svg';

// defining main variables for API
const API_KEY = "595a980eb9992d3e9e783dd243b6de08";

const App = () => {

  // defining main state variables
  const [items, setItems] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayMode, setDisplayMode] = useState('recent-popular');
  const [detailView, setDetailView] = useState(false);
  const [movieID, setMovieID] = useState('');

  useEffect(() => {
    const showInitialList = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`);
      const data = await response.json();
      setItems(data.results);  
    }
    showInitialList();    
  },[]);

    // function to search items on the database
    const searchResults = async (title) => {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`);
      const data = await response.json();
      setItems(data.results);
    }

    // function to search for the most popular recent items
    const showRecentPopular = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`);
      const data = await response.json();
      setItems(data.results);  
    }

  // function to change the display based on the mode
  const showItems = (mode) => {
    switch (mode) {
      case 'recent-popular':
        // display recent movies
        showRecentPopular();
        break;

      case 'search':
        // display recent movies
        searchResults(searchQuery);
        break;

      default:
        // display recent movies
        showRecentPopular();
        break;
    }

  }

  // function to launch a search on Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery !== '') {
      setDisplayMode('search');
      showItems('search');
      setSearchMode(false);
    } else {
      closeSearchModal();
    }    
  }

  // function to stop search function and go back to most recent popular
  const closeSearch = () => {
    setDisplayMode('recent-popular');
    showItems('recent-popular');
    setSearchMode(false);
  }

  const closeSearchModal = () => {
    setSearchMode(false);
  }

  return (
    <div className="app">

      <header className="header">
        <nav className="nav">
          <h1><img src={viafilmLogo} alt="Viafilm" onClick={(e) => closeSearch()} /></h1>
          <div className="icons">
            <img src={searchIcon} alt="Sök" onClick={(e) => setSearchMode(true)} />
          </div>
        </nav>
        { displayMode === 'search' ? <h2>Sökresultat</h2> : <h2>Senaste populära filmer</h2> }
      </header>

      <section className="list">
        {
          items?.length > 0
            ? (
                items.map((item, i) => (
                  <ItemCard item={item} key={item.id} movieIdChange={setMovieID} detailViewChange={setDetailView} animationDelay={i} /> 
                ))
                
            ) : (
              displayMode === 'search' && <h2>Oj! Inga resultat hittades.</h2>
            )
        }
        
      </section>

      <footer className="footer">
        <span>Sylvain Leboeuf // Skapades 2022 för Viatel.</span>
        <br/><br/>
        <span className="small">This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
      </footer>

      { detailView ? (
        <DetailView movieID={movieID} apiKey={API_KEY} detailViewChange={setDetailView} /> 
      ) : (
        <span></span>
      )}

      { searchMode ? (
        <div className="popin search">
          <form onSubmit={handleSubmit}>
            <img src={closeIcon} alt="Stäng" className="close-icon" onClick={(e) => closeSearchModal()} />
            <input
              type="text"
              placeholder="Sök på titel"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <img src={searchIconSmall} alt="Sök" className="search-icon-small" onClick={handleSubmit} />
            </form>
          </div>
      ) : (
        <span></span>
      )}

    </div>
  );
}
 
export default App;