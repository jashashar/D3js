import React from 'react'
import logo from '../assets/logo.png';
import cart from '../assets/cart-3-svgrepo-com.svg';
import mail from '../assets/mail-svgrepo-com.svg';
import phone from '../assets/phone-svgrepo-com.svg';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className='bg-[#037ad1] text-white'>
      <div className='container px-[15px] pt-2'>

        <div className='level-one text-right text-xs mb-[10px]'>
          <div className='gap-5 flex justify-end'>
            <a href="#">Custom Links</a>
            <a href="#">Custom Blocks</a>
            <a href="#">Wish List(0)</a>
            <a href="#">Checkout</a>
            <a href="#">USD</a>
            <a href="#">Login</a>
            <a href="#">Register</a>
          </div>
        </div>
        <div className='level-two flex justify-between py-1'>
          <div className="logo relative bottom-[10px]">
            <img src={logo} alt="Main Logo" />
          </div>
          <div className="search w-[41%] relative">
            <input type="search" className='rounded h-9 pl-[10px] pr-9 w-full' placeholder='search'/>
            <button className='absolute w-9 h-9 text-[14px] flex justify-center right-0 top-0 bg-[#fdd922] rounded-r'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="36" viewBox="0 0 50 50">
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
              </svg>
            </button>
          </div>
          <div className='flex flex-col items-end'>
            <div className="telephone flex items-center gap-2">
              <p className='flex gap-1'>
              <img className='w-3' src={phone} />
              <a href="tel:+91 98989898">+91 98989898</a>
              </p>
              <div className="email">
                <a className='flex gap-1' href="mailto:support@gmail.com">
                  <img className='w-3' src={mail} />
                  
                  <p>support@bigshop.com</p>
                </a>
              </div>
            </div>
            <div className='pb-[2px] pt-3'>
              <p className='flex gap-2'>
                <img className='w-7' src={cart} />
                <span>0 item(s) - $0.00</span>
              </p>
            </div>
          </div>
        </div>
      </div>
        <div className='level-three bg-[#006eb7]'>
          <nav className='py-2 container text-[15px] px-4'>
            <ul className='flex gap-4'>
              <li><Link to='/'>HOME</Link></li>
              <li><Link to='/aboutus'>ABOUT US</Link></li>
              <li><Link to='/charts/bar'>BAR</Link></li>
              <li><Link to='/charts/pie'>PIE</Link></li>
              <li><Link to='/charts/line'>LINE</Link></li>
              <li><Link to='/charts/testbar'>TEST BAR</Link></li>
              <li><Link to='/charts/testline'>TEST LINE</Link></li>
              <li><Link to='/charts/testpie'>TEST PIE</Link></li>
            </ul>
          </nav>
        </div>
    </header>
  )
}

export default Header;
