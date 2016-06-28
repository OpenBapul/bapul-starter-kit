/**
 * Created by gjjoo on 2016. 5. 24..
 */

(() => {
  'use strict';

  class Layout {
    static get CssClasses() {
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
        MINIFIED_BUTTON: 'layout--minified-button'
      };
    }
    constructor(element) {
      this.element_ = element;
      this.init();
    }
    toggleDrawer() {
      this.drawer_.classList.toggle(Layout.CssClasses.IS_DRAWER_OPEN);
      this.obfuscator_.classList.toggle(Layout.CssClasses.IS_DRAWER_OPEN);

      if (this.drawer_.classList.contains(Layout.CssClasses.IS_DRAWER_OPEN)) {
        this.drawer_.setAttribute('aria-hidden', 'false');
        this.obfuscator_.setAttribute('aria-hidden', 'false');
        this.drawerButton_.setAttribute('aria-expanded', 'true');
      } else {
        this.drawer_.setAttribute('aria-hidden', 'true');
        this.obfuscator_.setAttribute('aria-hidden', 'true');
        this.drawerButton_.setAttribute('aria-expanded', 'false');
      }
    }
    removeDrawer(event) {
      this.drawer_.classList.remove(Layout.CssClasses.IS_DRAWER_OPEN);
      this.obfuscator_.classList.remove(Layout.CssClasses.IS_DRAWER_OPEN);

      for (let i = 0, len = this.drawerNavigationLink_.length; i < len; i++) {
        this.drawerNavigationLink_[i].classList.remove('active');
      }
      event.target.classList.add('active');

      const fileName = event.target.getAttribute('href').split('#')[1];
      this.element_.querySelector('.' + Layout.CssClasses.TITLE).textContent = fileName;
      this.loadDoc('/views/components/' + fileName + '.html');
      event.preventDefault();
    }
    toggleMinified() {
      this.drawer_.classList.toggle(Layout.CssClasses.MINIFIED);
    }
    loadDoc(path) {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          this.element_.querySelector('.' + Layout.CssClasses.CONTENT).innerHTML = xhttp.responseText;
        }
        componentHandler.upgradeAllRegistered();
      };
      xhttp.open('GET', path, false);
      xhttp.send();
    }
    init() {
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
        for (let i = 0, len = this.drawerNavigationLink_.length; i < len; i++) {
          this.drawerNavigationLink_[i].addEventListener('click', this.removeDrawerHandler);

          if (this.drawerNavigationLink_[i].classList.contains('active')) {
            const fileName = this.drawerNavigationLink_[i].getAttribute('href').split('#')[1];
            this.element_.querySelector('.' + Layout.CssClasses.TITLE).textContent = fileName;
            this.loadDoc('/views/components/' + fileName + '.html');
          }
        }

        this.toggleMinifiedHandler = this.toggleMinified.bind(this);
        this.minifiedButton_.addEventListener('click', this.toggleMinifiedHandler);
      }
    }
  }

  componentHandler.register({
    constructor: Layout,
    classAsString: 'Layout',
    cssClass: 'layout-js'
  });

})();
