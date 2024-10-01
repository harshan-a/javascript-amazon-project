import {cart} from '../../data/cart-class.js'
import {Search} from '../../data/search.js';
import {getKeywordsList} from '../../data/products.js';

export function renderHeader() {
  const cartQuantity = cart.calculateCartQuantity();

  const url = new URL(window.location.href);
  const searchQuery = url.searchParams.get('search_query');

  const keywordsList = getKeywordsList();
  const searchObj = new Search(keywordsList);


  const headerHTML = `
    <div class="amazon-header-left-section">
      <a href="amazon.html" class="header-link">
        <img class="amazon-logo"
          src="images/amazon-logo-white.png">
        <img class="amazon-mobile-logo"
          src="images/amazon-mobile-logo-white.png">
      </a>
    </div>

    <div class="
      amazon-header-middle-section 
      js-amazon-header-middle-section
    ">
      <input class="search-bar js-search-bar" placeholder="Search"
        value="${searchQuery || ''}" >

      <button class="search-button js-search-button">
        <img class="search-icon" src="images/icons/search-icon.png">
      </button>

    </div>

    <div class="amazon-header-right-section">
      <a class="orders-link header-link" href="orders.html">
        <span class="returns-text">Returns</span>
        <span class="orders-text">& Orders</span>
      </a>

      <a class="cart-link header-link" href="checkout.html">
        <img class="cart-icon" src="images/icons/cart-icon.png">
        <div class="cart-quantity js-cart-quantity">
          ${cartQuantity}
        </div>
        <div class="cart-text">Cart</div>
      </a>
    </div>
  `;

  const headerElem = document.querySelector('.js-amazon-header');
  headerElem.innerHTML = headerHTML;

  const searchBtnElem = document.querySelector('.js-search-button');
  searchBtnElem.addEventListener('click', () => {
      searchEventDone();
    });

  const searchBarElem = document.querySelector('.js-search-bar');

  const searchBarFocusInFunc = (event) => {
    searchFocusEvent(event.type);

    const value = event.target.value.trim(); // event.target.value gives the value in the input bar.

    if(value !== '')
      renderSearch(value);

  };
  searchBarElem.addEventListener('focusin', searchBarFocusInFunc);  

  const searchBarFocusOutFunc = (event) => {
    searchFocusEvent(event.type);
  };
  searchBarElem.addEventListener('focusout', searchBarFocusOutFunc);  
  
  searchBarElem.addEventListener('keyup', (event) => {

      const value = event.target.value.trim();

      if(event.key === 'Enter'){
        searchEventDone();

      } else {
        renderSearch(value);
      }
    });  



  function searchEventDone() {
    const inputElem = document.querySelector('.js-search-bar');
    const value = inputElem.value.trim();

    //trim() method is used to remove space from both side of the string.

    if(value !== '') {
      window.location.href = `amazon.html?search_query=${value}`;

    } else {
      window.location.href = 'amazon.html';
    }
  };




  function searchFocusEvent(param) {
    const mainElem = document.querySelector(
      '.js-main'
    );
    const midSecContainer = document.querySelector(
      '.js-amazon-header-middle-section'
    );

    
    if(param === 'focusin') {
      const searchListElem = document.createElement('div');
      searchListElem.classList.add('search-list-container');  

      const searchListOnElem = document.createElement('div');
      searchListOnElem.classList.add('main-search-on');
  

      midSecContainer.appendChild(searchListElem);
      mainElem.appendChild(searchListOnElem);

      searchListElem.addEventListener('mouseenter' , () => {
        searchBarElem.removeEventListener('focusout', searchBarFocusOutFunc);
      })

      searchListElem.addEventListener('mouseout' , () => {
        searchBarElem.addEventListener('focusout', searchBarFocusOutFunc);
      })
  
    } else if(param === 'focusout') {
      const searchListElem = document.querySelector(
        '.search-list-container'
      );
      const searchListOnElem = document.querySelector(
        '.main-search-on'
      );

      if(searchListElem) 
        searchListElem.remove();
      
      if(searchListOnElem) 
        searchListOnElem.remove();

      midSecContainer.classList.remove('amazon-header-middle-section-search-on');
    };
  };


  function renderSearch(intputValue) {
    const value = intputValue.toLowerCase();
    const midSecContainer = document.querySelector(
      '.js-amazon-header-middle-section'
    );

    const searchListGrid = document.createElement('div');
    searchListGrid.classList.add('search-list-grid');
    
    let searchHTML = '';
    if(value != '') {
      searchObj.searchArray.forEach((keyword) => {
        if(keyword.startsWith(value)) {
          searchHTML += `
            <div class="keyword-container js-keyword-container">
              <img class="keyword-search-icon" src="images/icons/search-icon.png">
              <div class="keyword-btn">
                ${keyword}
              </div>
            </div>
          `;
        }
      });
    };
    searchListGrid.innerHTML = searchHTML;

    const searchListElem = document.querySelector('.search-list-container');
    
    searchListElem.innerHTML = searchListGrid.outerHTML;

    midSecContainer.classList.add(
      'amazon-header-middle-section-search-on'
    );

    if(searchHTML === '') {
      midSecContainer.classList.remove(
        'amazon-header-middle-section-search-on'
      );

      if(searchListElem)
        searchListElem.innerHTML = '';
    };



    document.querySelectorAll('.js-keyword-container')
      .forEach((container) => {
        container.addEventListener('click', () => {
          searchBarElem.value = container.innerText;
          searchEventDone();
        });
      });
  };

};

