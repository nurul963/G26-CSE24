import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="container">
        <div className="row mt-5">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="card shadow-lg bg-dark">
                    <div className="card-header">
                        <h2 className='text-center text-white'>Login Form</h2>
                    </div>
                    <div className="card-body">
                        <form >
                            
                            <div className="form-group mb-3">
                                <label className="form-label text-white">
                                    Email
                                </label>
                                <input type="email" required className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label text-white">
                                    Password
                                </label>
                                <input type="text" required className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <button type='submit' className="btn btn-success">Submit</button>
                                <Link to="/register" className='mx-3 text-white'>New User ?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login