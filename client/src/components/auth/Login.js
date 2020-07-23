import React from "react";

const Login = () => {
  return (
    <div className='login-container bg-primary'>
      <div className='login-content'>
        <h1 className='login-title'>Login</h1>
        <form className='login-form'>
          <div className='form-group'>
            <i className='fa fa-envelope icon'></i>
            <input
              className='input-field'
              type='email'
              placeholder='Email'
              name='email'
            />
          </div>

          <div className='form-group'>
            <i className='fas fa-lock icon'></i>
            <input
              className='input-field'
              type='password'
              placeholder='Password'
              name='password'
            />
          </div>
        </form>

        <div className='login-btns'>
          <button className='btn-primary btn-login'>Sign In</button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='319'
            height='99'
            viewBox='0 0 319 99'
          >
            <g
              id='Group_4'
              data-name='Group 4'
              transform='translate(-971 -775)'
            >
              <g
                id='Login_Btn'
                data-name='Login Btn'
                transform='translate(726 -13)'
              >
                <rect
                  id='Rectangle_6'
                  data-name='Rectangle 6'
                  width='319'
                  height='99'
                  rx='7'
                  transform='translate(245 788)'
                  fill='#4e73c1'
                />
              </g>
              <g id='original' transform='translate(966.17 770.17)'>
                <rect
                  id='Blue'
                  width='99'
                  height='99'
                  rx='7'
                  transform='translate(4.83 4.83)'
                  fill='#3d5a98'
                />
                <path
                  id='f'
                  d='M80.944,106.743V68.406H93.809l1.924-14.94H80.944V43.93c0-4.325,1.2-7.278,7.4-7.278H96.26V23.269A105.868,105.868,0,0,0,84.725,22.7c-11.393,0-19.24,6.943-19.24,19.75V53.466H52.62v14.94H65.485v38.337Z'
                  transform='translate(-7.814 -2.921)'
                  fill='#fff'
                />
              </g>
              <text
                id='Login_with_Facebook'
                data-name='Login with 
Facebook'
                transform='translate(1180 818)'
                fill='#fff'
                fontSize='27'
                fontFamily='Poppins-Medium, Poppins'
                fontWeight='500'
              >
                <tspan x='-71.226' y='0'>
                  Login with{" "}
                </tspan>
                <tspan x='-66.434' y='35'>
                  Facebook
                </tspan>
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Login;
