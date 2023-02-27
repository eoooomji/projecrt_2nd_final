import axios from 'axios';
import { useEffect, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { NavLink } from 'react-router-dom';
import TmdbdiscoverUrl from '../commonApi_tmdb/tmdbDiscoverUrl';
import TmdbPerson from '../commonApi_tmdb/tmdbPeople';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';

const ChoiceCuration = (props) => {
  const { choiceCuration } = props;

  const choice = {
    user: choiceCuration.user,
    movie: choiceCuration.curationMovie,
    genre: choiceCuration.curationGenre,
    director: choiceCuration.curationDirector,
    cast: choiceCuration.curationCast,
  };

  const [genreList, setGenreList] = useState([]); // 장르 정보
  const [directorInfo, setDirectorInfo] = useState([]); // 감독 정보
  const [castInfo, setCastInfo] = useState([]); // 배우 정보

  // Tmdb API
  const lang = '&language=ko';
  const popular = '&sort_by=popularity.desc';
  const region = '&region=kr';
  const adult = '&include_adult=false';
  const genre_id = '&with_genres=';
  const v_count = '&vote_count.gte=100';
  const page = '&page=1';

  // 장르 인기순
  const getPopList = async () => {
    await axios
      .get(
        TmdbdiscoverUrl +
          '?api_key=' +
          TMDB_KEY +
          lang +
          region +
          popular +
          adult +
          page +
          genre_id +
          choice.genre.genrecode +
          v_count
      )
      .then((response) => {
        setGenreList(response.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //////////////////////////////////////////////////////

  // 감독 정보
  const getDirector = async () => {
    if (choice.director.personcode !== undefined) {
      await axios
        .get(
          TmdbPerson +
            choice.director.personcode +
            '/movie_credits?api_key=' +
            TMDB_KEY +
            lang
        )
        .then((response) => {
          setDirectorInfo(response.data.cast);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  ///////////////////////////////////////////////////////

  // 배우 정보
  const getCast = async () => {
    if (choice.cast.personcode !== undefined) {
      await axios
        .get(
          TmdbPerson +
            choice.cast.personcode +
            '/movie_credits?api_key=' +
            TMDB_KEY +
            lang
        )
        .then((response) => {
          setCastInfo(response.data.cast);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  useEffect(() => {
    getPopList();
    getDirector();
    getCast();
  }, [choiceCuration]);

  return (
    <>
      <div className="curation_wrap">
        {typeof choice.user === 'string' ? (
          <>
            <div className="curation_component">
              <p>{choice.user}자가 선호하는 영화</p>
              {choice.movie &&
                choice.movie.map((choice, idx) => {
                  return (
                    <div className="curation_info" key={idx}>
                      <div className="cration_img">
                        {choice.poster_url === null ||
                        choice.poster_url === undefined ? (
                          <img src="/images/none_img.jpg" width="200" />
                        ) : (
                          <img
                            src={
                              'https://image.tmdb.org/t/p/w500' +
                              choice.poster_url
                            }
                            width="300"
                          />
                        )}
                      </div>
                      <NavLink to={`/detail/${choice.moviecode}`}>
                        <div className="curation_title">{choice.title}</div>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div className="curation_component">
              <p>{choice.user}자가 선호하는 장르</p>
              <NavLink
                to={`/genre/pop/${choice.genre.genrecode}`}
                key={choice.genre.genrecode}
                value={choice.genre.genrecode}
              >
                <button className="plus_button">더보기</button>
              </NavLink>
              {genreList &&
                genreList.map((genre, idx) => {
                  return (
                    <div className="curation_info" key={idx}>
                      <div className="curation_img">
                        {genre.poster_path === null ||
                        genre.poster_path === undefined ? (
                          <img src="/images/none_img.jpg" width="200" />
                        ) : (
                          <img
                            src={
                              'https://image.tmdb.org/t/p/w500' +
                              genre.poster_path
                            }
                            width="300"
                          />
                        )}
                      </div>
                      <NavLink to={`/detail/${genre.id}`}>
                        <div className="curation_title">{genre.title}</div>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div className="curation_component">
              <p>
                {choice.user}자가 좋아하는 {choice.director.name}의 작품
              </p>
              {directorInfo &&
                directorInfo.map((director, idx) => {
                  return (
                    <div className="curation_info" key={idx}>
                      <div className="curation_img">
                        {director.poster_path === null ||
                        director.poster_path === undefined ? (
                          <img src="/images/none_img.jpg" width="200" />
                        ) : (
                          <img
                            src={
                              'https://image.tmdb.org/t/p/w500' +
                              director.poster_path
                            }
                            width="300"
                          />
                        )}
                      </div>
                      <NavLink to={`/detail/${director.id}`}>
                        <div className="curation_title">{director.title}</div>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div className="curation_component">
              <p>
                {choice.user}자가 좋아하는 {choice.cast.name}의 작품
              </p>
              {castInfo &&
                castInfo.map((cast, idx) => {
                  return (
                    <div className="curation_info" key={idx}>
                      <div className="curation_img">
                        {cast.poster_path === null ||
                        cast.poster_path === undefined ? (
                          <img src="/images/none_img.jpg" width="200" />
                        ) : (
                          <img
                            src={
                              'https://image.tmdb.org/t/p/w500' +
                              cast.poster_path
                            }
                            width="300"
                          />
                        )}
                      </div>
                      <NavLink to={`/detail/${cast.id}`}>
                        <div className="curation_title">{cast.title}</div>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <>
            <div className="curation_component">
              <p>{choice.user}대가 선호하는 영화</p>
              {choice.movie &&
                choice.movie.map((choice, idx) => {
                  return (
                    <div className="curation_info" key={idx}>
                      <div className="cration_img">
                        {choice.poster_url === null ||
                        choice.poster_url === undefined ? (
                          <img src="/images/none_img.jpg" width="200" />
                        ) : (
                          <img
                            src={
                              'https://image.tmdb.org/t/p/w500' +
                              choice.poster_url
                            }
                            width="300"
                          />
                        )}
                      </div>
                      <NavLink to={`/detail/${choice.moviecode}`}>
                        <div className="curation_title">{choice.title}</div>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div className="curation_component">
              <p>{choice.user}대가 선호하는 장르</p>
              <NavLink
                to={`/genre/pop/${choice.genre.genrecode}`}
                key={choice.genre.genrecode}
                value={choice.genre.genrecode}
              >
                <button className="plus_button">더보기</button>
              </NavLink>
              {genreList &&
                genreList.map((genre, idx) => {
                  return (
                    <div className="curation_info" key={idx}>
                      <div className="curation_img">
                        {genre.poster_path === null ||
                        genre.poster_path === undefined ? (
                          <img src="/images/none_img.jpg" width="200" />
                        ) : (
                          <img
                            src={
                              'https://image.tmdb.org/t/p/w500' +
                              genre.poster_path
                            }
                            width="300"
                          />
                        )}
                      </div>
                      <NavLink to={`/detail/${genre.id}`}>
                        <div className="curation_title">{genre.title}</div>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div className="curation_component">
              <p>
                {choice.user}대가 좋아하는 {choice.director.name}의 작품
              </p>
              {directorInfo &&
                directorInfo.map((director, idx) => {
                  return (
                    <div className="curation_info" key={idx}>
                      <div className="curation_img">
                        {director.poster_path === null ||
                        director.poster_path === undefined ? (
                          <img src="/images/none_img.jpg" width="200" />
                        ) : (
                          <img
                            src={
                              'https://image.tmdb.org/t/p/w500' +
                              director.poster_path
                            }
                            width="300"
                          />
                        )}
                      </div>
                      <NavLink to={`/detail/${director.id}`}>
                        <div className="curation_title">{director.title}</div>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div className="curation_component">
              <p>
                {choice.user}대가 좋아하는 {choice.cast.name}의 작품
              </p>
              {castInfo &&
                castInfo.map((cast, idx) => {
                  return (
                    <div className="curation_info" key={idx}>
                      <div className="curation_img">
                        {cast.poster_path === null ||
                        cast.poster_path === undefined ? (
                          <img src="/images/none_img.jpg" width="200" />
                        ) : (
                          <img
                            src={
                              'https://image.tmdb.org/t/p/w500' +
                              cast.poster_path
                            }
                            width="300"
                          />
                        )}
                      </div>
                      <NavLink to={`/detail/${cast.id}`}>
                        <div className="curation_title">{cast.title}</div>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChoiceCuration;
