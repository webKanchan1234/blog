import React, { useEffect, useState } from 'react'
import "./gotop.css"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const GoTop = () => {
    const [isVisiblle, setIsVisiblle] = useState(false)

    const scrollUp = () =>{
        let hiddenHeight=200
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop
        if(windowScroll > hiddenHeight){
            setIsVisiblle(true)
        }else{
            setIsVisiblle(false)
        }
    }
    useEffect(() => {
      window.addEventListener("scroll",scrollUp)
    }, [])
    
    const gotop= () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
            left:0
        })
    }
  return (
    <>
    {
        isVisiblle ? <div onClick={gotop} className='gotop'><ArrowUpwardIcon id="gotop"/></div> :""
    }
    </>
  )
}

export default GoTop