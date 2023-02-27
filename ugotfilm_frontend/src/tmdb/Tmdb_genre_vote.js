import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import TmdbdiscoverUrl from '../commonApi_tmdb/tmdbDiscoverUrl';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';
import './Genre_list_style.css';

const Genre_vote = () => {
  const lang = '&language=ko';
  const vote = '&sort_by=vote_average.desc';
  const region = '&region=kr';
  const adult = '&include_adult=false';
  const genres = '&with_genres=';
  const v_count = '&vote_count.gte=100';
  const [page, setPage] = useState(1);

  const { genre_id } = useParams();

  const [genreInfo, setGenreInfo] = useState([]);

  const getGenreList = async () => {
    await axios
      .get(
        TmdbdiscoverUrl +
          '?api_key=' +
          TMDB_KEY +
          lang +
          region +
          vote +
          adult +
          '&page=' +
          page +
          genres +
          genre_id +
          v_count
      )
      .then((response) => {
        setGenreInfo(genreInfo.concat(response.data.results));
        setPage(page + 1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getGenreList();
  }, []);

  //console.log(genre_id);

  const handle = (e) => {
    getGenreList(e.target.value);
  };

  return (
    <>
      <div className="genre_wrap">
        {genreInfo.map((element) => (
          <div className="genre_tile" key={element.id}>
            <div className="genre_movie_image">
              {element.poster_path === null ||
              element.poster_path === undefined ? (
                <img src="/images/none_img.jpg" />
              ) : (
                <img
                  className="poster"
                  src={'https://image.tmdb.org/t/p/w500' + element.poster_path}
                />
              )}
            </div>
            <NavLink
              to={`/detail/${element.id}`}
              key={element.id}
              style={{ textDecoration: 'none' }}
            >
              <div className="genre_movie_title">{element.title}</div>
            </NavLink>

            <div className="genre_movie_text">
              <div className="movie_date">{element.release_date}</div>
              <span className="star_rating">★</span>
              <span className="movie_rating">{element.vote_average}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        className="button_more"
        style={{
          float: 'right',
          marginBottom: 20,
          width: '100%',
          backgroundColor: 'black',
          color: 'white',
          height: 50,
        }}
        onClick={handle}
      >
        더보기
      </button>
    </>
  );
};

export default Genre_vote;
