/**
 * Created by gjjoo on 2016. 5. 24..
 */

export default class Layout {
  static get CssClasses() {
    return {
      LAYOUT: 'layout',
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
    event.preventDefault();
    this.drawer_.classList.remove(Layout.CssClasses.IS_DRAWER_OPEN);
    this.obfuscator_.classList.remove(Layout.CssClasses.IS_DRAWER_OPEN);
  }
  toggleMinified() {
    this.drawer_.classList.toggle(Layout.CssClasses.MINIFIED);
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
      }

      this.toggleMinifiedHandler = this.toggleMinified.bind(this);
      this.minifiedButton_.addEventListener('click', this.toggleMinifiedHandler);
    }
  }
}
