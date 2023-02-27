import React from 'react';

const PageNavigation = (props) => {
  const { currentPage, startPage, endPage, blockPage, totalPage, getList } =
    props;

  console.log(`startPage:${startPage}  endPage:${endPage}`);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={startPage <= 1 ? 'page-item disabled' : 'page-item'}>
          <a
            className="page-link"
            onClick={() => getList(startPage - blockPage)}
          >
            &laquo;
          </a>
        </li>
        {pageNumbers.map((pnum, idx) => (
          <li
            className={currentPage === pnum ? 'page-item active' : null}
            aria-current={currentPage === pnum ? 'page' : null}
            key={pnum}
          >
            <a onClick={() => getList(pnum)}>
              <span className="page-link">{pnum}</span>
            </a>
          </li>
        ))}

        <li
          className={endPage >= totalPage ? 'page-item  disabled' : 'page-item'}
        >
          <a
            className="page-link"
            onClick={() => getList(startPage + blockPage)}
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigation;
