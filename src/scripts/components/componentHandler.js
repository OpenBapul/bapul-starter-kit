/**
 * Created by gjjoo on 2016. 6. 4..
 */

const componentHandler = (() => {
  'use strict';

  let registeredComponents_ = [];
  let createdComponents_ = [];

  const findRegisteredClass_ = (name, opt_replace) => {
    for (let i = 0; i < registeredComponents_.length; i++) {
      if (registeredComponents_[i].className === name) {
        if (opt_replace !== undefined) {
          registeredComponents_[i] = opt_replace;
        }
        return registeredComponents_[i];
      }
    }
    return false;
  };

  const upgradeDomInternal = (jsClass, cssClass) => {
    if (jsClass === undefined && cssClass === undefined) {
      for (let i = 0; i < registeredComponents_.length; i++) {
        upgradeDomInternal(registeredComponents_[i].className,
          registeredComponents_[i].cssClass);
      }
    } else {
      if (cssClass === undefined) {
        let registeredClass = findRegisteredClass_(jsClass);
        if (registeredClass) {
          cssClass = registeredClass.cssClass;
        }
      }

      let elements = document.querySelectorAll('.' + cssClass);
      for (let n = 0; n < elements.length; n++) {
        upgradeElementInternal(elements[n], jsClass);
      }
    }
  };

  const upgradeElementInternal = (element, jsClass) => {
    if (jsClass === undefined) {
      for (let i = 0; i < registeredComponents_.length; i++) {
        let elemClasses = element.getAttribute('class').split(' ');
        if (elemClasses.indexOf(registeredComponents_[i].cssClass) >= 0) {
          upgradeElementInternal(element, registeredComponents_[i].className);
        }
      }
      return;
    }
    // Only upgrade elements that have not already been upgraded for the given
    // Class type. This allows you to upgrade an element with multiple classes.
    let dataUpgraded = element.getAttribute('data-upgraded');
    if (dataUpgraded === null || dataUpgraded.indexOf(jsClass) === -1) {
      // Upgrade element.
      if (dataUpgraded === null) {
        dataUpgraded = '';
      }
      element.setAttribute('data-upgraded', dataUpgraded + ',' + jsClass);
      let registeredClass = findRegisteredClass_(jsClass);
      if (registeredClass) {
        createdComponents_.push(new registeredClass.classConstructor(element));
        // Call any callbacks the user has registered with this component type.
        registeredClass.callbacks.forEach((callback) => {
          callback(element);
        });
      } else {
        // If component creator forgot to register, try and see if
        // it is in global scope.
        createdComponents_.push(new window[jsClass](element));
      }
    }
  };

  const registerInternal = (config) => {
    let newConfig = {
      'classConstructor': config.constructor,
      'className': config.classAsString,
      'cssClass': config.cssClass,
      'callbacks': []
    };

    let found = findRegisteredClass_(config.classAsString, newConfig);

    if (!found) {
      registeredComponents_.push(newConfig);
    }

    upgradeDomInternal(config.classAsString, config.cssClass);
  };

  const registerUpgradedCallbackInternal = (jsClass, callback) => {
    let regClass = findRegisteredClass_(jsClass);
    if (regClass) {
      regClass.callbacks.push(callback);
    }
  };

  const upgradeAllRegisteredInternal = () => {
    for (let n = 0; n < registeredComponents_.length; n++) {
      upgradeDomInternal(registeredComponents_[n].className);
    }
  };

  return {
    upgradeDom: upgradeDomInternal,
    upgradeElement: upgradeElementInternal,
    upgradeAllRegistered: upgradeAllRegisteredInternal,
    registerUpgradedCallback: registerUpgradedCallbackInternal,
    register: registerInternal
  };

})();

window.componentHandler = componentHandler;
window['componentHandler'] = componentHandler;

window.addEventListener('load', function() {
  'use strict';

  componentHandler.upgradeAllRegistered();
});
