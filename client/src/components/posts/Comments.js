import React from "react";
import moment from "moment";

const Comments = ({ comment }) => {
  const formattedDate = moment(comment.date).format("DD/MM/YYYY");

  return (
    <div className='post'>
      <div className='post-top'>
        <div className='post-info'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='88'
            height='83'
            viewBox='0 0 88 83'
          >
            <g
              id='Group_5'
              data-name='Group 5'
              transform='translate(-732 -321)'
            >
              <g
                id='Rectangle_18'
                data-name='Rectangle 18'
                transform='translate(732 321)'
                fill='#efefef'
                stroke='#2b4141'
                strokeWidth='1'
              >
                <rect width='88' height='83' rx='7' stroke='none' />
                <rect
                  x='0.5'
                  y='0.5'
                  width='87'
                  height='82'
                  rx='6.5'
                  fill='none'
                />
              </g>
              <path
                id='user'
                d='M300.131,171.821a9.99,9.99,0,0,1-2.155,6.447,6.457,6.457,0,0,1-5.189,2.689H263.344a6.457,6.457,0,0,1-5.189-2.689A9.99,9.99,0,0,1,256,171.821a49.539,49.539,0,0,1,.293-5.534,29.741,29.741,0,0,1,1.086-5.241,17.448,17.448,0,0,1,2.017-4.517,9.652,9.652,0,0,1,3.241-3.068,8.956,8.956,0,0,1,4.637-1.189,15.4,15.4,0,0,0,21.583,0,8.956,8.956,0,0,1,4.637,1.189,9.652,9.652,0,0,1,3.241,3.068,17.451,17.451,0,0,1,2.017,4.517,29.735,29.735,0,0,1,1.086,5.241A49.531,49.531,0,0,1,300.131,171.821ZM291.3,141.239a13.243,13.243,0,1,1-3.879-9.361A12.755,12.755,0,0,1,291.3,141.239Z'
                transform='translate(497.869 207.693)'
                fill='#15b097'
              />
            </g>
          </svg>
          <div className='post-info-content'>
            <h3 className='post-author'>{comment.user.name}</h3>
            <h4 className='post-date'>{formattedDate}</h4>
          </div>
        </div>
      </div>

      <textarea
        className='post-content'
        disabled
        value={comment.text}
      ></textarea>
    </div>
  );
};

export default Comments;
