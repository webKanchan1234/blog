import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../MetaData'

const NotFound = () => {
  return (
    <Fragment>
      <MetaData title="Not Found Page" />
      <div>
        <h3 style={{textAlign:"center",marginTop:"3vmax"}}>Not Found Page <br/>
        <Link to="/" style={{textAlign:"center",marginTop:"3vmax"}}>Go to Home page</Link>
        </h3>
    </div>
    </Fragment>
  )
}

export default NotFound