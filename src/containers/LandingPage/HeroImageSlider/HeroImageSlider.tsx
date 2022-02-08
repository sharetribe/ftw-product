import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import css from './HeroImageSlider.module.scss';

interface SliderElement {
  id: string;
  imageURL: string;
  alt: string;
  title: string;
  text: string;
  cta: string;
  link: string;
}

interface Props {
  sliderData: SliderElement[];
  /** In seconds */
  slideInterval?: number;
  infinite?: boolean;
}

const HeroImageSlider: FC<Props> = ({ sliderData, slideInterval, infinite = false }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rootWidth, setRootWidth] = useState(0);

  const slide = (direction: -1 | 1): void => {
    if (direction > 0) {
      if (currentIndex >= sliderData.length - 1) {
        infinite && setCurrentIndex(0);
        return;
      }
      setCurrentIndex(currentIndex + 1);
    }
    if (direction < 0) {
      if (currentIndex < 1) {
        infinite && setCurrentIndex(sliderData.length - 1);
        return;
      }
      setCurrentIndex(currentIndex - 1);
    }
  };

  const slideCallback = useCallback(slide, [currentIndex, sliderData.length, infinite]);

  useEffect(() => {
    const imageRefCurrent = imageRef.current;

    setRootWidth(imageRefCurrent.clientWidth);

    window.addEventListener('resize', () => {
      setRootWidth(imageRefCurrent.clientWidth);
    });

    const timer = slideInterval ? setInterval(() => slideCallback(1), slideInterval * 1000) : null;

    return () => {
      window.removeEventListener('resize', () => {
        setRootWidth(imageRefCurrent.clientWidth);
      });
      timer && clearInterval(timer);
    };
  }, [slideCallback, slideInterval]);

  return (
    <motion.div
      className={css.root}
      ref={imageRef}
      onPanEnd={(e, pointInfo) => {
        if (pointInfo.velocity.x > 100) {
          slide(-1);
        } else if (pointInfo.velocity.x < 100) {
          slide(1);
        }
      }}
    >
      <div className={css.imagesContainer} style={{ left: -currentIndex * rootWidth }}>
        {sliderData.map(item => (
          <div key={item.id} className={css.sliderItem}>
            <img src={item.imageURL} alt={item.alt} className={css.image} />
            <div className={css.sliderItemContent}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link to={item.link}>{item.cta}</Link>
            </div>
          </div>
        ))}
      </div>
      {sliderData.length > 1 && (
        <div className={css.controls}>
          <div className={css.controlItem} onClick={() => slide(-1)}>
            <IoIosArrowBack />
          </div>
          <div className={css.controlItem} onClick={() => slide(1)}>
            <IoIosArrowForward />
          </div>
          <div className={css.controlLinks}>
            {sliderData.map((item, index) => (
              <span
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                style={{ width: index === currentIndex ? 36 : 18 }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HeroImageSlider;
