import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {
  render() {
    const post = this.props.post;
    console.log("[Card.js] post : ", post);
    return (
      <div className="column is-one-quarter">
        <div className="card">
          <Link
            to={{
              pathname: "/detail/" + post.pk,
              state: {post: post},
            }}
          >
            <div className="card-image">
              <figure className="image is-4by3">
                <img
                  src="https://blog.kakaocdn.net/dn/cVaw4d/btqDURwZDoX/q6XGmMMrktN33iW1v3gtMk/img.png"
                  alt="sample"
                  style={{ "objectFit": "fill" }}
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-item">
                  <div className="title is-4" size={4}>
                    {post.title}
                  </div>
                  <div className="subtitle is-6">@{post.profile.nickname}</div>
                </div>
              </div>
              <div className="content preview">
                <p>{post.body}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Card;
