import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';

const JoinForm = () => {
  const navigator = useNavigate();
  // useState로쓸필요없다 화면에 표시되는게 아니어서..
  // 오류창 띄울때 리렌더링이 필요한데 useRef는 리렌더링이 안되서 useState로 바꿔봤습니다!
  const [member, setMember] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    birth: 0,
    gender: '남',
    authRole: 'ROLE_MEMBER',
  });

  //오류메세지
  const message = {
    username: '영문과 숫자를 조합하여 4~12자 안으로 입력해주세요😥',
    password: '영어, 숫자, 특수문자를 조합하여 8~12자 안으로 입력해주세요😥',
    passwordConfirm: '비밀번호가 일치하지 않습니다😥',
    nickname: '영어,한글,숫자 상관없이 2~7자 안으로 입력해주세요😥',
    authRole: 'ROLE_MEMBER',
  };

  //유효성
  const [effect, setEffect] = useState({
    username: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
  });

  //출생년도 option을 위한 for문
  const birthYear = () => {
    const result = [];
    for (let i = 1900; i <= 2023; i++) {
      result.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }

    return result;
  };

  const onSubmit = async (e) => {
    const result = userValidChk('submit');
    if (!result.valid) {
      alert('가입축합니다!');
    }
    e.preventDefault();
    await axios
      .post(`${baseUrl}/join`, member, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        setMember({
          username: '',
          password: '',
          nickname: '',
          birth: '',
          gender: '남',
          authRole: 'ROLE_MEMBER',
        });
      })
      .then((response) => {
        navigator('/');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //정규식
  const userValidChk = (target) => {
    // check user name
    if (target !== 'submit' && target === 'username') {
      const idRegExp = /^(?=.*[a-z])(?=.*\d)[a-z0-9]{4,12}$/;
      console.log(member.username);
      // console.log(member.username.length);
      if (!idRegExp.test(member.username)) {
        setEffect({ ...effect, username: false });
        return { valid: false, where: 'username' };
      } else {
        idck();
      }
    }

    // check password
    if (target !== 'submit' && target === 'password') {
      const pwRegExp =
        /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
      if (!pwRegExp.test(member.password)) {
        setEffect({ ...effect, password: false });
        return { valid: false, where: 'password' };
      } else {
        setEffect({ ...effect, password: true });
      }
    }

    // check passwordConfirm
    if (target !== 'submit' && target === 'passwordConfirm') {
      // console.log(member.password);
      // console.log(member.passwordConfirm);
      // console.log(member.password !== member.passwordConfirm);
      if (member.password !== member.passwordConfirm) {
        setEffect({ ...effect, passwordConfirm: false });
        return { valid: false, where: 'passwordConfirm' };
      } else {
        setEffect({ ...effect, passwordConfirm: true });
      }
    }

    // check nickname
    if (target !== 'submit' && target === 'nickname') {
      const nicknameRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,7}$/;
      if (!nicknameRegExp.test(member.nickname)) {
        setEffect({ ...effect, nickname: false });
        return { valid: false, where: 'nickname' };
      } else {
        nicknameck();
      }
    }

    return true;
  };

  const handleValueChange = (e) => {
    member[e.target.name] = e.target.value;
    userValidChk(e.target.name);
  };

  const idck = async (e) => {
    const formData = new FormData();
    formData.append('username', member.username);

    const idcheck = await axios.post(`${baseUrl}/idck`, formData);
    console.log('idcheck : ' + idcheck.data);
    if (idcheck.data === 0) {
      console.log('사용가능');
      setEffect({ ...effect, username: true });
      console.log(effect);
    } else {
      console.log('사용불가');
      setEffect({ ...effect, username: false });
      return { valid: false, where: 'username' };
    }
  };

  const nicknameck = async (e) => {
    const formData = new FormData();
    formData.append('nickname', member.nickname);

    const idcheck = await axios.post(`${baseUrl}/nicknameck`, formData);
    console.log('nickname : ' + idcheck.data);
    if (idcheck.data === 0) {
      console.log('사용가능');
      setEffect({ ...effect, nickname: true });
      console.log(effect);
    } else {
      console.log('사용불가');
      setEffect({ ...effect, nickname: false });
      return { valid: false, where: 'nickname' };
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원가입</h1>
          <div className="form-group mb-1">
            <span style={{ fontWeight: 'bold' }}>아이디</span>
            <div className="flex">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="영문과 숫자를 조합하여 4~12자 안으로 입력"
                required
                onChange={handleValueChange}
              />
            </div>
            {/* 유효성체크 */}
            {effect.username ? (
              <span id="idMsg" style={{ color: 'green' }}>
                사용가능한 아이디입니다😄
              </span>
            ) : (
              <span id="idMsg" style={{ color: 'red' }}>
                {/* {message.username} */}
              </span>
            )}

            {!effect.username && member.username.length > 0 && (
              <span id="idMsg" style={{ color: 'red' }}>
                {message.username}
              </span>
            )}
          </div>
          <div className="form-group mb-1">
            <span style={{ fontWeight: 'bold' }}>비밀번호</span>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="영어, 숫자, 특수문자를 조합하여 8~12자 안으로 입력"
              onChange={handleValueChange}
              required
            />
            {}

            {!effect.password && member.password.length > 0 && (
              <span id="idMsg" style={{ color: 'red' }}>
                {message.password}
              </span>
            )}
          </div>
          <div className="form-group mb-1">
            <span style={{ fontWeight: 'bold' }}>비밀번호 확인</span>
            <input
              type="password"
              className="form-control"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              onChange={handleValueChange}
            />
            {effect.passwordConfirm ? (
              <span id="idMsg" style={{ color: 'green' }}>
                비밀번호가 일치합니다😄
              </span>
            ) : (
              <span id="idMsg" style={{ color: 'red' }}>
                {/* {message.passwordConfirm} */}
              </span>
            )}

            {!effect.passwordConfirm && member.passwordConfirm.length > 0 && (
              <span id="idMsg" style={{ color: 'red' }}>
                {message.passwordConfirm}
              </span>
            )}
          </div>
          <span></span>
          <div className="form-group mb-1">
            <span style={{ fontWeight: 'bold' }}>닉네임</span>
            <div className="flex">
              <input
                type="nickname"
                className="form-control"
                name="nickname"
                placeholder="영어,한글,숫자 상관없이 2~7자 안으로 입력"
                onChange={handleValueChange}
                required
              />
            </div>
            {/* {effect.nickname ? (
              <span id='idMsg' style={{ color: "green" }}>
                사용가능한 닉네임입니다😄
              </span>
            ) : (
              <span id='idMsg' style={{ color: "red" }}>
                {message.nickname}
              </span>
            )} */}

            {!effect.nickname && member.nickname.length > 0 && (
              <span id="idMsg" style={{ color: 'red' }}>
                {message.nickname}
              </span>
            )}
          </div>
          <div className="form-group mb-1">
            <div style={{ fontWeight: 'bold' }}>출생년도</div>
            <select
              className="form-control"
              name="birth"
              onChange={handleValueChange}
              required
            >
              {birthYear()}
            </select>
          </div>
          <span style={{ fontWeight: 'bold' }}>성별</span>
          <br />
          <div
            className="form-check form-check-inline  form-group"
            onChange={handleValueChange}
          >
            <label className="form-group mb-1">
              <input
                type="radio"
                name="gender"
                className="form-check-input"
                value="남"
                defaultChecked={true}
                required
              />
              남
            </label>
            <label className="form-group mb-1 mx-5">
              <input
                type="radio"
                name="gender"
                className="form-check-input"
                value="여"
              />
              여
            </label>
          </div>
          <hr className="my-3" />
          <div className="form-group mb-3 mb-1">
            <div
              className="form-check form-check-inline  form-group"
              onChange={handleValueChange}
            >
              <label>
                <input
                  type="radio"
                  name="authRole"
                  value="ROLE_ADMIN"
                  className="form-check-input"
                />
                관리자
              </label>
              <label className="mx-5">
                <input
                  type="radio"
                  name="authRole"
                  value="ROLE_MANAGER"
                  className="form-check-input"
                />
                매니저
              </label>
              <label className="mx-5">
                <input
                  type="radio"
                  name="authRole"
                  value="ROLE_MEMBER"
                  className="form-check-input"
                  // 기본으로 사용하기 위해 defaultChecked={true} 사용
                  defaultChecked={true}
                />
                일반 사용자
              </label>
            </div>
          </div>
          <hr />
          <span>아이디가 있으신가요..?</span>
          <button>
            <Link to="/login">로그인</Link>
          </button>
          <hr />
          <button type="submit" className="btn btn-primary">
            가입 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinForm;
