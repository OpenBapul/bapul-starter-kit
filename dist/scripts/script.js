'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * Created by gjjoo on 2016. 6. 4..
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         */

var componentHandler = function () {
  'use strict';

  var registeredComponents_ = [];
  var createdComponents_ = [];

  var findRegisteredClass_ = function findRegisteredClass_(name, opt_replace) {
    for (var i = 0; i < registeredComponents_.length; i++) {
      if (registeredComponents_[i].className === name) {
        if (opt_replace !== undefined) {
          registeredComponents_[i] = opt_replace;}

        return registeredComponents_[i];}}


    return false;};


  var upgradeDomInternal = function upgradeDomInternal(jsClass, cssClass) {
    if (jsClass === undefined && cssClass === undefined) {
      for (var i = 0; i < registeredComponents_.length; i++) {
        upgradeDomInternal(registeredComponents_[i].className, 
        registeredComponents_[i].cssClass);}} else 

    {
      if (cssClass === undefined) {
        var registeredClass = findRegisteredClass_(jsClass);
        if (registeredClass) {
          cssClass = registeredClass.cssClass;}}



      var elements = document.querySelectorAll('.' + cssClass);
      for (var n = 0; n < elements.length; n++) {
        upgradeElementInternal(elements[n], jsClass);}}};




  var upgradeElementInternal = function upgradeElementInternal(element, jsClass) {
    if (jsClass === undefined) {
      for (var i = 0; i < registeredComponents_.length; i++) {
        var elemClasses = element.getAttribute('class').split(' ');
        if (elemClasses.indexOf(registeredComponents_[i].cssClass) >= 0) {
          upgradeElementInternal(element, registeredComponents_[i].className);}}


      return;}

    // Only upgrade elements that have not already been upgraded for the given
    // Class type. This allows you to upgrade an element with multiple classes.
    var dataUpgraded = element.getAttribute('data-upgraded');
    if (dataUpgraded === null || dataUpgraded.indexOf(jsClass) === -1) {
      // Upgrade element.
      if (dataUpgraded === null) {
        dataUpgraded = '';}

      element.setAttribute('data-upgraded', dataUpgraded + ',' + jsClass);
      var registeredClass = findRegisteredClass_(jsClass);
      if (registeredClass) {
        createdComponents_.push(new registeredClass.classConstructor(element));
        // Call any callbacks the user has registered with this component type.
        registeredClass.callbacks.forEach(function (callback) {
          callback(element);});} else 

      {
        // If component creator forgot to register, try and see if
        // it is in global scope.
        createdComponents_.push(new window[jsClass](element));}}};




  var registerInternal = function registerInternal(config) {
    var newConfig = { 
      'classConstructor': config.constructor, 
      'className': config.classAsString, 
      'cssClass': config.cssClass, 
      'callbacks': [] };


    var found = findRegisteredClass_(config.classAsString, newConfig);

    if (!found) {
      registeredComponents_.push(newConfig);}


    upgradeDomInternal(config.classAsString, config.cssClass);};


  var registerUpgradedCallbackInternal = function registerUpgradedCallbackInternal(jsClass, callback) {
    var regClass = findRegisteredClass_(jsClass);
    if (regClass) {
      regClass.callbacks.push(callback);}};



  var upgradeAllRegisteredInternal = function upgradeAllRegisteredInternal() {
    for (var n = 0; n < registeredComponents_.length; n++) {
      upgradeDomInternal(registeredComponents_[n].className);}};



  return { 
    upgradeDom: upgradeDomInternal, 
    upgradeElement: upgradeElementInternal, 
    upgradeAllRegistered: upgradeAllRegisteredInternal, 
    registerUpgradedCallback: registerUpgradedCallbackInternal, 
    register: registerInternal };}();




window.componentHandler = componentHandler;
window['componentHandler'] = componentHandler;

window.addEventListener('load', function () {
  'use strict';

  componentHandler.upgradeAllRegistered();});


/**
 * Created by gjjoo on 2016. 5. 24..
 */

(function () {
  'use strict';var 

  Layout = function () {_createClass(Layout, null, [{ key: 'CssClasses', get: function get() 
      {
        return { 
          LAYOUT: 'layout', 
          TITLE: 'layout--title', 
          CONTENT: 'layout--content', 
          DRAWER: 'layout--drawer', 
          DRAWER_BUTTON: 'layout--drawer-button', 
          OBFUSCATOR: 'layout--obfuscator', 
          NAVIGATION_LINK: 'navigation--link', 
          IS_DRAWER_OPEN: 'is-visible', 
          MINIFIED: 'minified', 
          MINIFIED_BUTTON: 'layout--minified-button' };} }]);


    function Layout(element) {_classCallCheck(this, Layout);
      this.element_ = element;
      this.init();}_createClass(Layout, [{ key: 'toggleDrawer', value: function toggleDrawer() 

      {
        this.drawer_.classList.toggle(Layout.CssClasses.IS_DRAWER_OPEN);
        this.obfuscator_.classList.toggle(Layout.CssClasses.IS_DRAWER_OPEN);

        if (this.drawer_.classList.contains(Layout.CssClasses.IS_DRAWER_OPEN)) {
          this.drawer_.setAttribute('aria-hidden', 'false');
          this.obfuscator_.setAttribute('aria-hidden', 'false');
          this.drawerButton_.setAttribute('aria-expanded', 'true');} else 
        {
          this.drawer_.setAttribute('aria-hidden', 'true');
          this.obfuscator_.setAttribute('aria-hidden', 'true');
          this.drawerButton_.setAttribute('aria-expanded', 'false');}} }, { key: 'removeDrawer', value: function removeDrawer(


      event) {
        this.drawer_.classList.remove(Layout.CssClasses.IS_DRAWER_OPEN);
        this.obfuscator_.classList.remove(Layout.CssClasses.IS_DRAWER_OPEN);

        for (var i = 0, len = this.drawerNavigationLink_.length; i < len; i++) {
          this.drawerNavigationLink_[i].classList.remove('active');}

        event.target.classList.add('active');

        var fileName = event.target.getAttribute('href').split('#')[1];
        this.element_.querySelector('.' + Layout.CssClasses.TITLE).textContent = fileName;
        this.loadDoc('/views/components/' + fileName + '.html');
        event.preventDefault();} }, { key: 'toggleMinified', value: function toggleMinified() 

      {
        this.drawer_.classList.toggle(Layout.CssClasses.MINIFIED);} }, { key: 'loadDoc', value: function loadDoc(

      path) {var _this = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
            _this.element_.querySelector('.' + Layout.CssClasses.CONTENT).innerHTML = xhttp.responseText;}

          componentHandler.upgradeAllRegistered();};

        xhttp.open('GET', path, false);
        xhttp.send();} }, { key: 'init', value: function init() 

      {
        if (this.element_) {
          this.obfuscator_ = this.element_.querySelector('.' + Layout.CssClasses.OBFUSCATOR);
          this.drawer_ = this.element_.querySelector('.' + Layout.CssClasses.DRAWER);
          this.drawerButton_ = this.element_.querySelector('.' + Layout.CssClasses.DRAWER_BUTTON);
          this.drawerNavigationLink_ = this.drawer_.querySelectorAll('.' + Layout.CssClasses.NAVIGATION_LINK);
          this.minifiedButton_ = this.element_.querySelector('.' + Layout.CssClasses.MINIFIED_BUTTON);

          this.toggleDrawerHandler = this.toggleDrawer.bind(this);
          this.drawerButton_.addEventListener('click', this.toggleDrawerHandler);
          this.obfuscator_.addEventListener('click', this.toggleDrawerHandler);

          this.removeDrawerHandler = this.removeDrawer.bind(this);
          for (var i = 0, len = this.drawerNavigationLink_.length; i < len; i++) {
            this.drawerNavigationLink_[i].addEventListener('click', this.removeDrawerHandler);

            if (this.drawerNavigationLink_[i].classList.contains('active')) {
              var fileName = this.drawerNavigationLink_[i].getAttribute('href').split('#')[1];
              this.element_.querySelector('.' + Layout.CssClasses.TITLE).textContent = fileName;
              this.loadDoc('/views/components/' + fileName + '.html');}}



          if (this.minifiedButton_) {
            this.toggleMinifiedHandler = this.toggleMinified.bind(this);
            this.minifiedButton_.addEventListener('click', this.toggleMinifiedHandler);}}} }]);return Layout;}();






  componentHandler.register({ 
    constructor: Layout, 
    classAsString: 'Layout', 
    cssClass: 'layout-js' });})();




/**
 * Created by gjjoo on 2016. 5. 24..
 */

(function () {
  'use strict';var 

  Textfield = function () {_createClass(Textfield, null, [{ key: 'CssClasses', get: function get() 
      {
        return { 
          LABEL: 'textfield--label', 
          INPUT: 'textfield--input', 
          COUNT: 'textfield--count', 
          IS_DIRTY: 'is-dirty', 
          IS_FOCUSED: 'is-focused', 
          IS_INVALID: 'is-invalid', 
          IS_COUNT_OVER: 'is-count-over' };} }]);


    function Textfield(element) {_classCallCheck(this, Textfield);
      this.element_ = element;
      this.init();}_createClass(Textfield, [{ key: 'onFocus', value: function onFocus() 

      {
        this.element_.classList.add(Textfield.CssClasses.IS_FOCUSED);} }, { key: 'onBlur', value: function onBlur() 

      {
        this.element_.classList.remove(Textfield.CssClasses.IS_FOCUSED);} }, { key: 'updateClasses', value: function updateClasses() 

      {
        this.checkDirty();
        this.checkValidity();
        this.checkCount();} }, { key: 'checkDirty', value: function checkDirty() 

      {
        if (this.input_.value && this.input_.value.length > 0) {
          this.element_.classList.add(Textfield.CssClasses.IS_DIRTY);} else 
        {
          this.element_.classList.remove(Textfield.CssClasses.IS_DIRTY);}} }, { key: 'checkValidity', value: function checkValidity() 


      {
        if (this.input_.validity) {
          if (this.input_.validity.valid) {
            this.element_.classList.remove(Textfield.CssClasses.IS_INVALID);} else 
          {
            this.element_.classList.add(Textfield.CssClasses.IS_INVALID);}}} }, { key: 'checkCount', value: function checkCount() 



      {
        if (this.count_) {
          if (this.input_.value.length > this.input_.getAttribute('length')) {
            this.element_.classList.add(Textfield.CssClasses.IS_COUNT_OVER);} else 
          {
            this.element_.classList.remove(Textfield.CssClasses.IS_COUNT_OVER);}

          this.count_.textContent = this.input_.value.length + '/' + this.input_.getAttribute('length');}} }, { key: 'init', value: function init() 


      {
        if (this.element_) {
          this.input_ = this.element_.querySelector('.' + Textfield.CssClasses.INPUT);
          this.count_ = this.element_.querySelector('.' + Textfield.CssClasses.COUNT);

          this.boundUpdateClassesHandler = this.updateClasses.bind(this);
          this.boundFocusHandler = this.onFocus.bind(this);
          this.boundBlurHandler = this.onBlur.bind(this);

          this.input_.addEventListener('input', this.boundUpdateClassesHandler);
          this.input_.addEventListener('focus', this.boundFocusHandler);
          this.input_.addEventListener('blur', this.boundBlurHandler);

          var invalid = this.element_.classList.contains(Textfield.CssClasses.IS_INVALID);
          this.updateClasses();
          if (invalid) {
            this.element_.classList.add(Textfield.CssClasses.IS_INVALID);}}} }]);return Textfield;}();





  componentHandler.register({ 
    constructor: Textfield, 
    classAsString: 'Textfield', 
    cssClass: 'textfield-js' });})();




/**
 * Created by gjjoo on 2016. 6. 2..
 */

(function () {
  'use strict';var 

  Table = function () {_createClass(Table, null, [{ key: 'CssClasses', get: function get() 
      {
        return { 
          TABLE: 'table', 
          SELECT_ELEMENT: 'table--select', 
          SELECT_ELEMENT_ALL: 'table--select-all', 
          CHECKBOX_INPUT: 'checkbox--input', 
          IS_SELECTED: 'is-selected' };} }]);


    function Table(element) {_classCallCheck(this, Table);
      this.element_ = element;
      this.init();}_createClass(Table, [{ key: 'selectRow', value: function selectRow(

      event) {
        event.target.closest('tr').classList.toggle(Table.CssClasses.IS_SELECTED);} }, { key: 'selectAllRow', value: function selectAllRow() 

      {
        var selectElementAllCheckbox = this.selectElementAll_.querySelector('.' + Table.CssClasses.CHECKBOX_INPUT);
        var tableRows = this.element_.querySelectorAll('tbody > tr');

        if (selectElementAllCheckbox.checked) {
          for (var i = 0, len = tableRows.length; i < len; i++) {
            this.selectElement_[i].querySelector('.' + Table.CssClasses.CHECKBOX_INPUT).checked = true;
            tableRows[i].classList.add(Table.CssClasses.IS_SELECTED);}} else 

        {
          for (var _i = 0, _len = tableRows.length; _i < _len; _i++) {
            this.selectElement_[_i].querySelector('.' + Table.CssClasses.CHECKBOX_INPUT).checked = false;
            tableRows[_i].classList.remove(Table.CssClasses.IS_SELECTED);}}} }, { key: 'init', value: function init() 



      {
        if (this.element_) {
          this.selectElementAll_ = this.element_.querySelector('.' + Table.CssClasses.SELECT_ELEMENT_ALL);
          this.selectElement_ = this.element_.querySelectorAll('.' + Table.CssClasses.SELECT_ELEMENT);

          this.selectAllRowHandler = this.selectAllRow.bind(this);
          this.selectElementAll_.addEventListener('change', this.selectAllRowHandler);
          for (var i = 0, len = this.selectElement_.length; i < len; i++) {
            this.selectElement_[i].addEventListener('change', this.selectRow);}}} }]);return Table;}();





  componentHandler.register({ 
    constructor: Table, 
    classAsString: 'Table', 
    cssClass: 'table-js' });})();




/**
 * Created by gjjoo on 2016. 5. 24..
 */

(function () {
  'use strict';var 

  Panel = function () {_createClass(Panel, null, [{ key: 'CssClasses', get: function get() 
      {
        return { 
          PANEL: 'panel', 
          ACTION: 'panel--action', 
          REVEAL: 'panel--reveal', 
          REVEAL_CLOSE: 'panel--reveal-close', 
          IS_VISIBLED: 'is-visibled' };} }]);


    function Panel(element) {_classCallCheck(this, Panel);
      this.element_ = element;
      this.init();}_createClass(Panel, [{ key: 'onShowRevealPanel', value: function onShowRevealPanel() 

      {
        this.reveal_.classList.add(Panel.CssClasses.IS_VISIBLED);} }, { key: 'onHideRevealPanel', value: function onHideRevealPanel() 

      {
        this.reveal_.classList.remove(Panel.CssClasses.IS_VISIBLED);} }, { key: 'init', value: function init() 

      {
        if (this.element_) {
          this.reveal_ = this.element_.querySelector('.' + Panel.CssClasses.REVEAL);
          this.revealClose_ = this.element_.querySelector('.' + Panel.CssClasses.REVEAL_CLOSE);
          this.action_ = this.element_.querySelector('.' + Panel.CssClasses.ACTION);

          this.showRevealPanelHandler = this.onShowRevealPanel.bind(this);
          this.action_.addEventListener('click', this.showRevealPanelHandler);

          this.hideRevealPanelHandler = this.onHideRevealPanel.bind(this);
          this.revealClose_.addEventListener('click', this.hideRevealPanelHandler);}} }]);return Panel;}();




  componentHandler.register({ 
    constructor: Panel, 
    classAsString: 'Panel', 
    cssClass: 'panel-js' });})();
//# sourceMappingURL=script.js.map
