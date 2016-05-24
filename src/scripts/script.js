/**
 * Created by gjjoo on 2016. 3. 1..
 */

//import './serviceWorker';
//import jQuery from 'jquery';
//import angular from 'angular';

import {foo, bar} from './test';
foo();
bar();

import Textfield from './components/textfield';
var textfields = document.querySelectorAll('.textfield');
var textfieldsLen = textfields.length;
for (var i = 0; i < textfieldsLen; i++) {
  new Textfield(textfields[i]).init();
}
