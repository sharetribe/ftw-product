import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import sliderDataFromSource from './data.json';
import css from './HeroImageSlider.module.css';

interface Props {
  /** In seconds */
  slideInterval?: number;
}

const HeroImageSlider: FC<Props> = ({ slideInterval }) => {
  const sliderData = sliderDataFromSource['sliderData'];

  const imageRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rootWidth, setRootWidth] = useState(0);

  const slide = (direction: -1 | 1): void => {
    if (direction > 0) {
      if (currentIndex >= sliderData.length - 1) {
        setCurrentIndex(0);
        return;
      }
      setCurrentIndex(currentIndex + 1);
    }
    if (direction < 0) {
      if (currentIndex < 1) {
        setCurrentIndex(sliderData.length - 1);
        return;
      }
      setCurrentIndex(currentIndex - 1);
    }
  };

  const slideCallback = useCallback(slide, [currentIndex, sliderData.length]);

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
            <img src={item.imageURL} alt="Something" className={css.image} />
            <div className={css.sliderItemContent}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link to="/">{item.cta}</Link>
            </div>
          </div>
        ))}
      </div>
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
    </motion.div>
  );
};

export default HeroImageSlider;
