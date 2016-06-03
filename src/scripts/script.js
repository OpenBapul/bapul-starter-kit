/**
 * Created by gjjoo on 2016. 3. 1..
 */

//import './serviceWorker';
//import jQuery from 'jquery';
//import angular from 'angular';

// Layout
import Layout from './components/layout';
let layouts = document.querySelectorAll('.layout');
for (let i = 0, len = layouts.length; i < len; i++) {
  new Layout(layouts[i]).init();
}

// Textfield
import Textfield from './components/textfield';
let textfields = document.querySelectorAll('.textfield');
for (let i = 0, len = textfields.length; i < len; i++) {
  new Textfield(textfields[i]).init();
}

// Checkbox
import Checkbox from './components/checkbox';
let checkboxes = document.querySelectorAll('.checkbox');
for (let i = 0, len = checkboxes.length; i < len; i++) {
  new Checkbox(checkboxes[i]).init();
}

// Radio
import Radio from './components/radio';
let radios = document.querySelectorAll('.radio');
for (let i = 0, len = radios.length; i < len; i++) {
  new Radio(radios[i]).init();
}

// Table
import Table from './components/table';
let tables = document.querySelectorAll('.table');
for (let i = 0, len = tables.length; i < len; i++) {
  new Table(tables[i]).init();
}
