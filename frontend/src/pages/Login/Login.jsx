import React from 'react'
import { useState } from 'react';
import Textinput from '../../components/TextInput/Textinput';
import loginSchema from '../../schemas/loginSchema';
import { useFormik } from 'formik';
import styles from './Login.module.css'
import {login} from '../../api/internal';
import { setUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [error, setError] = useState("");
    const handleSubmit = async () => {
        const data = {username: values.username, password: values.password};
        const response = await login(data); 
        console.log(response.data,"response");  
        
        if (response.status === 200){
            // 1. setUser
            const user = {
                _id : response.data.user._id,
                username : response.data.user.username,
                email : response.data.user.email,
                auth : response.data.auth
            }
            
            dispatch(setUser(user));
            
            // 2. Redirect to homepage
            navigate('/');
        }
        else if(response.code === 'ERR_BAD_REQUEST'){
            // 1. Display error
            setError(response.response.data.message);
        }
    }
    const { values, errors, touched, handleChange, handleBlur  } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: loginSchema
    })
  return (
    <div className={styles.loginContainer}>
        <div>Log in to your account</div>
        <Textinput 
            type="text"
            value={values.username}
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Username"
            error= {errors.username && touched.username ? 1 : undefined}
            errormessage={errors.username}
        />
        <Textinput 
            type="password"
            value={values.password}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Password"
            error= {errors.password && touched.password ? 1 : undefined}
            errormessage={errors.password}
        />
        <button onClick={handleSubmit}>Log In</button>
        <br />
        <span onClick={() => navigate('/register')}>
            Don't have an account? <button>Register</button>
        </span>
    </div>
  )
}

export default Login