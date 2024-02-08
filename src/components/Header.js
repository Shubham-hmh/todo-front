import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-2">
              <h2><Link to="/" className='text-white'>Dev Zone</Link></h2>
            </div>
            <div className="col-5">
              <div><Link to="/form" className='d-flex align-items-center gap-10 text-white'>
                <p className='btn bg-white text-primary mx-2'> Add Todo <br /> </p>
              </Link>
              </div>
            </div>
          
          </div>
        </div>
      </header>

    </>
  )
}

export default Header

