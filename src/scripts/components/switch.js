/**
 * Created by gjjoo on 2016. 5. 24..
 */

(() => {
  'use strict';

  class Switch {
    static get CssClasses() {
      return {
        LABEL: 'switch--label',
        INPUT: 'switch--input',
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled'
      };
    }
    constructor(element) {
      this.element_ = element;
      this.init();
    }
    onFocus() {
      this.element_.classList.add(Switch.CssClasses.IS_FOCUSED);
    }
    onBlur() {
      this.element_.classList.remove(Switch.CssClasses.IS_FOCUSED);
    }
    init() {
      if (this.element_) {
        this.input_ = this.element_.querySelector('.' + Switch.CssClasses.INPUT);

        this.boundFocusHandler = this.onFocus.bind(this);
        this.boundBlurHandler = this.onBlur.bind(this);

        this.input_.addEventListener('focus', this.boundFocusHandler);
        this.input_.addEventListener('blur', this.boundBlurHandler);
      }
    }
  }

  componentHandler.register({
    constructor: Switch,
    classAsString: 'Switch',
    cssClass: 'switch'
  });

})();
