import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/footer';
import Header from '../components/layout/header';
import Movie from '../tmdb/Movie_general';
//import Naver_Search from '../naver/Naver_search';
//import Tmdb_main from '../tmdb/Tmdb_main';

const MainView = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainView;
