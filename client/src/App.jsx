import React, { Component } from "react";
import "./App.css";
import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import { debounce } from "lodash";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      pageCount: "",
      currentPage: "",
      searchfield: "",
      head: "",
      order: ""
    };
    this.onSearchChange = debounce(this.onSearchChange, 400);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    fetch("https://tabeladanych.herokuapp.com/api/")
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data.data,
          pageCount: data.pageCount,
          currentPage: data.page
        })
      );
  }

  onSearchChange = event => {
    this.setState(
      {
        searchfield: event.target.value
      },
      () => {
        fetch("https://tabeladanych.herokuapp.com/api/", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            searchfield: this.state.searchfield
          })
        })
          .then(response => response.json())
          .then(data =>
            this.setState({
              users: data.data,
              pageCount: data.pageCount,
              currentPage: data.page
            })
          );
      }
    );
  };

  search(e) {
    e.persist();
    this.onSearchChange(e);
  }

  onPageChange = (currentPage) => {
    this.setState({ currentPage }, () => {
      fetch("https://tabeladanych.herokuapp.com/api/", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          head: this.state.head,
          order: this.state.order,
          currentPage: this.state.currentPage,
          searchfield: this.state.searchfield
        })
      })
        .then(response => response.json())
        .then(data =>
          this.setState({
            users: data.data,
            pageCount: data.pageCount,
            currentPage: data.page
          })
        );
    });
  };

  onHeaderClick = (head, order) => {
    this.setState({
      head,
      order
    });
    fetch("https://tabeladanych.herokuapp.com/api/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        head,
        order,
        searchfield: this.state.searchfield
      })
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data.data,
          pageCount: data.pageCount,
          currentPage: data.page
        })
      );
  };

  render() {
    const { users, pageCount, currentPage } = this.state;

    return (
      <div>
        <SearchBar searchChange={this.search} />
        <UserTable headerClick={this.onHeaderClick} users={users} />
        <Pagination
          pageChange={this.onPageChange}
          pageCount={pageCount}
          currentPage={currentPage}
        />
      </div>
    );
  }
}
export default App;
