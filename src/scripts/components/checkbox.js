/**
* Created by gjjoo on 2016. 5. 24..
*/

export default class Checkbox {
  static get CssClasses() {
    return {
      LABEL: 'checkbox--label',
      INPUT: 'checkbox--input',
      IS_FOCUSED: 'is-focused',
      IS_DISABLED: 'is-disabled'
    };
  }
  constructor(element) {
    this.element_ = element;
  }
  onFocus() {
    this.element_.classList.add(Checkbox.CssClasses.IS_FOCUSED);
  }
  onBlur() {
    this.element_.classList.remove(Checkbox.CssClasses.IS_FOCUSED);
  }
  updateClasses() {
    // ...
  }
  init() {
    if (this.element_) {
      this.input_ = this.element_.querySelector('.' + Checkbox.CssClasses.INPUT);

      this.boundUpdateClassesHandler = this.updateClasses.bind(this);
      this.boundFocusHandler = this.onFocus.bind(this);
      this.boundBlurHandler = this.onBlur.bind(this);

      this.input_.addEventListener('input', this.boundUpdateClassesHandler);
      this.input_.addEventListener('focus', this.boundFocusHandler);
      this.input_.addEventListener('blur', this.boundBlurHandler);
    }
  }
}
