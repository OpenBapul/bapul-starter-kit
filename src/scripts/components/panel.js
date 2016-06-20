/**
 * Created by gjjoo on 2016. 5. 24..
 */

(() => {
  'use strict';

  class Panel {
    static get CssClasses() {
      return {
        PANEL: 'panel',
        ACTION: 'panel--action',
        REVEAL: 'panel--reveal',
        REVEAL_CLOSE: 'panel--reveal-close',
        IS_VISIBLED: 'is-visibled'
      };
    }
    constructor(element) {
      this.element_ = element;
      this.init();
    }
    onShowRevealPanel() {
      this.reveal_.classList.add(Panel.CssClasses.IS_VISIBLED);
    }
    onHideRevealPanel() {
      this.reveal_.classList.remove(Panel.CssClasses.IS_VISIBLED);
    }
    init() {
      if (this.element_) {
        this.reveal_ = this.element_.querySelector('.' + Panel.CssClasses.REVEAL);
        this.revealClose_ = this.element_.querySelector('.' + Panel.CssClasses.REVEAL_CLOSE);
        this.action_ = this.element_.querySelector('.' + Panel.CssClasses.ACTION);

        this.showRevealPanelHandler = this.onShowRevealPanel.bind(this);
        this.action_.addEventListener('click', this.showRevealPanelHandler);

        this.hideRevealPanelHandler = this.onHideRevealPanel.bind(this);
        this.revealClose_.addEventListener('click', this.hideRevealPanelHandler);
      }
    }
  }

  componentHandler.register({
    constructor: Panel,
    classAsString: 'Panel',
    cssClass: 'panel-js'
  });

})();
