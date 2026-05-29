import React, { Component } from "react";
import { Post, Comment } from "../components/index";

class Detail extends Component {
  render() {
    const routeProps = this.props.post;  // ✅ props에서 꺼내기
    const data = routeProps.location.state?.post;  // ✅ state에서 글 데이터
    const pk = routeProps.match.params.pk;  // ✅ URL에서 pk 꺼내기 (정규식 불필요)

    console.log("[Detail.js] render()");
    console.log("routeProps:", routeProps);
    console.log("data:", data);
    console.log("pk:", pk);

    return (
      <div>
        <Post post={data} pk={pk}/>
        <hr />
        <Comment />
        <br />
      </div>
    );
  }
}

export default Detail;
