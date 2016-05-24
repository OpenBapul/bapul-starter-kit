/**
* Created by gjjoo on 2016. 5. 24..
*/

export default class Textfield {
  constructor(element) {
    this.element_ = element;
  }
  onFocus() {
    this.element_.classList.add('is-focused');
  }
  onBlur() {
    this.element_.classList.remove('is-focused');
  }
  updateClasses() {
    this.checkDirty();
    this.checkValidity();
    this.checkCount();
  }
  checkDirty() {
    if (this.input_.value && this.input_.value.length > 0) {
      this.element_.classList.add('is-dirty');
    } else {
      this.element_.classList.remove('is-dirty');
    }
  }
  checkValidity() {
    if (this.input_.validity) {
      if (this.input_.validity.valid) {
        this.element_.classList.remove('is-invalid');
      } else {
        this.element_.classList.add('is-invalid');
      }
    }
  }
  checkCount() {
    if (this.count_) {
      if (this.input_.value.length > this.input_.getAttribute('length')) {
        this.element_.classList.add('is-count-over');
      } else {
        this.element_.classList.remove('is-count-over');
      }
      this.count_.textContent = this.input_.value.length + '/' + this.input_.getAttribute('length');
    }
  }
  init() {
    if (this.element_) {
      this.input_ = this.element_.querySelector('.textfield--input');
      this.count_ = this.element_.querySelector('.textfield--count');

      this.boundUpdateClassesHandler = this.updateClasses.bind(this);
      this.boundFocusHandler = this.onFocus.bind(this);
      this.boundBlurHandler = this.onBlur.bind(this);

      this.input_.addEventListener('input', this.boundUpdateClassesHandler);
      this.input_.addEventListener('focus', this.boundFocusHandler);
      this.input_.addEventListener('blur', this.boundBlurHandler);

      var invalid = this.element_.classList.contains('is-invalid');
      this.updateClasses();
      if (invalid) {
        this.element_.classList.add('is-invalid');
      }
    }
  }
}
