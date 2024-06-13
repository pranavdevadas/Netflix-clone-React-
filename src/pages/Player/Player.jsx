import React, { useEffect, useMemo, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

function Player() {

  let {id} = useParams()
  let navigate = useNavigate()

  let [apiData, setApiData] = useState({
    name : '',
    key : '',
    published_at : '',
    type : ''
  })

  const options = useMemo(() => ({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmY2NTRmZWYxM2FjOTUxYzBkMjhmMzRhNTY4ODkxYiIsInN1YiI6IjY2NjliOGZmNDc0ZGZjYjRmZWQwNTQzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RXOoIRSlYovRGnyjRjw-GicUC6emexZDVMhdeqEviZ4'
    }
  }), []);

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));

  },[id, options])
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-2)} />
      <iframe width='100%' height='90%'
      src= {`https://www.youtube.com/embed/${apiData.key}` }
      title='trailer' frameBorder='0' allowFullScreen ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player