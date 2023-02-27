import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';

const BoardComment = (props) => {

  let { board } = props;
  const { currentPage, num } = useParams();
  const [commentList, setCommentList] = useState([]);

  const getData = async () => {
    await axios
      .get(`${baseUrl}/board/view/${num}`)
      .then((response) => {
        setCommentList(response.data.blist);
        board = commentList;
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  ///댓글 삭제
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm('삭제하시겠습니까?')) {
      return false;
    }
    await axios
      .delete(`${baseUrl}/comment/delete/${board.num}`)
      .then(() => {
        console.log('삭제 완료');
        getData();
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <tr>
      {/* <td>작성자확인 {board.writer} 로그인 번호{localStorage.getItem('usercode')}</td> */}
      <td>{board.nickname}</td>
      <td>
        {board.re_level > 0 ? (
          <>
            <img
              src="/images/level.gif"
              width={20 * board.re_level}
              height="15"
            />
            <img src="/images/re.gif" />
          </>
        ) : null}

        {board.subject}
      </td>

      <td>{board.reg_date}</td>
      <td>
      {localStorage.getItem('usercode') == board.writer ? (        
      <button className="btn btn-outline-secondary btn-sm" onClick={handleDelete}>삭제</button>): null}
      </td>
    </tr>
  );
};

export default BoardComment;
