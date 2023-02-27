import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div>제작자</div>
      <div>저작권</div>
      <div>참고API</div>
      <Link to="board" style={{ textDecoration: "none" }}>
        공지사항
      </Link>
    </div>
  );
};

export default Footer;
