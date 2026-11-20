import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    })
    const handleOnchange=(e)=>{
       const name=e.target.name;
       const value=e.target.value;
       const newdata={...formData,[name]:value};
       setFormData(newdata);
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        //api for register
        console.log(formData);
    }
  return (
    <div className="container">
        <div className="row mt-5">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="card shadow-lg bg-dark">
                    <div className="card-header">
                        <h2 className='text-center text-white'>Create Account</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleOnSubmit}>
                            <div className="form-group mb-3">
                                <label className="form-label text-white">
                                    Name
                                </label>
                                <input type="text"
                                 name='name'
                                 value={formData.name}
                                 onChange={handleOnchange}
                                 required className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label text-white">
                                    Email
                                </label>
                                <input type="email" 
                                name='email'
                                value={formData.email}
                                onChange={handleOnchange}
                                required className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label text-white">
                                    Password
                                </label>
                                <input type="password" 
                                name='password'
                                value={formData.password}
                                onChange={handleOnchange}
                                required className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <button type='submit' className="btn btn-primary">Submit</button>
                                <Link to="/login" className='mx-3 text-white'>Already have an account ?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register