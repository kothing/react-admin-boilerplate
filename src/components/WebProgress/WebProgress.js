/* WebProgress */


let WebProgress = {};

WebProgress.version = '0.1.0';

let Settings = WebProgress.settings = {
  minimum: 0.08,
  easing: 'linear',
  positionUsing: '',
  speed: 200,
  trickle: true,
  trickleSpeed: 200,
  showSpinner: true,
  barSelector: '[role="bar"]',
  spinnerSelector: '[role="spinner"]',
  parent: 'body',
  template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
};

/**
 * Updates configuration.
 *
 *     WebProgress.configure({
 *       minimum: 0.1
 *     });
 */
WebProgress.configure = function(options) {
  let key, value;
  for (key in options) {
    value = options[key];
    if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
  }

  return this;
};

/**
 * Last number.
 */

WebProgress.status = null;

/**
 * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
 *
 *     WebProgress.set(0.4);
 *     WebProgress.set(1.0);
 */

WebProgress.set = function(n) {
  let started = WebProgress.isStarted();

  n = clamp(n, Settings.minimum, 1);
  WebProgress.status = (n === 1 ? null : n);

  let progress = WebProgress.render(!started),
      bar      = progress.querySelector(Settings.barSelector),
      speed    = Settings.speed,
      ease     = Settings.easing;

  queue(function(next) {
    // Set positionUsing if it hasn't already been set
    if (Settings.positionUsing === '') Settings.positionUsing = WebProgress.getPositioningCSS();

    // Add transition
    css(bar, barPositionCSS(n, speed, ease));

    if (n === 1) {
      // Fade out
      css(progress, {
        transition: 'none',
        opacity: 1
      });

      setTimeout(function() {
        css(progress, {
          transition: 'all ' + speed + 'ms linear',
          opacity: 0
        });
        setTimeout(function() {
          WebProgress.remove();
          next();
        }, speed);
      }, speed);
    } else {
      setTimeout(next, speed);
    }
  });

  return this;
};

WebProgress.isStarted = function() {
  return typeof WebProgress.status === 'number';
};

/**
 * Shows the progress bar.
 * This is the same as setting the status to 0%, except that it doesn't go backwards.
 *
 *     WebProgress.start();
 *
 */
WebProgress.start = function() {
  if (!WebProgress.status) WebProgress.set(0);

  let work = function() {
    setTimeout(function() {
      if (!WebProgress.status) return;
      WebProgress.trickle();
      work();
    }, Settings.trickleSpeed);
  };

  if (Settings.trickle) work();

  return this;
};

/**
 * Hides the progress bar.
 * This is the *sort of* the same as setting the status to 100%, with the
 * difference being `done()` makes some placebo effect of some realistic motion.
 *
 *     WebProgress.done();
 *
 * If `true` is passed, it will show the progress bar even if its hidden.
 *
 *     WebProgress.done(true);
 */

WebProgress.done = function(force) {
  if (!force && !WebProgress.status) return this;

  return WebProgress.inc(0.3 + 0.5 * Math.random()).set(1);
};

/**
 * Increments by a random amount.
 */

WebProgress.inc = function(amount) {
  let n = WebProgress.status;

  if (!n) {
    return WebProgress.start();
  } else if(n > 1) {
    return;
  } else {
    if (typeof amount !== 'number') {
      if (n >= 0 && n < 0.2) { amount = 0.1; }
      else if (n >= 0.2 && n < 0.5) { amount = 0.04; }
      else if (n >= 0.5 && n < 0.8) { amount = 0.02; }
      else if (n >= 0.8 && n < 0.99) { amount = 0.005; }
      else { amount = 0; }
    }

    n = clamp(n + amount, 0, 0.994);
    return WebProgress.set(n);
  }
};

WebProgress.trickle = function() {
  return WebProgress.inc();
};

/**
 * Waits for all supplied jQuery promises and
 * increases the progress as the promises resolve.
 *
 * @param $promise jQUery Promise
 */
(function() {
  let initial = 0, current = 0;

  WebProgress.promise = function($promise) {
    if (!$promise || $promise.state() === "resolved") {
      return this;
    }

    if (current === 0) {
      WebProgress.start();
    }

    initial++;
    current++;

    $promise.always(function() {
      current--;
      if (current === 0) {
          initial = 0;
          WebProgress.done();
      } else {
          WebProgress.set((initial - current) / initial);
      }
    });

    return this;
  };

})();

/**
 * (Internal) renders the progress bar markup based on the `template`
 * setting.
 */

WebProgress.render = function(fromStart) {
  if (WebProgress.isRendered()) return document.getElementById('web-progress');

  addClass(document.documentElement, 'web-progress-busy');

  let progress = document.createElement('div');
  progress.id = 'web-progress';
  progress.innerHTML = Settings.template;

  let bar      = progress.querySelector(Settings.barSelector),
      perc     = fromStart ? '-100' : toBarPerc(WebProgress.status || 0),
      parent   = document.querySelector(Settings.parent),
      spinner;

  css(bar, {
    transition: 'all 0 linear',
    transform: 'translate3d(' + perc + '%,0,0)'
  });

  if (!Settings.showSpinner) {
    spinner = progress.querySelector(Settings.spinnerSelector);
    spinner && removeElement(spinner);
  }

  if (parent !== document.body) {
    addClass(parent, 'web-progress-custom-parent');
  }

  parent.appendChild(progress);
  return progress;
};

/**
 * Removes the element. Opposite of render().
 */

WebProgress.remove = function() {
  removeClass(document.documentElement, 'web-progress-busy');
  removeClass(document.querySelector(Settings.parent), 'web-progress-custom-parent');
  let progress = document.getElementById('web-progress');
  progress && removeElement(progress);
};

/**
 * Checks if the progress bar is rendered.
 */

WebProgress.isRendered = function() {
  return !!document.getElementById('web-progress');
};

/**
 * Determine which positioning CSS rule to use.
 */

WebProgress.getPositioningCSS = function() {
  // Sniff on document.body.style
  let bodyStyle = document.body.style;

  // Sniff prefixes
  let vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' : ('MozTransform' in bodyStyle) ? 'Moz' : ('msTransform' in bodyStyle) ? 'ms' : ('OTransform' in bodyStyle) ? 'O' : '';

  if (vendorPrefix + 'Perspective' in bodyStyle) {
    // Modern browsers with 3D support, e.g. Webkit, IE10
    return 'translate3d';
  } else if (vendorPrefix + 'Transform' in bodyStyle) {
    // Browsers without 3D support, e.g. IE9
    return 'translate';
  } else {
    // Browsers without translate() support, e.g. IE7-8
    return 'margin';
  }
};

/**
 * Helpers
 */

function clamp(n, min, max) {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

/**
 * (Internal) converts a percentage (`0..1`) to a bar translateX
 * percentage (`-100%..0%`).
 */

function toBarPerc(n) {
  return (-1 + n) * 100;
}


/**
 * (Internal) returns the correct CSS for changing the bar's
 * position given an n percentage, and speed and ease from Settings
 */

function barPositionCSS(n, speed, ease) {
  let barCSS;

  if (Settings.positionUsing === 'translate3d') {
    barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
  } else if (Settings.positionUsing === 'translate') {
    barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
  } else {
    barCSS = { 'margin-left': toBarPerc(n)+'%' };
  }

  barCSS.transition = 'all '+speed+'ms '+ease;

  return barCSS;
}

/**
 * (Internal) Queues a function to be executed.
 */

let queue = (function() {
  let pending = [];

  function next() {
    let fn = pending.shift();
    if (fn) {
      fn(next);
    }
  }

  return function(fn) {
    pending.push(fn);
    if (pending.length === 1) next();
  };
})();

/**
 * (Internal) Applies css properties to an element, similar to the jQuery
 * css method.
 *
 * While this helper does assist with vendor prefixed property names, it
 * does not perform any manipulation of values prior to setting styles.
 */

let css = (function() {
  let cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
      cssProps    = {};

  function camelCase(string) {
    return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
      return letter.toUpperCase();
    });
  }

  function getVendorProp(name) {
    let style = document.body.style;
    if (name in style) return name;

    let i = cssPrefixes.length,
        capName = name.charAt(0).toUpperCase() + name.slice(1),
        vendorName;
    while (i--) {
      vendorName = cssPrefixes[i] + capName;
      if (vendorName in style) return vendorName;
    }

    return name;
  }

  function getStyleProp(name) {
    name = camelCase(name);
    return cssProps[name] || (cssProps[name] = getVendorProp(name));
  }

  function applyCss(element, prop, value) {
    prop = getStyleProp(prop);
    element.style[prop] = value;
  }

  return function(element, properties) {
    let args = arguments,
        prop,
        value;

    if (args.length === 2) {
      for (prop in properties) {
        value = properties[prop];
        if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
      }
    } else {
      applyCss(element, args[1], args[2]);
    }
  }
})();

/**
 * (Internal) Determines if an element or space separated list of class names contains a class name.
 */

function hasClass(element, name) {
  let list = typeof element == 'string' ? element : classList(element);
  return list.indexOf(' ' + name + ' ') >= 0;
}

/**
 * (Internal) Adds a class to an element.
 */

function addClass(element, name) {
  let oldList = classList(element),
      newList = oldList + name;

  if (hasClass(oldList, name)) return;

  // Trim the opening space.
  element.className = newList.substring(1);
}

/**
 * (Internal) Removes a class from an element.
 */

function removeClass(element, name) {
  let oldList = classList(element),
      newList;

  if (!hasClass(element, name)) return;

  // Replace the class name.
  newList = oldList.replace(' ' + name + ' ', ' ');

  // Trim the opening and closing spaces.
  element.className = newList.substring(1, newList.length - 1);
}

/**
 * (Internal) Gets a space separated list of the class names on the element.
 * The list is wrapped with a single space on each end to facilitate finding
 * matches within the list.
 */

function classList(element) {
  return (' ' + ((element && element.className) || '') + ' ').replace(/\s+/gi, ' ');
}

/**
 * (Internal) Removes an element from the DOM.
 */

function removeElement(element) {
  element && element.parentNode && element.parentNode.removeChild(element);
}


export default WebProgress;