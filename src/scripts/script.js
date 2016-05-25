/**
 * Created by gjjoo on 2016. 3. 1..
 */

//import './serviceWorker';
//import jQuery from 'jquery';
//import angular from 'angular';

import {foo, bar} from './test';
foo();
bar();

// Textfield
import Textfield from './components/textfield';
let textfields = document.querySelectorAll('.textfield');
let textfieldsLen = textfields.length;
for (let i = 0; i < textfieldsLen; i++) {
  new Textfield(textfields[i]).init();
}

// Checkbox
import Checkbox from './components/checkbox';
let checkboxes = document.querySelectorAll('.checkbox');
let checkboxesLen = checkboxes.length;
for (let i = 0; i < checkboxesLen; i++) {
  new Checkbox(checkboxes[i]).init();
}

// Radio
import Radio from './components/radio';
let radios = document.querySelectorAll('.checkbox');
let radiosLen = radios.length;
for (let i = 0; i < radiosLen; i++) {
  new Radio(radios[i]).init();
}
