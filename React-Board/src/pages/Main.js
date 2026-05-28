import axios from "axios";
import React, { Component } from "react";
import { API_BASE_URL } from "../config/api";
import { Grid } from "../components/index";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    };
    this.getPosts = this.getPosts.bind(this);
    // this.getPosts();
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    const token = localStorage.getItem("token");
    console.log("[*] getPosts");
    axios.get(`${API_BASE_URL}/posts/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => {
      console.log(response.data);
      if (response.status < 300) {
        console.log(response.data.result);
        this.setState({
          posts: response.data,
        });
      }
    });
  }
  render() {
    console.log("[*] Main render");
    return (
      <div>
        <Grid posts={this.state.posts} />
      </div>
    );
  }
}

export default Main;
