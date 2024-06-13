import React, { useEffect, useRef, useState } from 'react'
import './Titlecards.css'
// import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



function Titlecards({title, category}) {

  let [apiData, setApiData] = useState([])
  let cardsRef = useRef()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmY2NTRmZWYxM2FjOTUxYzBkMjhmMzRhNTY4ODkxYiIsInN1YiI6IjY2NjliOGZmNDc0ZGZjYjRmZWQwNTQzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RXOoIRSlYovRGnyjRjw-GicUC6emexZDVMhdeqEviZ4'
    }
  };

  let handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  
  useEffect(()=> {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel)
  },[])

  return (
    <div className='title-cards'>
      <h3>{title ? title : 'Popular on Netflix'}</h3>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
            <p> {card.original_title} </p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default Titlecards
