import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';
//import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  //const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${baseUrl}/login`,
        { username: username, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('response:', response.data);
        console.log(response);

        //let jwtToken = response.headers['authorization'];
        let jwtToken = response.headers.get('authorization');
        console.log(jwtToken);

        let jwtUsername = response.data.username;
        let jwtAuthRole = response.data.authRole;
        let jwtUsercode = response.data.usercode;
        let jwtNickname = response.data.nickname;
        console.log('jwtToken', jwtToken);
        localStorage.setItem('Authorization', jwtToken);
        localStorage.setItem('username', jwtUsername);
        localStorage.setItem('authRole', jwtAuthRole);
        localStorage.setItem('usercode', jwtUsercode);
        localStorage.setItem('nickname', jwtNickname);
        setUsername('');
        setPassword('');
      })
      .then((response) => {
        // navigate("/");
        window.location.replace('/');
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="container text-center mt-5">
      <div className="mx-5">
        <h1>로그인</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group mt-1">
            <input
              type="text"
              name="username"
              className="form-control"
              id="username"
              placeholder="사용자"
              maxLength="20"
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group mt-1">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="비밀번호"
              maxLength="20"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mt-1">
            <button type="submit" className="btn btn-primary">
              로그인
            </button>
            <Link className="btn btn-primary" to="/join">
              회원 가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
