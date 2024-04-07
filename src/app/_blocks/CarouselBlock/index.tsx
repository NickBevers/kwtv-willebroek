'use client'
import React, { useEffect, useState } from 'react'

import type { Media as MediaType, Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'carouselBlock' }> & {
  id?: string
}

export const CarouselBlock: React.FC<Props> = ({ slides, position, height }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0)

  const handlePrev = () => {
    setActiveSlide(prev => (prev - 1 + slides.length) % slides.length)
  }

  const handleNext = () => {
    setActiveSlide(prev => (prev + 1) % slides.length)
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('activeSlide', activeSlide)
  }, [activeSlide])

  return (
    <div className={classes[position]}>
      <Gutter>
        <div
          className={classes.carousel}
          data-slide={activeSlide}
          style={height ? { maxHeight: height } : {}}
        >
          <div>
            <div className={classes.controls}>
              <svg
                onClick={handlePrev}
                className={classes.control}
                aria-label="Previous slide"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
              </svg>
              <svg
                onClick={handleNext}
                className={classes.control}
                aria-label="Next slide"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
              </svg>
            </div>
          </div>
          <div className={classes.slides}>
            {slides.map((slide, index) => (
              <div key={index} className={classes.slide}>
                <Media resource={slide.image} className={classes.image} />
                {slide.caption && (
                  <div className={classes.caption}>
                    <p>{slide.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Gutter>
    </div>
  )
}
