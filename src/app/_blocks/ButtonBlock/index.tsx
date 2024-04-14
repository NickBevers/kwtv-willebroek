import React from 'react'

import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'

export const ButtonBlock: React.FC<{
  label: string
  href?: string
  newTab: boolean
  appearance: 'default' | 'primary' | 'secondary'
  alignment: 'left' | 'center' | 'right'
  invert?: boolean
}> = props => {
  const { label, href, newTab, appearance, alignment, invert } = props

  // eslint-disable-next-line no-console
  console.log('ButtonBlock', props?.alignment)

  return (
    <Gutter alignContent={alignment}>
      <Button
        label={label}
        href={href ?? ''}
        newTab={newTab}
        appearance={appearance}
        invert={invert}
        el="a"
      ></Button>
    </Gutter>
  )
}
