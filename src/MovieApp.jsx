import { useState } from 'react'
import './MovieApp.css'


export const MovieApp = () => {
    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = 'caaddeb02d26632737031f42c31c1b3a'

    const [search, setSearch] = useState('')
    const [movieList, setMovieList] = useState(null)


    const handleImputChange = ({ target }) => {
        setSearch(target.value)
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        fetchMovies()   
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${search}&api_key=${API_KEY}`)
            const data = await response.json()
            setMovieList(data.results)
        } catch (error) {
            console.error("Ha ocurrido este error: ", error)
        }
    }



    return (
        <div className='container'>
            <h1>Buscador de películas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Ingresá una película'
                    value={search}
                    onChange={handleImputChange}
                />
                <button>Buscar</button>
            </form>
            {movieList &&
                <div className='movie-list'>

                {movieList.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                ))}

            </div>
            }
        </div>
    )
}
