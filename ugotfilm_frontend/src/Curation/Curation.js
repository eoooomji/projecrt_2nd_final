import axios from 'axios';
import { useEffect, useState } from 'react';
import { json, NavLink } from 'react-router-dom';
import { baseUrl } from '../commonApi_tmdb/baseUrl';
import BasicCuration from './basic_curation';
import ChoiceCuration from './choice_curation';

const Curation = () => {
  // 전체 기준
  const [basicCuration, setBasicCuration] = useState({
    bestMovie: [{}],
    bestCast: {},
    bestDirector: {},
    bestGenre: {},
  });
  // 유저 기준
  const [choiceCuration, setChoiceCuration] = useState({
    user: '',
    curationMovie: [{}],
    curationGenre: {},
    curationDirector: {},
    curationCast: {},
  });

  const data = new FormData();
  data.append('usercode', localStorage.getItem('usercode'));

  const getCuration = async () => {
    await axios
      .post(baseUrl + '/curation', data)
      .then((response) => {
        console.log(response.data);
        setBasicCuration({
          bestCast: response.data.basic_curation.bestCast,
          bestDirector: response.data.basic_curation.bestDirector,
          bestGenre: response.data.basic_curation.bestGenre,
          bestMovie: response.data.basic_curation.bestMovie,
        });

        if (response.data.status !== 404) {
          setChoiceCuration({
            user: response.data.choice_curation.user,
            curationMovie: response.data.choice_curation.CurationMovie,
            curationGenre: response.data.choice_curation.CurationGenre,
            curationDirector: response.data.choice_curation.CurationDirector,
            curationCast: response.data.choice_curation.CurationCast,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getCuration();
  }, []);

  console.log(choiceCuration.curationGenre);

  return (
    <>
      <div className='curation_wrap'>
        <div className='basic_curation_wrap'>
          <BasicCuration basicCuration={basicCuration} />
        </div>

        <br />
        <hr />
        <br />
        {choiceCuration.curationGenre === null ? (
          <></>
        ) : (
          <div className='choice_curation_wrap'>
            <ChoiceCuration choiceCuration={choiceCuration} />
          </div>
        )}
      </div>
    </>
  );
};

export default Curation;
