import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './App.css';

function App() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      window.alert('Submitted!');
    },
    validationSchema: () => {
      return Yup.lazy(({ username }) => {
        return Yup.object().shape({
          username: String(username).match(/[a-z]/gi)
            ? Yup.string().email().required('Email or phone is required')
            : String(username).match(/[0-9]@/)
            ? Yup.string().email().required('Email or phone is required')
            : Yup.string()
                .matches(
                  /^(090|080|070|081)[0-9]{8}/,
                  'Phone number must be start with 090, 080, 081, 070, and be 11 digits.'
                )
                .required('Phone number is required'),
          password: Yup.string()
            .matches(
              /[0-9][a-zA-Z]/,
              'Password must contain lowercase letters and numbers'
            )
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        });
      });
    },
  });
  return (
    <div className='App'>
      <form onSubmit={formik.handleSubmit}>
        <h2>Welcome back</h2>
        <div>
          <label htmlFor='username'>Email or phone</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Enter email or phone'
            autoComplete='username'
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <span>{formik.errors.username}</span>
          ) : null}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            autoComplete='current-password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <span>{formik.errors.password}</span>
          ) : null}
        </div>

        <button>Login</button>
      </form>
    </div>
  );
}

export default App;
