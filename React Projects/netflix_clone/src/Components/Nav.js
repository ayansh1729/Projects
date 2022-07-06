import React,{useEffect,useState} from "react";
import "./Nav.css";

function Nav() {
  const [show,handleShow]=useState(false);

  useEffect(() => {
    window.addEventListener("scroll",()=>{
    if(window.scrollY > 150){
      handleShow(true);
    }else handleShow(false);
  });
  
    return () => {
      window.removeEventListener("scroll",()=>{
        if(window.scrollY > 150){
          handleShow(true);
        }else handleShow(false);
      });
    };
  }, []);
  
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://pngimg.com/uploads/netflix/netflix_PNG32.png"
        alt="Netflix Logo"
      ></img>
    </div>
  );
}

export default Nav;
