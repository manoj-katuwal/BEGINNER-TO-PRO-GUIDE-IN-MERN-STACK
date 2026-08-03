import React from 'react'

const Button = ({bg,name }) => {
  return (
    <div>
      <button className={`bg-${bg}`}>{name}</button>
    </div>
  )
}

export default Button
