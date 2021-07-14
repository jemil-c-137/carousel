import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.module.css';
import Carousel from './components/Carousel/Carousel';
import { imagesLibrary, wideImages, squareImages } from './utils/carouselData';

export const App = () => {
  return (
    <div className={styles.container}>
      <h1>Carousel demo</h1>
      <div className={styles.wrapper}>
        <div className={styles.carouselContainerOne}>
          <Carousel>
            <img src={imagesLibrary[0].src}/>
            <p>Hello</p>
            <h1>Aloha</h1>
            <div>
              <div>Hello</div>
              <div><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero numquam non vitae rerum quae eaque soluta veritatis, temporibus aliquid omnis, blanditiis vero vel magni odio quod maxime. Nam necessitatibus molestiae dicta quisquam ullam earum ducimus hic, eligendi officia illo cum itaque, et, pariatur sunt officiis facilis eum tempore. Perspiciatis, tenetur.</p></div>
              <div>Hello</div>
            </div>
          </Carousel>
        </div>
      </div>
{/* 
      <div className={styles.textContainer}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, saepe porro fugit, autem rerum nulla quod
          dolorum consectetur natus, accusantium aliquam. Numquam perspiciatis aliquid ut quo ipsam pariatur ea a
          consequatur reprehenderit debitis quidem, maiores molestias nihil? Id sit autem suscipit tempore iure facilis
          error voluptatibus excepturi maiores aperiam nulla nisi non ratione iste, odit numquam rem, corporis deserunt
          repellat totam? Corrupti odio, natus laboriosam quod accusantium voluptatibus ipsam culpa possimus explicabo
          vel inventore error recusandae id magni vero, dolore nobis! Commodi dolores eveniet pariatur, similique eaque
          ad error magnam praesentium perspiciatis quaerat soluta quidem ipsam cum assumenda nesciunt alias ratione
          repellendus enim voluptatem at dicta, labore minima. Provident eum quis sit magni voluptatem eveniet possimus
          laborum optio maiores voluptatum, illum architecto, id ea inventore delectus minima! Itaque perspiciatis natus
          nisi, officiis consectetur eveniet quae beatae excepturi maiores odio tenetur. Doloribus ipsa officia est
          assumenda eum porro maxime facilis. Sequi non dignissimos maiores soluta illo aliquid,
        </p>
        <div className={styles.carouselContainerTwo}>{<Carousel images={imagesLibrary}></Carousel>}</div>
      </div>
      <div className={styles.tripleContainer}>
        <div className={styles.carouselBox}>
          <Carousel images={squareImages} />
        </div>
        <div className={styles.carouselBox}>
          <Carousel images={imagesLibrary} />
        </div>
        <div className={styles.carouselBox}>
          <Carousel images={wideImages} />
        </div>
      </div>
       */}
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
