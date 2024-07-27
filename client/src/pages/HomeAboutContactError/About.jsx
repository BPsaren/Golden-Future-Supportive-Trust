import React from 'react'
import mernStackImage from "../../components/asset/landing.jpg"; // Adjust the path as necessary
export const About=()=> {
  return (
    <div>
      <h1>Hello lulu</h1>
     
      <img src={mernStackImage} alt="MERN stack" style={{ maxWidth: '100%', height: 'auto' }} />
      
    </div>
  )
}
