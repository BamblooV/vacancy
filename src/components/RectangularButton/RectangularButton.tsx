import React from 'react'

export type RectangularButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
}

export const RectangularButton: React.FC<RectangularButtonProps> = ({ text, ...attributer }) => {
  return (
    <button className="btn btn-submit" {...attributer}>{text}</button>
  )
}
