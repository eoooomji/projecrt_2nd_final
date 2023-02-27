import { useEffect, useState } from 'react';
import TmdbUrl from '../commonApi_tmdb/tmdbUrl';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';
import axios from 'axios';
import MovieInfo from './Tmdb_now';
import MoviePop from './Tmdb_pop';
import './Tmdb_style.css';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Curation from '../Curation/Curation';
import { baseUrl } from '../commonApi_tmdb/baseUrl';
import { NavLink } from 'react-router-dom';

const Tmdb_main = () => {
  const lang = '&language=ko';
  const now = '/now_playing?';
  const popular = '/popular?';

  const data = new FormData();
  data.append('usercode', localStorage.getItem('usercode'));

  const nowShow = TmdbUrl + now + 'api_key=' + TMDB_KEY + lang;

  const popShow = TmdbUrl + popular + 'api_key=' + TMDB_KEY + lang;

  // 큐레이션 파트
  const [movie, setMovie] = useState([]);

  // 현재 상영작
  const [movieList, setMovieList] = useState([]);

  // 인기작
  const [popList, setPopList] = useState([]);

  // 현재 상영작 리스트
  const getMovieList = async () => {
    await axios
      .get(nowShow + '&page=1')
      .then((response) => {
        setMovieList(response.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getMovieList();
    getPopList();
    getCuration();
  }, []);

  // 인기작 리스트
  const getPopList = async () => {
    await axios
      .get(popShow + '&page=1')
      .then((response) => {
        setPopList(response.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const settings = {
    dots: false, // 캐러셀의 점을 보여줄 것 인지
    infinite: true, // 마지막장 다음에 첫장이 나오게 할 지
    speed: 500, // 다음 컨텐츠 까지의 속도
    autoplay: true, // 자동으로 재생할지
    arrows: true, // 좌,우 버튼
    centerMode: true, // 현재 컨텐츠 가운데 정렬
    autoplaySpeed: 2000, // 자동 캐러셀 속도
    slidesToShow: 5, // 한 화면에 몇개의 사진을 동시에 보여줄지
    slidesToScroll: 1,
    draggable: true, // 드래그
  };

  const getCuration = async () => {
    await axios
      .post(baseUrl + '/main', data)
      .then((response) => {
        setMovie(response.data.bestMovie);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="Tmdb_main_wrap">
      <p className="tag_name">#현재상영작</p>
      <div className="main_chart now_playing">
        <Slider {...settings}>
          {movieList.map((movie) => {
            return <MovieInfo movie={movie} key={movie.id} />;
          })}
        </Slider>
      </div>
      <div className="button_wrap">
        <NavLink to="/movie/now">
          <button className="plus_button">
            <span>+</span>
          </button>
        </NavLink>
      </div>
      <p className="tag_name">#인기작</p>
      <div className="main_chart popular">
        <Slider {...settings}>
          {popList.map((movie) => {
            return <MoviePop movie={movie} key={movie.id} />;
          })}
        </Slider>
      </div>
      <div className="button_wrap">
        <NavLink to="movie/pop">
          <button className="plus_button">
            <span>+</span>
          </button>
        </NavLink>
      </div>
      {movie.length !== 0 ? (
        <div>
          <Curation key={localStorage.getItem('usercode')} />
        </div>
      ) : null}
    </div>
  );
};

export default Tmdb_main;
