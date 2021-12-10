import React from 'react';

const PostItem = (props) => {

    return (
        <div className="post">
            <div className="post__content">
                <strong>1. {props.post.title}</strong>
                <div>{props.post.text}</div>
            </div>
            <div className="post__btns">
                <button>Удалить</button>
            </div>
        </div>
    );
};

export default PostItem;