/**
 * Created by gjjoo on 2016. 6. 2..
 */

(() => {
  'use strict';

  class Table {
    static get CssClasses() {
      return {
        TABLE: 'table',
        SELECT_ELEMENT: 'table--select',
        SELECT_ELEMENT_ALL: 'table--select-all',
        CHECKBOX_INPUT: 'checkbox--input',
        IS_SELECTED: 'is-selected'
      };
    }
    constructor(element) {
      this.element_ = element;
      this.init();
    }
    selectRow(event) {
      event.target.closest('tr').classList.toggle(Table.CssClasses.IS_SELECTED);
    }
    selectAllRow() {
      let selectElementAllCheckbox = this.selectElementAll_.querySelector('.' + Table.CssClasses.CHECKBOX_INPUT);
      let tableRows = this.element_.querySelectorAll('tbody > tr');

      if (selectElementAllCheckbox.checked) {
        for (let i = 0, len = tableRows.length; i < len; i++) {
          this.selectElement_[i].querySelector('.' + Table.CssClasses.CHECKBOX_INPUT).checked = true;
          tableRows[i].classList.add(Table.CssClasses.IS_SELECTED);
        }
      } else {
        for (let i = 0, len = tableRows.length; i < len; i++) {
          this.selectElement_[i].querySelector('.' + Table.CssClasses.CHECKBOX_INPUT).checked = false;
          tableRows[i].classList.remove(Table.CssClasses.IS_SELECTED);
        }
      }
    }
    init() {
      if (this.element_) {
        this.selectElementAll_ = this.element_.querySelector('.' + Table.CssClasses.SELECT_ELEMENT_ALL);
        this.selectElement_ = this.element_.querySelectorAll('.' + Table.CssClasses.SELECT_ELEMENT);

        this.selectAllRowHandler = this.selectAllRow.bind(this);
        this.selectElementAll_.addEventListener('change', this.selectAllRowHandler);
        for (let i = 0, len = this.selectElement_.length; i < len; i++) {
          this.selectElement_[i].addEventListener('change', this.selectRow);
        }
      }
    }
  }

  componentHandler.register({
    constructor: Table,
    classAsString: 'Table',
    cssClass: 'table-js'
  });

})();
