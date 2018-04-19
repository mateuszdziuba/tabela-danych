import React from "react";

class Pagination extends React.Component {
  handlePage = page => {
    this.props.pageChange(page);
  };

  render() {
    const { currentPage, pageCount } = this.props;
    let startPage = 1;
    const pages = [];
    while (startPage <= pageCount) pages.push(startPage++);
    console.log(currentPage, pageCount);

    return (
      <div className="container fixed-bottom ">
        <ul className="pagination pagination-md justify-content-center">
          <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
            <a className="page-link" onClick={() => this.handlePage(1)}>Pierwsza</a>
          </li>
          <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
            <a className="page-link" onClick={() => this.handlePage(currentPage - 1)}>Poprzednia</a>
          </li>
          {pages.map((page, index) => (
            <li key={index} className={currentPage === page ? "page-item active" : "page-item"}>
              <a className="page-link" onClick={() => this.handlePage(page)}>{page}</a>
            </li>
          ))}
          <li className={currentPage === pageCount ? "page-item disabled" : "page-item"}>
            <a className="page-link" onClick={() => this.handlePage(currentPage + 1)}>Następna</a>
          </li>
          <li className={currentPage === pageCount ? "page-item disabled" : "page-item"}>
            <a className="page-link" onClick={() => this.handlePage(pageCount)}>Ostatnia</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
