import React from 'react'
import "./error.css"
import WifiOffIcon from '@mui/icons-material/WifiOff';

const ServerError = () => {
  return (
    <div className='common-error'>
      <WifiOffIcon/>
      <p>No Internet connection</p>
      </div>
  )
}

export default ServerError