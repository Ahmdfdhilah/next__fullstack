"use client";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

const Cart = () => {

  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem("data")) || []);
  const [isCart, setIsCart] = useState(basket.length != 0 ? true : false);
  const [sum, setSum] = useState(basket.length != 0 ? basket.map((x) => x.total * x.price).reduce((x, y) => x + y, 0) : 0);
 
  useEffect(() => {
    setIsCart(basket.length != 0 ? true : false);
    setSum(basket.map((x) => x.total*x.price).reduce((x, y) => x + y, 0))
  }
    , [basket])

  return (
    <div className={styles.container}>
      {
        <div className={styles.basket__container}>{
          basket.map((x) => {
            return (
              <div className={styles.card}>
                <div className={styles.card__image}>
                  <img src={`/${x.img}`} />
                </div>
                <div className={styles.card__content}>
                  <div className={styles.card__content__tag}>
                    <span className={styles.tag}>{x.id}</span>
                  </div>
                  <div className={styles.card__content__tag}>
                    <span className={styles.tag}>Quantities : {x.total}</span>
                  </div>
                  <p className={styles.card__content__title}>{x.name}</p>
                  <p className={styles.card__content__info}>
                    {x.description}
                    Sed aliquyam elitr dolore erat consetetur est clita at laoreet
                    est iriure clita. Placerat amet eleifend lorem ea facilisi et
                    erat sed amet sed tincidunt ipsum feugiat duis et consetetur
                    ipsum lorem. Diam lobortis stet lorem invidunt duis amet et
                    sadipscing nonumy invidunt. Justo stet est tation suscipit eos
                    sit et enim ipsum et dolor suscipit.
                  </p>
                  <div className={styles.card__content__config}>
                    <div className={styles.price}>
                      <span className={styles.price}>Rp {x.price * x.total}</span>
                      {/* <span className={styles.prev_price}>$350</span> */}
                    </div>
                    <div className={styles.colors}>
                      <span className={`${styles.color} ${styles.color1}`}></span>
                      <span className={`${styles.color} ${styles.color2}`}></span>
                      <span className={`${styles.color} ${styles.color3}`}></span>
                    </div>
                  </div>
                  <div className={styles.card__content__action}>
                    <button className={styles.cart} onClick={() => {
                      const temp = basket.filter(y => y.id != x.id);
                      const sum = temp.map((x) => x.total).reduce((x, y) => x + y, 0);

                      localStorage.setItem('data', JSON.stringify(temp));
                      localStorage.setItem("totals", JSON.stringify({
                        total: sum
                      }));
                      setBasket(temp)
                    }}>
                      <BsFillTrashFill />
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        }</div>
      }
      {
        isCart ? (
          <div className={styles.payment__container}>
            <div className={styles.payment__wrapper}>
              <h1 className={styles.cart__total}>Sub total : {sum}</h1>
            </div>
          </div>
        ) : (
          <h2>no</h2>
        )
      }
    </div>
  );
};

export default Cart;