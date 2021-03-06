import { useContext } from "react";
import moment from "moment";
import { Avatar } from "antd";
import renderHTML from "react-render-html";
import PostImage from "../images/PostImage";
import { HeartOutlined, HeartFilled, CommentOutlined } from "@ant-design/icons";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { imageSource } from "../../functions";

const PostPublic = ({
  post,
  handleDelete,
  deleting,
  handleLike,
  handleUnlike,
  handleComment,
  commentsCount = 10,
  removeComment,
}) => {
  const [state] = useContext(UserContext);

  const router = useRouter();
  return (
    <>
      {post && post.postedBy && (
        <div key={post._id} className="card mb-5">
          <div className="card-header">
            {/* <Avatar size={40}>{post.postedBy.name[0]}</Avatar> */}
            <Avatar size={40} src={imageSource(post.postedBy)} />
            <span className="pt-2 ms-3">{post.postedBy.name}</span>
            <span className="pt-2 ms-3">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="card-body">{renderHTML(post.content)}</div>
          <div className="card-footer">
            {post.image && <PostImage url={post.image.url} />}
            <div className="d-flex align-items-start pt-2">
              {state &&
              state.user &&
              post.likes &&
              post.likes.includes(state.user._id) ? (
                <HeartFilled className="text-danger pt-2 h5" />
              ) : (
                <HeartOutlined className="text-danger pt-2 h5" />
              )}
              <div className="pt-2 ps-1">
                {post && post.likes && post.likes.length} likes
              </div>

              <CommentOutlined className="text-danger pt-2 h5 ps-3" />
              <div className="pt-2 ps-1">
                {post && post.comments && post.comments.length} comments
              </div>
            </div>
          </div>
          {/* 2 comments */}
          {post.comments && post.comments.length > 0 && (
            <ol className="list-group scrollbar" style={{}}>
              {post.comments.slice(0, commentsCount).map((c) => {
                return (
                  <li
                    key={c._id}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div>
                        <Avatar
                          size={20}
                          className="mb-1 mr-3"
                          src={imageSource(c.postedBy)}
                        />
                        &nbsp;
                        {c.postedBy.name}
                      </div>

                      <div>
                        <i className="text-muted">{c.text}</i>
                      </div>
                    </div>
                    <span className="badge rounded-pill text-muted">
                      {moment(c.created).fromNow()}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      )}
    </>
  );
};

export default PostPublic;
