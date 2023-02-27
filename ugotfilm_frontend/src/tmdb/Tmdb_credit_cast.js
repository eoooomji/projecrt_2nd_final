import { NavLink } from 'react-router-dom';
import './Tmdb_style.css';

const Cast = (props) => {
  const { cast } = props;

  return (
    <div className="cast_wrap">
      <div className="cast_img">
        {cast.poster_path === null || cast.poster_path === undefined ? (
          <img
            src="/images/none_img.jpg"
            style={{ width: '200px', height: '300px' }}
          />
        ) : (
          <img
            src={'https://image.tmdb.org/t/p/w500' + cast.poster_path}
            width="200"
          />
        )}
      </div>
      <NavLink to={`/detail/${cast.id}`} style={{ textDecoration: 'none' }}>
        <div className="cast_title">{cast.title}</div>
      </NavLink>

      <div className="cast_genre">{cast.release_date}</div>
      <span className="star_rating">★</span>
      <span className="cast_vote">
        {cast.vote_average !== null ? '폼 변경' : '평점이 없습니다'}
      </span>
    </div>
  );
};
export default Cast;
