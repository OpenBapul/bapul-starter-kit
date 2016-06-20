/**
 * Created by gjjoo on 2016. 5. 24..
 */

(() => {
  'use strict';

  class Textfield {
    static get CssClasses() {
      return {
        LABEL: 'textfield--label',
        INPUT: 'textfield--input',
        COUNT: 'textfield--count',
        IS_DIRTY: 'is-dirty',
        IS_FOCUSED: 'is-focused',
        IS_INVALID: 'is-invalid',
        IS_COUNT_OVER: 'is-count-over'
      };
    }
    constructor(element) {
      this.element_ = element;
      this.init();
    }
    onFocus() {
      this.element_.classList.add(Textfield.CssClasses.IS_FOCUSED);
    }
    onBlur() {
      this.element_.classList.remove(Textfield.CssClasses.IS_FOCUSED);
    }
    updateClasses() {
      this.checkDirty();
      this.checkValidity();
      this.checkCount();
    }
    checkDirty() {
      if (this.input_.value && this.input_.value.length > 0) {
        this.element_.classList.add(Textfield.CssClasses.IS_DIRTY);
      } else {
        this.element_.classList.remove(Textfield.CssClasses.IS_DIRTY);
      }
    }
    checkValidity() {
      if (this.input_.validity) {
        if (this.input_.validity.valid) {
          this.element_.classList.remove(Textfield.CssClasses.IS_INVALID);
        } else {
          this.element_.classList.add(Textfield.CssClasses.IS_INVALID);
        }
      }
    }
    checkCount() {
      if (this.count_) {
        if (this.input_.value.length > this.input_.getAttribute('length')) {
          this.element_.classList.add(Textfield.CssClasses.IS_COUNT_OVER);
        } else {
          this.element_.classList.remove(Textfield.CssClasses.IS_COUNT_OVER);
        }
        this.count_.textContent = this.input_.value.length + '/' + this.input_.getAttribute('length');
      }
    }
    init() {
      if (this.element_) {
        this.input_ = this.element_.querySelector('.' + Textfield.CssClasses.INPUT);
        this.count_ = this.element_.querySelector('.' + Textfield.CssClasses.COUNT);

        this.boundUpdateClassesHandler = this.updateClasses.bind(this);
        this.boundFocusHandler = this.onFocus.bind(this);
        this.boundBlurHandler = this.onBlur.bind(this);

        this.input_.addEventListener('input', this.boundUpdateClassesHandler);
        this.input_.addEventListener('focus', this.boundFocusHandler);
        this.input_.addEventListener('blur', this.boundBlurHandler);

        let invalid = this.element_.classList.contains(Textfield.CssClasses.IS_INVALID);
        this.updateClasses();
        if (invalid) {
          this.element_.classList.add(Textfield.CssClasses.IS_INVALID);
        }
      }
    }
  }

  componentHandler.register({
    constructor: Textfield,
    classAsString: 'Textfield',
    cssClass: 'textfield'
  });

})();
