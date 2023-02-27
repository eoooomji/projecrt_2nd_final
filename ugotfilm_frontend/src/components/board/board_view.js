import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';
import BoardComment from './board_comment';

const BoardView = () => {
  const navigator = useNavigate();
  const [board, setBoard] = useState({});
  const [commentList, setCommentList] = useState([]);
  const { currentPage, num } = useParams();
  // console.log('currentPage :' + currentPage);
  // console.log('num :' + num);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`${baseUrl}/board/view/${num}`)
      .then((response) => {
        setBoard(response.data.dto);
        setCommentList(response.data.blist);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //download
  const handleDownLoad = async () => {
    await axios
      .get(`${baseUrl}/board/contentdownload/${board.upload}`, {
        responseType: 'blob',
      })
      .then((response) => {
        console.log(response.headers);
        const fileName = board.upload.substring(board.upload.indexOf('_') + 1);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        link.style.cssText = 'display:none';
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  ///삭제
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm('삭제하시겠습니까?')) {
      return false;
    }
    await axios
      .delete(`${baseUrl}/board/delete/${num}`)
      .then(() => {
        console.log('삭제 완료');
        navigator(`/board/list/${currentPage}`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    setTextareas({ ...textareas, ...nextState });
  };

  //댓글 작성
  const [textareas, setTextareas] = useState({ subject: '' });
  // const [inputs, setInputs] = useState({
  //   writer: '',
  //   subject: '',
  // });
  const { writer, subject } = textareas;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('writer', localStorage.getItem('usercode'));
    formData.append('subject', subject);
    formData.append('pnum', num);
    //답변글이면...
    if (num !== undefined) {
      formData.append('num', num);
      formData.append('currentPage', currentPage);
    }

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    await axios
      .post(`${baseUrl}/comment/write`, formData, config)
      .then((response) => {
        console.log(response.data);
        setTextareas({
          writer: '',
          subject: '',
        });
        getData();
        navigator(`/board/view/${currentPage}/${num}`);
        // navigator(`/board/list/${response.data}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <td>
              <h4>{board.subject}</h4>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>
                <span>작성일: </span>
                {board.reg_date}
              </div>
              <div>
                <span>작성자: </span>
                {board.nickname}
              </div>
              <div>
                <span>조회수: </span>
                {board.readcount}
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div className="pt-4 pb-2">{board.content}</div>
            </td>
          </tr>
          {board.upload !== null ? (
            <tr>
              {/* <th>파일</th> */}
              <td colSpan="3">
                <button onClick={handleDownLoad}>
                  {board.upload
                    ? board.upload.substring(board.upload.indexOf('_') + 1)
                    : null}
                </button>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <div>
        <Link className="btn btn-primary" to={`/board/list/${currentPage}`}>
          리스트
        </Link>
        <Link
          className="btn btn-primary"
          to={`/board/write/${currentPage}/${num}/${board.ref}/${board.re_step}/${board.re_level}`}
        >
          답변
        </Link>

        {localStorage.getItem('usercode') == board.writer ? (
          <>
            <Link className="btn btn-primary" to={`/board/update/${currentPage}/${num}`}>수정</Link>
            <Link to={`/board/list/${currentPage}`}><button className="btn btn-primary" onClick={handleDelete}>삭제</button></Link>
          </>
        ) : null}



        <hr />
      </div>
      {/* 댓글부분 */}
      <table className="table">
        <tbody>
          {commentList &&
            commentList.map((comment) => {
              return (
                <BoardComment
                  board={comment}
                  num={num}
                  currentPage={currentPage}
                  key={comment.num}
                />
              );
            })}
        </tbody>
      </table>
      <div className="card">
        <form onSubmit={onSubmit}>
          <div className="card-body">
            <textarea
              className="form-control"
              row="1"
              name="subject"
              value={subject}
              onChange={handleValueChange}
            ></textarea>
          </div>
          <div className="card-footer">
            <input type="submit" className="btn btn-primary" value="등록" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardView;
