import React, { useState, useRef } from 'react';
import styles from './Carousel.module.css';

const Carousel = ({ images, children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [blockScroll, setBlockScroll] = useState(false);
  const sliderTrack = useRef(null);
  const imagesTotal = children.length - 1;

  let slideStep = 100 / children.length;
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

  console.log('rernder')

  const handlerScroll = (e) => {
    if (e.deltaY > 0 && !blockScroll) {
      setBlockScroll(true)
      handleNext();
      setTimeout(setBlockScroll(false), 3000)
      return;
    }
    if (e.deltaY < 0 && !blockScroll) {
      setBlockScroll(true)
      handlePrev();
      setTimeout(setBlockScroll(false), 3000)
      return
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <div className={styles.carousel}>
          <div
            className={styles.slider}
            style={{ width: `${children.length * 100}%`, touchAction: 'none' }}
            ref={sliderTrack}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchStop}
            onWheel={handlerScroll}>
            {children.map((child, index) => {
              return (
                <div key={child + index} className={styles.sliderItem}>
                  <div className={styles.sliderImageWrapper}>{child}</div>
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
          {children.map((child, index) => (
            <span
              style={{ width: `${index === selectedIndex ? children.length * 1.5 : children.length}%` }}
              onClick={() => goToIndex(index)}
              key={child + index}
              className={`${styles.dot} ${index === selectedIndex ? styles.active : ''}`}></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
