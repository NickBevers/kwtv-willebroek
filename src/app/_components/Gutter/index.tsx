import React, { forwardRef, Ref } from 'react'

import classes from './index.module.scss'

type Props = {
  left?: boolean
  right?: boolean
  className?: string
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
  alignContent?: 'left' | 'center' | 'right'
}

export const Gutter: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { left = true, right = true, className, children, alignContent } = props

  return (
    <div
      ref={ref}
      className={[
        classes.gutter,
        left && classes.gutterLeft,
        right && classes.gutterRight,
        className,
        alignContent && classes.align,
        classes[`align--${alignContent}`],
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
})

Gutter.displayName = 'Gutter'
