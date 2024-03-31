import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './css/header.css';
const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 2, title: 'WORK', link: '/work' },
    { id: 3, title: 'SERVICES', link: '/services' },
    { id: 4, title: 'APPROACH', link: '/approach' },
    { id: 5, title: 'CARRERS', link: '/carrers' },
    { id: 6, title: 'SME Initiative', link: '/sme-initiative' },
    { id: 7, title: 'CONTACT', link: '/contact' },
  ];

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const menuButtonClassName = isMenuOpen ? 'menu-button active' : 'menu-button';

  const [menuSize, setMenuSize] = useState({ width: 0, height: 0 });
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Calculate device width and height
    const screenWidth = window.outerWidth;
    const screenHeight = window.outerHeight;
    // Set menu size based on the smaller dimension
    const menuSize = Math.max(screenWidth, screenHeight) * 2.5;
    setMenuSize({ width: menuSize, height: menuSize });
    const menuPos = Math.max(screenWidth, screenHeight) * 1.181;
    setMenuPos({ top: menuPos, right: menuPos });

    // for sticky header
    const handleScroll = () => {
      const offset = window.scrollY;
      const header = window.innerHeight;
      if (offset > header-200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  return (
    <div className="App">
      <header id="header" className={isSticky ? 'App-header sticky' : 'App-header'}>
      <h1 className='header-logo'>
        <a className="App-link" href="/" target="_self" rel="noopener noreferrer" >
          <img src={logo} className="App-logo" alt="logo" />
        </a>
      </h1>
        <div className='menu-wrap'>
            <div className={menuButtonClassName} onClick={toggleMenu}>
              <span></span>
              <span></span>
            </div>
            <div className={`menu-open ${isMenuOpen ? 'open' : ''}`} style={{ width: menuSize.width, height: menuSize.height, top: -menuPos.top, right: -menuPos.right}}></div>
            {isMenuOpen && (
              <div className='menu-detail'>
                
                <div className='menu-list-wrap d-flex'>
                  <div className='menu-about'>
                    <h3 className='about-ttl'>About</h3>
                    <p className={`about-txt fade-in-up ${isMenuOpen ? 'show' : ''}`}>Wunderfauks is an integrated creative agency focusing on new and innovative experiences. From the likes of creative expression to a campaign execution, communication and creative implementation, Wunderfauks provides tailored bulls-eye solutions that focus on results over activities.</p>
                    <p className={`about-txt fade-in-up ${isMenuOpen ? 'show' : ''}`}>With digital as our strong suit, we have a dynamic team comprising of multi-disciplinary individuals with their own think tanks of interesting ideas and concepts to suit any need, logic and aspiration.</p>
                  </div>
                  <div className='menu-right'>
                    <ul className='menu-sns-list d-flex'>
                      <li className={`fade-in-right ${isMenuOpen ? 'show' : ''}`}><a href='https://www.facebook.com/Wunderfauks/' target="_blank" rel="noopener noreferrer"><img src='/images/fb-icon.png' alt="Facebook" /></a></li>
                      <li className={`fade-in-right ${isMenuOpen ? 'show' : ''}`}><a href='https://www.facebook.com/Wunderfauks/' target="_blank" rel="noopener noreferrer"><img src='/images/ig-icon.png' alt="Instagram" /></a></li>
                      <li className={`fade-in-right ${isMenuOpen ? 'show' : ''}`}><a href='https://www.facebook.com/Wunderfauks/' target="_blank" rel="noopener noreferrer"><img src='/images/in-icon.png' alt="Linkin" /></a></li>
                    </ul>
                  <ul className="menu-txt-list">
                    {menuItems.map(item => (
                      <li key={item.id} className={`fade-in-up ${isMenuOpen ? 'show' : ''}`}>
                        <a href={item.link}>{item.title}</a>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
                <div id='menu-footer'>
                      <div className='menu-footer-inn d-flex'>
                        <p className='menu-footer-year'>&copy;2024</p>
                        <p className='menu-footer-txt'>An Integrated Creative Agency.</p>
                      </div>
                  </div>
              </div>
            )}
        </div>
      </header>
    </div>
  );
}

export default Header;
