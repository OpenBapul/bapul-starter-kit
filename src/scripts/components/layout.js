/**
 * Created by gjjoo on 2016. 5. 24..
 */

export default class Layout {
  static get CssClasses() {
    return {
      DRAWER: 'layout--drawer',
      DRAWER_BUTTON: 'layout--drawer-button',
      OBFUSCATOR: 'layout--obfuscator',
      IS_DRAWER_OPEN: 'is-visible'
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
  init() {
    if (this.element_) {
      this.drawer_ = this.element_.querySelector('.' + Layout.CssClasses.DRAWER);
      this.drawerButton_ = this.element_.querySelector('.' + Layout.CssClasses.DRAWER_BUTTON);
      this.obfuscator_ = this.element_.querySelector('.' + Layout.CssClasses.OBFUSCATOR);

      this.toggleDrawerHandler = this.toggleDrawer.bind(this);
      this.drawerButton_.addEventListener('click', this.toggleDrawerHandler);
      this.obfuscator_.addEventListener('click', this.toggleDrawerHandler);
    }
  }
}
