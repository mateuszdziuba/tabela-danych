import React from "react";
import Row from "./Row";
import "./UserTable.css";

class UserTable extends React.Component {
  constructor() {
    super();

    this.state = {
      nameAsc: false,
      surnameAsc: false,
      ageAsc: false,
      nameArrow: false,
      surnameArrow: false,
      ageArrow: false
    };
  }

  onNameClick = (head, order) => {
    this.setState({
      nameArrow: true,
      surnameArrow: false,
      ageArrow: false
    });
    if (!this.state.nameAsc) {
      order = "asc";
      this.setState({ nameAsc: true });
    } else {
      order = "desc";
      this.setState({ nameAsc: false });
    }
    this.props.headerClick("name", order);
  };

  onSurnameClick = (head, order) => {
    this.setState({
      nameArrow: false,
      surnameArrow: true,
      ageArrow: false
    });
    if (!this.state.surnameAsc) {
      order = "asc";
      this.setState({ surnameAsc: true });
    } else {
      order = "desc";
      this.setState({ surnameAsc: false });
    }
    this.props.headerClick("surname", order);
  };

  onAgeClick = (head, order) => {
    this.setState({
      nameArrow: false,
      surnameArrow: false,
      ageArrow: true
    });
    if (!this.state.ageAsc) {
      order = "asc";
      this.setState({ ageAsc: true });
    } else {
      order = "desc";
      this.setState({ ageAsc: false });
    }
    this.props.headerClick("age", order);
  };

  render() {
    const {
      nameAsc,
      surnameAsc,
      ageAsc,
      nameArrow,
      surnameArrow,
      ageArrow
    } = this.state;

    return (
      <div className="container table-responsive">
        <table className="table table-hover">
          <thead className="bg-primary text-white">
            <tr>
              <th onClick={this.onNameClick}>
                Imię {nameArrow ? (nameAsc ? "▲" : "▼") : ""}
              </th>
              <th onClick={this.onSurnameClick}>
                Nazwisko {surnameArrow ? (surnameAsc ? "▲" : "▼") : ""}
              </th>
              <th onClick={this.onAgeClick}>
                Wiek {ageArrow ? (ageAsc ? "▲" : "▼") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user, index) => (
              <Row key={index} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserTable;
