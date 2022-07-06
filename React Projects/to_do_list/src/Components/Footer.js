import React from 'react'

export default function Footer() {
  let style={
    position: "relative",
    top:"50vh",
    width:"100%",
  }
  return (
    <>
        <div className='bg-dark text-light py-3' style={style}>
          <p className='text-center' >
            Copyright &copy; MyTodoslist.com
            </p> 
        </div>
    </>
  )
}
