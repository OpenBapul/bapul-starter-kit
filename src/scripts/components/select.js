/**
 * Created by gjjoo on 2016. 7. 4..
 */

(() => {
  'use strict';

  class Select {
    static get CssClasses() {
      return {
        SELECT: 'select',
        SELECT_VALUE: 'select--value',
        MENU_CONTAINER: 'select--menu-container',
        MENU_OPTION: 'select--menu-option',
        MENU_TEXT: 'select--menu-text',
        SCROLL_MASK: 'scroll--mask',
        IS_VISIBLE: 'is-visible',
        IS_SELECTED: 'is-selected'
      };
    }
    constructor(element) {
      this.element_ = element;
      this.init();
    }
    selectElement() {
      this.menuContainer_.classList.toggle(Select.CssClasses.IS_VISIBLE);
      this.scrollMask_.classList.toggle(Select.CssClasses.IS_VISIBLE);

      if (this.menuContainer_.classList.contains(Select.CssClasses.IS_VISIBLE)) {
        this.selectElement_.setAttribute('aria-expanded', 'true');
        this.selectElement_.setAttribute('aria-multiselectable', 'true');
        this.menuContainer_.setAttribute('aria-hidden', 'false');
      } else {
        this.selectElement_.setAttribute('aria-expanded', 'false');
        this.selectElement_.setAttribute('aria-multiselectable', 'false');
        this.menuContainer_.setAttribute('aria-hidden', 'true');
      }
    }
    removeScrollMask() {
      this.menuContainer_.classList.remove(Select.CssClasses.IS_VISIBLE);
      this.scrollMask_.classList.remove(Select.CssClasses.IS_VISIBLE);

      this.selectElement_.setAttribute('aria-expanded', 'false');
      this.selectElement_.setAttribute('aria-multiselectable', 'false');
      this.menuContainer_.setAttribute('aria-hidden', 'true');
    }
    selectOption() {
      const target = event.target;
      this.selectValue_.querySelector('span').textContent = target.querySelector('.' + Select.CssClasses.MENU_TEXT).textContent

      for (let i = 0, len = this.menuOption_.length; i < len; i++) {
        this.menuOption_[i].classList.remove(Select.CssClasses.IS_SELECTED);
        this.menuOption_[i].setAttribute('aria-selected', false);
      }
      target.classList.add(Select.CssClasses.IS_SELECTED);
      target.setAttribute('aria-selected', true);
      this.removeScrollMask();
    }
    init() {
      if (this.element_) {
        this.selectElement_ = this.element_.querySelector('.' + Select.CssClasses.SELECT);
        this.selectValue_ = this.element_.querySelector('.' + Select.CssClasses.SELECT_VALUE);
        this.menuContainer_ = this.element_.querySelector('.' + Select.CssClasses.MENU_CONTAINER);
        this.menuOption_ = this.element_.querySelectorAll('.' + Select.CssClasses.MENU_OPTION);
        this.scrollMask_ = this.element_.querySelector('.' + Select.CssClasses.SCROLL_MASK);

        this.selectElementHandler = this.selectElement.bind(this);
        this.selectElement_.addEventListener('click', this.selectElementHandler);

        this.removeScrollMaskHandler = this.removeScrollMask.bind(this);
        this.scrollMask_.addEventListener('click', this.removeScrollMaskHandler);

        this.selectOptionHandler = this.selectOption.bind(this);
        for (let i = 0, len = this.menuOption_.length; i < len; i++) {
          this.menuOption_[i].addEventListener('click', this.selectOptionHandler);
        }
      }
    }
  }

  componentHandler.register({
    constructor: Select,
    classAsString: 'Select',
    cssClass: 'select-js'
  });

})();
