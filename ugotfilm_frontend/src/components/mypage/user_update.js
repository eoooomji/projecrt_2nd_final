import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../commonApi_tmdb/baseUrl";

const UserUpdate = () => {
  const navigator = useNavigate();
  const [initUser, setInitUser] = useState({});
  const [inputs, setInputs] = useState({
    nickname: "",
    birth: 0,
    gender: "",
  });

  const { nickname, birth, gender } = inputs;


  //오류메세지
  const message = {
    nickname: "영어,한글,숫자 상관없이 2~7자 안으로 입력해주세요😥",
    authRole: "ROLE_MEMBER",
  };

  //유효성
  const [effect, setEffect] = useState({
    nickname: false,
  });

  //출생년도 option을 위한 for문
  const birthYear = () => {
    const result = [];
    for (let i = 1900; i <= 2023; i++) {
      {initUser.birth===i ? (result.push(
        <option value={i} key={i} selected={true}>
          {i}
        </option>)
      ) : (result.push(
        <option value={i} key={i}>
          {i}
        </option>
      ));}
      
    }
    return result;
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const formData = new FormData();
    formData.append("usercode", localStorage.getItem("usercode"));
    await axios
      .post(`${baseUrl}/update/`, formData)
      .then((response) => {
        setInitUser(response.data);
        setInputs(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await axios
      .put(`${baseUrl}/update`, inputs, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setInputs({
          nickname: "",
          birth: "",
          gender: "남",
        });
        setInitUser({});
      })
      .then((response) => {
        const result = userValidChk("submit");
        if (!result.valid) {
          alert('수정완료!');
          navigator("/mypage");
          localStorage.setItem('nickname', nickname);
        }
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //정규식
  const userValidChk = (target) => {
    // check nickname
    if (target !== "submit" && target === "nickname") {
      const nicknameRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,7}$/;
      if (!nicknameRegExp.test(inputs.nickname)) {
        setEffect({ ...effect, nickname: false });
        return { valid: false, where: "nickname" };
      } else {
        nicknameck();
      }
    }

    return true;
  };

  const handleValueChange = (e) => {
    inputs[e.target.name] = e.target.value;
    userValidChk(e.target.name);

  };

  const nicknameck = async(e) => {
    const formData = new FormData();
    formData.append("nickname", inputs.nickname);
    formData.append("usercode", localStorage.getItem('usercode'));

    const idcheck = await axios.post(`${baseUrl}/nicknameck`, formData);
    console.log("nickname : " + idcheck.data)
    if(idcheck.data === 0){
      console.log("사용가능");
      setEffect({ ...effect, nickname: true });
      console.log(effect);
    }else{
      console.log("사용불가");
      setEffect({ ...effect, nickname: false });
        return { valid: false, where: "nickname" };
    }
}

  const handleLeave = async(e) => {
    if (!window.confirm('탈퇴하시겠습니까?')) {
      return false;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("usercode", localStorage.getItem("usercode"));
    
    await axios
    .put(`${baseUrl}/leave`, formData)
    .then(() => {
      console.log('탈퇴 완료');
      localStorage.removeItem('Authorizaton');
      localStorage.removeItem('username');
      localStorage.removeItem('nickname');
      localStorage.clear();
      window.location.replace('/');
    })
    .catch((err) => {
      console.error(err.message);
    });
  };

const handleChnagePassword = (e) => {
  if (!window.confirm('비밀번호 수정하시겠습니까?')) {
    return false;
  }
  console.log('비밀번호 수정')
}

const handleReset = (e) => {
  e.preventDefault();
  setInputs(initUser);
  
};

const handleBack = (e) => {
  e.preventDefault();
  navigator(-1);
};

  return (
    <div>
      <div className="container">
        <h1>회원정보수정</h1>
        <h3>{localStorage.getItem('nickname')} 님 정보 수정</h3>
    <div>
      <button onClick={handleChnagePassword}>비밀번호 수정</button>
    </div>
    <form id="updateform" onSubmit={onSubmit}>
    <div className="form-group mb-1">
            <span style={{ fontWeight: "bold" }}>닉네임</span>
            <div className="flex">
              <input
                type="nickname"
                className="form-control"
                name="nickname"
                placeholder="영어,한글,숫자 상관없이 2~7자 안으로 입력"
                value={nickname}
                onChange={handleValueChange}
                required 
                maxLength={7}
              />
            </div>
            {!effect.nickname && inputs.nickname.length > 0 && (
              <span id="idMsg" style={{ color: "red" }}>
                {message.nickname}
              </span>
            )}
          </div>
          <div className="form-group mb-1">
            <div style={{ fontWeight: "bold" }}>출생년도</div>
            <select
              className="form-control"
              name="birth"
              onChange={handleValueChange}
              required 
            >
              {birthYear()}
            </select>
          </div>
          <span style={{ fontWeight: "bold" }}>성별</span>
          <br />
          <div
            className="form-check form-check-inline  form-group"
            onChange={handleValueChange}
          >
            {initUser.gender=='남' ? ( 
              <>
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
            </label></>) : (<> <label className="form-group mb-1">
              <input
                type="radio"
                name="gender"
                className="form-check-input"
                value="남"
                
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
                defaultChecked={true}
              />
              여
            </label></>)}
           
          </div>
          </form>
          
        <hr />
        <button type="submit" className="btn btn-primary" form="updateform" >
          수정
        </button>
        <button type="reset" className="btn btn-primary" form="updateform">
          취소
        </button>
        <button className="btn btn-primary" onClick={handleBack}>
          마이페이지
        </button>
        <button className="btn btn-primary" onClick={handleLeave}>탈퇴</button>
      </div>
    </div>
  );
};

export default UserUpdate;
