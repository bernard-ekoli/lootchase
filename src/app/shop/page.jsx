"use client";
import React, { useEffect, useRef, useState } from 'react';
import { cloneIphones } from '../items/clones/iphones/Iphone';
import '@/css/shop.css'
import { useRouter } from 'next/navigation';
const SearchBar = () => {
  const individualItem = useRef(null)
  const router = useRouter()
  const [ddSF, setDdsf] = useState(true)
  const [showCart, setShowCart] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const ClonedPhones = [...cloneIphones]
  const [cart, setCart] = useState([]);
  const [closeIndividual, setCloseIndividual] = useState("");
  const [displayItem, setDisplayItem] = useState("")
  const [activeImg, setActiveImg] = useState(0)
  const [color, setColor] = useState(0)
  const [spinner, setSpinner] = useState(false)
  const [showcartBut, setShowCartBut] = useState(true)
  const [showquantityIcons, setshowquantityIcons] = useState(false)
  const [quantity, setQuantity] = useState(0)
  useEffect(() => {
    const products = document.getElementsByClassName('products')[0]
    const leftSlide = document.getElementsByClassName('leftSlide')[0]
    const rightSlide = document.getElementsByClassName('rightSlide')[0]
    leftSlide.addEventListener("click", () => {
      products.scrollBy({ left: -200, behavior: "smooth" });
    });
    rightSlide.addEventListener("click", () => {
      products.scrollBy({ left: 200, behavior: "smooth" });
    });
    console.log(cart)
  }, [])
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []); // Empty dependency array to make sure it runs only once
  function showSpinner() {
    setShowCartBut(false)
    setSpinner(true)
    setTimeout(() => {
      setSpinner(false)
      setshowquantityIcons(true)
    }, 500)
  }
  function addtocart(product) {
    let updatedCart = [...cart]; // Always keep cart as an array

    // Check if product already exists in cart
    let cartItem = updatedCart.find((item) => item.id === product.id);
    if (cartItem) {
      cartItem.quantity += product.quantity; // Increase quantity
    } else {
      updatedCart.push({ ...product, quantity: product.quantity }); // Add new product
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    console.log("Updated Cart:", updatedCart);
  }


  const handleSearch = () => {
    if (searchQuery) {
      // Check if the search query partially matches any iPhone name
      const matches = ClonedPhones.filter((phone) =>
        phone.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(matches); // If matches are found, `results` will be an array; otherwise, empty
    } else {
      setResults([])
    }
  };
  function searchClick() {
    handleSearch()
    console.log(searchQuery)
  }
  function tfdds() {
    setDdsf(true)
  }

  function uploadToItem(id) {
    let newCart = [...cart]
    let newItem = ClonedPhones[id];
    setDisplayItem(newItem);
    setCloseIndividual(false);

    let cartItem = newCart.find((item) => {
      return (
        newItem.id === item.id
      )
    })
    if (cartItem) {
      setSpinner(false)
      setshowquantityIcons(true)
      setShowCartBut(false)
      setQuantity(cartItem.quantity)
    } else {
      console.log("item not in cart")
      setSpinner(false)
      setshowquantityIcons(false)
      setShowCartBut(true)
    }
  }
  function incrementCart(id) {
    let newCart = [...cart];
    let cartItem = newCart.find((item) => item.id === id);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      console.error("Item not found in cart");
      return;
    }

    setCart(newCart);
    setQuantity(cartItem.quantity)
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
  async function decrementCart(id) {
    let newCart = [...cart];
    let cartItem = newCart.find((item) => item.id === id);

    if (cartItem) {
      if (cartItem.quantity > 1) {
        // Reduce quantity if it's greater than 1
        cartItem.quantity -= 1;
      } else {
        // Remove item if quantity is 1
        newCart = newCart.filter((item) => item.id !== id);
      }
    } else {
      console.error("Item not found in cart");
      return;
    }

    setCart(newCart);
    setQuantity(cartItem ? cartItem.quantity : 0); // Update quantity state safely
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function close() {
    setCloseIndividual(true)
    if (closeIndividual) {
      individualItem.classList.add("closeInd")
    }
  }

  const removeFromCart = async (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  function checkDeliveryDate(orderDate) {
    let ordersDate = new Date(orderDate); // Ensure it's a Date object

    if (isNaN(ordersDate.getTime())) {
      throw new Error("Invalid date format");
    }

    const twoWeeksLater = new Date(ordersDate); // Clone the date
    twoWeeksLater.setDate(ordersDate.getDate() + 14); // Add 14 days
    return twoWeeksLater;
  }


  return (
    <>
      <div id='shop'>
        <div id="searchSection" className={ddSF ? 'removeSearchField' : ''}>
          <div id="topSS">
            <div className="back" onClick={
              tfdds}>
              {'<'}
            </div>
            <div id="searchField">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value) }}
                onKeyDown={handleSearch} />
              <button onClick={searchClick}>
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div id="suggestions">
            {results.map((products, index) => {
              return (
                <div id="products-element" key={index}>
                  <div id="product-image">
                    <img src={products.allImg[0].src} alt="" />
                  </div>
                  <div id="price">
                    Price: N<em>{products.price}</em>
                  </div>
                  <div id="product-name">
                    {products.name}
                  </div>
                  <div id="ratings">
                    Rating:<em>{products.rating}</em>
                  </div>
                  <div id="product-button">
                    <button onClick={() => addTocart(index, products.name, products.id)}>Add to cart</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <header>
          <div className="lootLogo">
            <svg version="1.1" viewBox="0 0 2000 2000" width="500" height="500" xmlns="http://www.w3.org/2000/svg">
              <path transform="translate(634,450)" d="m0 0 27 8 26 10 25 12 27 14 25 15 14 10 25 20 13 10 14 12 13 12 31 29 2 1v2l4 2 14 13 14 11 17 13 15 9 17 8 17 5 13 2h31l17-3 18-6 17-8 18-11 17-13 10-8 13-11 10-8 11-9 10-10 8-7 10-9 14-11 18-14 14-11 12-10 17-11 20-12 17-10 15-8 30-15 26-10 10-3 10 11 13 17 26 32 13 17 7 11 18 27 11 18 12 20 8 14 8 16 15 33 9 24 10 26 8 27 8 39 4 28 2 24 1 19v24l-3 44-5 32-6 30-9 31-17 46-12 28-12 25-14 26-10 16-13 21-11 17-9 14-11 15-10 12-10 13-10 14-11 13-9 11-8 9-24-5-28-7-27-9-24-11-15-8-21-16-12-11-8-8-9-11-7-9-10-19-8-21-5-19-3-18-1-11v-37l2-19 4-26 1-2h-340l2 5 4 28 1 11v43l-3 23-6 24-9 22-8 15-11 14-11 12-4 5-8 7-18 14-15 9-25 12-22 8-30 8-29 6-5-1-9-11-11-13-13-17-8-11-11-13-14-19-15-24-14-22-12-19-18-34-11-24-11-27-10-27-10-30-6-24-7-41-3-29-1-15v-43l2-28 5-35 6-29 7-27 11-30 12-31 11-24 12-25 11-20 7-10 9-16 13-20 12-17 12-18 9-11 11-13 13-17 9-11 8-10 5-6zm567 118-13 10-10 9-8 8-8 7-15 13-16 13-10 8-13 11-18 12-21 11-20 8-21 5-18 2h-18l-22-3-20-6-21-10-15-9-11-8-11-9-13-12-10-9-11-9-12-11-10-9-19-19-6 1-10 7-14 11-20 13-16 9-32 17-25 13-31 13-19 7-36 12-38 10-44 10-29 5-2 2-12 37-10 40-4 17-3 21-3 38v34l3 37 4 26 10 42 9 30 7 21 12 30 4 3 33 6 60 16 43 14 28 11 16 7 17 8 16 9 23 12 21 12 15 10 8 6 3-1 9-17 5-11 5-17 4-24 1-12v-27l-2-23-6-36-2-10h379l-5 22-4 26-2 26v21l3 26 5 22 5 13 12 22 7 11 2 1 8-7 12-9 19-12 32-18 44-23 29-12 39-14 26-8 46-12 17-4 5-5 10-23 10-28 10-32 12-50 4-29 2-23v-52l-3-32-4-25-13-52-10-31-4-3-37-8-44-11-29-9-37-13-28-12-21-11-17-8-46-26-17-12-15-12-8-6z" fill="#025B7A" />
              <path transform="translate(1326,710)" d="m0 0h29l18 3 18 6 16 8 15 10 10 9 8 9 11 16 8 15 6 18 3 16 1 10v16l-2 17-4 16-6 15-8 14-11 16-13 13-17 11-16 8-13 5-18 4-8 1h-27l-21-4-19-7-16-9-13-10-12-11-6-7-10-15-9-19-6-21-2-15v-20l3-18 4-15 5-12 8-15 10-13 9-10 13-11 14-9 17-8 18-5zm-10 37-1 63-67 1v47l68 1v67l1 3h49v-70h67v-49l-66-1-1-62z" fill="#025B7A" />
              <path transform="translate(651,708)" d="m0 0h17l21 3 17 5 17 8 13 9 10 8 9 8 12 16 9 15 6 15 4 15 2 12v32l-2 13-5 17-7 16-16 24-8 8-14 11-14 9-12 6-14 5-20 4-11 1h-15l-17-2-15-4-15-6-17-9-11-8-10-9-8-9-14-22-8-19-4-15-2-15v-24l3-19 5-16 5-12 11-18 9-11 7-8 12-10 17-10 19-8 16-4zm-2 12-12 5-8 7-6 8-3 9-1 6v8l4 13 6 9 7 6 13 5 4 1h11l10-3 10-6 8-9 5-10 1-4v-14l-3-9-9-12-8-6-11-4zm-80 79-9 4-8 7-6 7-4 8-2 8v11l3 10 6 10 7 7 11 5 4 1h16l11-4 8-6 6-7 5-13 1-5v-8l-3-11-6-10-8-8-9-5-4-1zm167-1-11 2-10 6-9 10-4 8-2 6v15l5 14 7 9 9 6 9 3h16l12-4 9-7 5-7 5-14v-13l-3-10-7-11-9-8-11-4zm-84 81-10 3-10 6-7 8-4 9-2 9v8l3 11 5 9 5 5 7 5 12 4h15l11-4 6-4 8-8 5-8 2-7v-15l-4-10-8-10-9-7-11-4z" fill="#025B7A" />
              <path transform="translate(1076,719)" d="m0 0h51l26 3 17 3 3 2 1 14 1 28 1 15-9-1-23-5-14-2h-30l-19 4-13 5-11 7-10 10-8 14-5 13-2 10-1 11v13l2 14 5 14 7 11 8 7 16 9 9 3 8 1h27l43-1 13-1v15l-2 35-1 5h-141l-16-8-14-8-10-8-10-9-9-11-8-16-4-11-4-16-2-13v-37l3-19 6-21 8-17 7-9 11-13h2l2-4 4-4h2l1-3 15-10 14-7 19-6 18-4z" fill="#025B7A" />
              <path transform="translate(836,707)" d="m0 0h75v12l-2 23-2 36-1 27-2 29-1 34v54h16l33 1 3 4 8 16 6 9 10 9 16 11 1 3h-172l2-23 4-54 2-45 1-31 2-106z" fill="#025B7A" />
              <path transform="translate(1105,1407)" d="m0 0h3l-1 29-2 42 9-16 4-5 10-6 4-1h12l8 3 6 8 1 3v23l-3 26 1 8 4 1 7-10 4-1v6l-5 10-9 10-7 3h-10l-8-3-6-7-2-9v-10l4-37v-6l-2-3h-5l-3 1-2 4-6 13-4 14-3 18-1 21-6 1h-21l-2-1v-12l4-101v-2l-9-3-2-1 1-5 21-2z" fill="#025B7A" />
              <path transform="translate(994,1409)" d="m0 0h21l18 3 11 1 4-4h4l1 10v34l-4-2-8-18-7-8-12-6-3-1h-11l-10 5-7 7-7 13-4 16-1 7v20l3 14 5 12 9 10 9 5 4 1h13l11-4 9-7 6-9 6 1 1 1v5l-7 10-8 8-12 5-10 2h-20l-16-4-14-7-10-9-6-7-8-16-3-11-1-14 2-16 6-15 7-10 10-10 11-7 11-4z" fill="#025B7A" />
              <path transform="translate(560,1412)" d="m0 0h67v3l-10 5-4 5-2 35-2 42v22l2 4 3 1h23l13-4 10-7 6-8 4-9 1-1h5v10l-3 26-8 1h-60l-47-1 1-4 9-3 3-5 2-27 2-43v-30l-6-5-9-4z" fill="#025B7A" />
              <path transform="translate(1215,1450)" d="m0 0h10l8 3 6 7 2-7h26l1 3-3 52v13l1 2 5-1 7-10 3 1v7l-7 12-8 7-4 1h-12l-8-4-3-5-2-10-8 11-7 6-6 2h-12l-10-4-5-4-6-11-2-9v-16l3-13 8-16 6-7 11-8zm10 10-6 7-5 15-3 16v14l2 7 5 5h6l7-8 3-9 3-20v-16l-2-7-4-4z" fill="#025B7A" />
              <path transform="translate(818,1450)" d="m0 0h16l10 3 10 6 2 4h2l6 9 3 8 1 13-3 14-5 10-9 12-8 6-9 4-6 1h-16l-13-4-9-7-7-11-4-12v-11l3-12 8-16 6-7 11-7zm5 7-6 5-3 8-3 14-1 10v21l2 10 4 6 4 2 6-1 4-4 4-13 2-10 1-12v-16l-2-11-5-8z" fill="#025B7A" />
              <path transform="translate(723,1450)" d="m0 0h15l11 3 8 4 5 4 7 11 3 10 1 10-2 12-5 12-7 11-7 6-8 4-11 3h-16l-12-4-8-6-7-8-4-8-2-10v-9l4-15 6-11 8-9 9-6 7-3zm4 7-5 5-4 10-3 19v27l4 11 3 3 7 1 5-4 4-10 3-16v-32l-3-9-5-5z" fill="#025B7A" />
              <path transform="translate(1404,1450)" d="m0 0h16l9 3 6 4 5 8 1 4v8l-4 8-7 7-10 5-17 5-6 1 1 10 4 8 5 3 2 1h11l8-5 4-5 4-4h4l-1 9-3 6-8 9-9 4-5 1h-16l-13-4-8-7-6-8-4-10-1-6v-10l3-13 7-14 10-10 8-5zm4 7-5 4-4 8-3 15v10l6-1 8-6 6-8 2-6v-7l-4-8z" fill="#025B7A" />
              <path transform="translate(1309,1450)" d="m0 0h14l10 2 7 2 6-4h2l1 2 1 16v13h-3l-10-16-1-3-4-2-5-2h-6l-3 2v7l5 9 19 19 6 9 3 6 1 5v7l-3 8-5 6-10 4h-14l-17-5-5 2-5 1-2-4-1-27 1-3 5 2 8 16 7 7 9 3 6-1 2-4-1-9-7-9-21-21-6-10-1-3v-11l4-8 6-4z" fill="#025B7A" />
              <path transform="translate(911,1427)" d="m0 0 5 1v12l-1 12 14 1 2 1-1 6-15 1-2 28-1 30 1 4h6l4-5 4-7h4l1 4-7 14-4 5-12 6h-12l-8-4-4-6-2-8v-15l3-47h-10l-1-4 3-3 10-5 9-7 8-12z" fill="#025B7A" />
            </svg>
            <span>LootChase</span>
          </div>
          <div className="search">
            <input type="text" />
            <button>
              <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div id='centerHead'>
            <nav>
              <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </nav>
            <nav onClick={() => { setShowCart(true) }}>
              <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <button id='cartButItems'>{cart.length > 0 ? cart.length : '0'}</button>
            </nav>

            <nav className='special'>
              <svg width="800px" height="800px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" >

                <path d="M0 0h48v48H0z" fill="none" />
                <g id="Shopicon">
                  <path d="M31.278,25.525C34.144,23.332,36,19.887,36,16c0-6.627-5.373-12-12-12c-6.627,0-12,5.373-12,12
          c0,3.887,1.856,7.332,4.722,9.525C9.84,28.531,5,35.665,5,44h38C43,35.665,38.16,28.531,31.278,25.525z M16,16c0-4.411,3.589-8,8-8
          s8,3.589,8,8c0,4.411-3.589,8-8,8S16,20.411,16,16z M24,28c6.977,0,12.856,5.107,14.525,12H9.475C11.144,33.107,17.023,28,24,28z"
                  />
                </g>
              </svg>
            </nav>
          </div>
        </header>
        <div id="mainElements">
          <div id="firstMainElement">
            <section>
              <nav>
                <span>
                  CLONED PHONES
                </span>
              </nav>
              <nav>
                <span>
                  Phones
                </span>
              </nav>
            </section>
            <section>
              <div>
                <img className='grow-shrink' src="/30Promo.jpeg" alt="" />
              </div>
              <section>
                <nav>
                  <span>Gaming Accessories and many more {'>>>'}</span>
                </nav>
              </section>
            </section>
            <section>
              <nav>
                <span>
                  Game Currencies
                </span>
              </nav>
              <nav>
                <span>Game Accounts For Sell</span>
              </nav>
            </section>
          </div>
          <section className='clonedPhones'>
            <h2>Cloned Phones</h2>
            <button className='leftSlide'>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
            </button>
            <div id="products" className='products'>
              {ClonedPhones.map((products, index) => {
                return (
                  <div id="products-element" key={index}>
                    <div id="product-image" onClick={() => { uploadToItem(index, products.id) }}>
                      <img src={products.allImg[0].src} alt="" />
                    </div>
                    <div id="productDetails">
                      <div id="product-name">
                        {products.name}
                      </div>
                      <div id="ratings">
                        Rating: <em>{products.rating}</em>
                      </div>
                      <div id="price">
                        Price: N<em>{products.price}</em>
                      </div>
                      <div id="product-button" onClick={() => { uploadToItem(index) }}>
                        <button>Buy Now</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <button className='rightSlide'>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
            </button>
          </section>
        </div>
        <div id="cart" className={showCart ? "flyIn" : "flyOut"}>
          <div id="cartHead">
            <span onClick={() => { setShowCart(false) }}>{'<'}</span>
            <span>Cart</span>
          </div>
          <div id="cartItems">
            <div id="fCartItems">
              {
                cart.length === 0 ? "Cart is empty" : cart.map((items, index) => {
                  return (
                    <div id="items" key={index}>
                      <div id="itemsImg">
                        <img src={items.image.src} alt="" />
                      </div>
                      <div id="itemsText">
                        <span>{items.name}</span>
                        <span>N{items.price}</span>
                        <span>Quantity: <b>{items.quantity}</b></span>
                        <span><button onClick={() => removeFromCart(items.id)}>Remove</button></span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div id="checkOutParent">
              <div id="checkoutButton" onClick={() => {
                checkout()
              }}>Checkout</div>
            </div>
          </div>
        </div>
      </div>
      {displayItem === "" ? "" :
        <div ref={individualItem}
          id="individualItem" className={!closeIndividual ? "flyIn" : ""}>
          <div id="closeIT" onClick={close}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="m136-80-56-56 264-264H160v-80h320v320h-80v-184L136-80Zm344-400v-320h80v184l264-264 56 56-264 264h184v80H480Z" /></svg>
          </div>
          <div id="itemPic">
            <div id="imgDiv">
              <div id="bigImage">
                <img src={displayItem.allImg[activeImg].src} alt="" />
              </div>
              <div id="smallImages">
                {displayItem.allImg.map((image, index) => (
                  <div id="siDIv" key={index} onClick={() => setActiveImg(index)} style={{ border: activeImg === index ? "2px solid black" : "none" }}>
                    <img src={image.src} alt={`Image ${index}`} />
                  </div>
                ))}

              </div>

            </div>
            <div id="itemDetails">
              <section>
                <span className='itemDes'>
                  <span className='name'>{displayItem.name}</span>
                  <span className='itemRatings'>{displayItem.rating}</span>
                  <span className='specs'>{displayItem.specifications}</span>
                </span>
              </section>
              <h1>Colors</h1>
              <section className='addToCart'>
                <section>
                  {displayItem.colorsImg.map((image, index) => {
                    return (
                      <div id="atcImage" key={index}>
                        <span>{displayItem.colors[index]}</span>
                        <div id="theImage" onClick={() => setColor(index)} style={{ border: color === index ? "2px solid black" : "none" }}>
                          <img src={image.src
                          } alt="" />
                        </div>
                      </div>
                    )
                  })}
                </section>
                <section className='storage'>
                  <h1>Storage</h1>
                  ROM : <button>{displayItem.storage}</button>
                  RAM : <button>{displayItem.ram}</button>
                </section>
                <section className='atc'>
                  <h1>N{displayItem.price}</h1>
                  <span>
                    <button onClick={() => {
                      showSpinner()
                      addtocart({
                        id: displayItem.id,
                        name: displayItem.name,
                        quantity: 1,
                        color: displayItem.colors[color],
                        ram: displayItem.ram,
                        rom: displayItem.storage,
                        image: displayItem.allImg[0],
                        price: displayItem.price
                      })
                    }}
                      id='atcButton'
                      style={{ display: showcartBut ? "block" : "none" }}
                    >Add to cart</button>
                    <button id="spinner" style={{ display: spinner ? "flex" : "none" }}></button>
                    <div id="quantitySec" style={{ display: showquantityIcons ? "flex" : "none" }}>
                      <button onClick={() => {
                        decrementCart(displayItem.id)
                      }}>-</button>
                      <span>{quantity}</span>
                      <button onClick={
                        () => {
                          incrementCart(displayItem.id)
                        }
                      }>+</button>
                    </div>
                  </span>
                </section>
              </section>
            </div>
          </div>
        </div>}
    </>
  );
};

export default SearchBar;