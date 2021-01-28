import React, { useState, useEffect, useRef } from 'react';
import styles from './Carousel.module.css';

const Carousel = ({ images }) => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const sliderTrack = useRef(null);
  const imagesTotal = images.length - 1;
  
  let slideStep = 100 / images.length;
  let transformTotal = 0; // to keep total translatedX value
  let transformValue = 0; // value to scroll from selected image

  let touchInitialPosition = 0;

  const handleNext = () => {
    if (selectedIndex >= 0 && selectedIndex < imagesTotal) {
      slide(selectedIndex + 1);
    } else {
      slide(0);
    }
  };

  const goToIndex = (index) => {
    //setSelectedIndex(index);
    slide(index);
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      //setSelectedIndex(selectedIndex - 1);
      slide(selectedIndex - 1);
    } else {
      //setSelectedIndex(imagesTotal);
      slide(imagesTotal);
    }
  };

  const slide = (index) => {
    setSelectedIndex(index);
    sliderTrack.current.style.transform = `translateX(-${index * slideStep}%)`;
  };

  const handleTouchStart = (e) => {
    touchInitialPosition = e.touches[0].clientX;

    const transformMatrix = window.getComputedStyle(sliderTrack.current).getPropertyValue('transform');
    if (transformMatrix !== 'none') {
      transformTotal = +transformMatrix.split(',')[4].trim();
    }
  };

  const handleTouchStop = (e) => {
    let newPosition = parseInt(e.changedTouches[0].clientX);
    const diff = newPosition - touchInitialPosition;

    // defines touch positions difference value to fire swiping | less value == easily swipe
    const scrollSpeed = 200;

    // to stay on same image if scroll speed not enough
    if (selectedIndex === imagesTotal && diff < -scrollSpeed) {
      slide(0);
      return;
    }

    if (selectedIndex === 0 && diff > scrollSpeed) {
      slide(imagesTotal);
      return;
    }

    if (diff < -scrollSpeed) {
      slide(selectedIndex + 1);
      return;
    }
    if (diff > scrollSpeed) {
      slide(selectedIndex - 1);
      return;
    } else {
      slide(selectedIndex);
      return;
    }
  };

  const handleTouchMove = (e) => {
    let newTouchPosition = parseInt(e.changedTouches[0].clientX);
    const difference = newTouchPosition - touchInitialPosition;
    // set finger-following scroll transform
    transformValue = transformTotal + difference;
    sliderTrack.current.style.transform = `translateX(${transformValue}px)`;
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <div className={styles.carousel}>
          <div
            className={styles.slider}
            style={{ width: `${images.length * 100}%`, touchAction: 'none' }}
            ref={sliderTrack}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchStop}
          >
            {images.map((i, index) => {
              return (
                <div key={i.src + index} className={styles.sliderItem}>
                  <div className={styles.sliderImageWrapper}>
                    <img src={i.src} className={styles.sliderImage} alt="image" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.arrowContainerLeft}>
            <div className={`${styles.btn} ${styles.btnPrev} ${styles.arrowLeft}`} onClick={handlePrev}></div>
          </div>
          <div className={styles.arrowContainerRight}>
            <div className={`${styles.btn} ${styles.btnNext} ${styles.arrowRight}`} onClick={handleNext}></div>
          </div>
        </div>

        <div className={styles.dots}>
          {images.map((item, index) => (
            <span
              style={{ width: `${index === selectedIndex ? images.length * 1.5 : images.length}%` }}
              onClick={() => goToIndex(index)}
              key={item.src + index}
              className={`${styles.dot} ${index === selectedIndex ? styles.active : ''}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
