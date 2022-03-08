import React from 'react'

export default function Button({ text, handleClick, session, classes }) {
  return (
    <button
        className={ classes }
        onClick={ () => handleClick() }
        type="button"
    >{ text }</button>
  )
}
