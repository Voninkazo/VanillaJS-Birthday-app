// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"fileSrc/variables.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByMonthSelect = exports.filterForm = exports.buttonFilter = exports.filterInputName = exports.addBtn = exports.form = exports.parent = exports.container = void 0;
const container = document.querySelector('tbody');
exports.container = container;
const parent = document.querySelector('body');
exports.parent = parent;
const form = document.querySelector('form');
exports.form = form;
const addBtn = document.querySelector('.add');
exports.addBtn = addBtn;
const filterInputName = document.querySelector('#filter-name');
exports.filterInputName = filterInputName;
const buttonFilter = document.querySelector('#reset'); // btn reset

exports.buttonFilter = buttonFilter;
const filterForm = document.querySelector('.filter-form');
exports.filterForm = filterForm;
const filterByMonthSelect = document.querySelector('#filter-month');
exports.filterByMonthSelect = filterByMonthSelect;
},{}],"fileSrc/displayList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPeople = displayPeople;

var _script = require("../script.js");

var _variables = require("./variables.js");

/////////////////////// DISPLAY PEOPLE LIST//////////////////////////////////
// display people list
async function displayPeople(e, filterByName) {
  // sort by birthday
  let sortedPeople = _script.myPeople.sort((a, b) => a.birthday - b.birthday);

  if (filterByName) {
    sortedPeople = sortedPeople.filter(person => {
      let lowerCaseTitle = person.lastName.toLowerCase(); // jerusalem

      let lowerCaseFilter = filterByName.toLowerCase(); // jeru

      if (lowerCaseTitle.includes(lowerCaseFilter)) {
        return true;
      } else {
        return false;
      }
    });
  }

  const html = sortedPeople.map(people => {
    ///////////////DATE FUNCTION/////////////////////
    let age = new Date().getFullYear() - new Date(people.birthday).getFullYear(); // dayOfbirth

    let dateOfBirth = new Date(people.birthday).getDate();
    let date;
    let month; // set the condition to set the right date symbols

    if (dateOfBirth > 3) {
      date = `${dateOfBirth}th`;
    }

    switch (dateOfBirth % 10) {
      case 1:
        date = `${dateOfBirth}st`;
        break;

      case 2:
        date = `${dateOfBirth}nd`;
        break;

      case 3:
        date = `${dateOfBirth}rd`;
    }

    ; // find the current month of birth

    const monthOfBirth = new Date(people.birthday).getMonth();

    switch (monthOfBirth) {
      case 0:
        month = "January";
        break;

      case 1:
        month = "February";
        break;

      case 2:
        month = "March";
        break;

      case 3:
        month = "April";
        break;

      case 4:
        month = "May";
        break;

      case 5:
        month = "June";
        break;

      case 6:
        month = "July";

      case 7:
        month = "August";
        break;

      case 8:
        month = "September";
        break;

      case 9:
        month = "October";
        break;

      case 10:
        month = "November";
        break;

      case 11:
        month = "December";
    }

    ; // calculate one day

    const oneDay = 24 * 60 * 60 * 1000; // today = date now

    let today = new Date();
    let year; // if the current month is bigger than the month of birth, then add one more month

    if (today.getMonth() > monthOfBirth) {
      year = today.getFullYear() + 1; // if it's the same, then stay the same
    } else if (today.getMonth() === monthOfBirth && today.getDate() > dateOfBirth) {
      year = today.getFullYear();
    } else {
      // the same as the before
      year = today.getFullYear();
    } // calculate the day of birth


    let dayOfBirth = new Date(year, monthOfBirth, dateOfBirth);

    if (today.getMonth() === monthOfBirth && today.getDate() > dateOfBirth) {
      dayOfBirth.setFullYear(dayOfBirth.getFullYear() + 1);
      age = new Date().getFullYear() + 1 - new Date(people.birthday).getFullYear();
    }

    ; // claulcation of the day difference from now(today)

    let dayDiffer = Math.round(Math.abs((new Date(dayOfBirth) - new Date(today)) / oneDay));
    return `
                <tr data-id="${people.id}">
                    <td class="image">
                        <img src="${people.picture}" alt="photo">
                    </td>
                    <td class="name">
                        ${people.lastName} ${people.firstName}<br>
                        <span>Turn ${age} on the ${date} of ${month} </span>
                    </td>
                    <td class="days-left">${dayDiffer} days</td>
                    <td>
                        <button class="edit" value="${people.id}">
                            <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
                        </button>
                        <button class="delete" value="${people.id}">
                            <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        </button>
                    </td>
                </tr>
            `;
  }).join(' ');
  _variables.container.innerHTML = html; // container.dispatchEvent(new CustomEvent('itemsUpdated'));
}
},{"../script.js":"script.js","./variables.js":"fileSrc/variables.js"}],"fileSrc/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyPopup = destroyPopup;

// destroy popup
async function destroyPopup(popup) {
  popup.classList.remove('open');
  popup.remove();
  popup = null;
}
},{}],"fileSrc/add.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addingPeople = addingPeople;

var _script = require("../script.js");

var _displayList = require("./displayList.js");

var _utils = require("./utils.js");

var _variables = require("./variables.js");

///////////////////////// ADD A NEW PERSON /////////////////////////
function addingPeople() {
  return new Promise(async function (resolve) {
    const myForm = document.createElement('form');
    myForm.classList.add('adding');
    const html = `
                <div>
                    <ul class="form">
                        <li>
                            <label>Last name</label>
                            <input type="text" name="lastName" required>
                        </li>
                        <li>
                            <label>First name</label>
                            <input type="text" name="firstname" required>
                        </li>
                        <li>
                            <label>Birthday</label>
                            <input type="date" name="birthday" required>
                        </li>
                        <li>
                            <label>Picture</label>
                            <input type="url" name="image" required>
                        </li>
                    </ul>
                    <button type="submit">Save</button>
                    <button type="button" name="cancel" class="cancel">Cancel</button>
                </div>
        `;
    myForm.innerHTML = html;
    myForm.classList.add('popup'); // grab inputs when submit

    myForm.addEventListener('submit', e => {
      e.preventDefault();
      let el = e.currentTarget.closest('form.adding');
      const newPerson = {
        id: Date.now(),
        lastName: el.lastName.value,
        firstName: el.firstname.value,
        birthday: el.birthday.value,
        picture: el.image.value
      };
      resolve();

      _script.myPeople.push(newPerson);

      (0, _displayList.displayPeople)(_script.myPeople);
      (0, _utils.destroyPopup)(myForm);

      _variables.container.dispatchEvent(new CustomEvent('itemsUpdated'));
    }); // cancel

    if (myForm.cancel) {
      myForm.cancel.addEventListener('click', function () {
        (0, _utils.destroyPopup)(myForm);
      }, {
        once: true
      });
    }

    resolve();

    _variables.parent.appendChild(myForm);

    myForm.classList.add('open');
  });
}

;
},{"../script.js":"script.js","./displayList.js":"fileSrc/displayList.js","./utils.js":"fileSrc/utils.js","./variables.js":"fileSrc/variables.js"}],"fileSrc/edit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editPeople = editPeople;

var _displayList = require("./displayList.js");

var _script = require("../script.js");

var _utils = require("./utils.js");

var _variables = require("./variables.js");

// edit person data
async function editPeople(e) {
  const iconEdit = e.target.closest('button.edit');

  if (iconEdit) {
    const tableRow = e.target.closest('tr');
    const idToEdit = tableRow.dataset.id;
    editPeoplePopup(idToEdit);
  }
} // show popup and edit data


async function editPeoplePopup(idToEdit) {
  return new Promise(async function (resolve) {
    const popup = document.createElement('div');

    let personToEdit = _script.myPeople.find(peop => peop.id == idToEdit); // popup edit= form


    const html = `
        <div class="popup2">
            <form class="form">
                <p>Editing ${personToEdit.lastName} ${personToEdit.firstName}</p>
                <ul>
                    <li>
                        <label for="lastName">Last Name:</label>
                        <input type="text" name="lastName" id="lastname" value="${personToEdit.lastName}">
                    </li>
                    <li>
                        <label for="firstName">First Name:</label>
                        <input type="text" name="firstName" id="firstname" value="${personToEdit.firstName}">
                    </li>
                    <li>
                        <label for="birthday">Birthday:</label>
                        <input type="date" name="birthday" id="birthday" value="${personToEdit.birthday ? new Date(personToEdit.birthday).toISOString().substring(0, 10) : ''}">
                    </li>
                    <li>
                        <label for="image">Image:</label>
                        <input type="url" name="image" id="img" value="${personToEdit.picture}" alt="photo">
                    </li>
                </ul>
                <div>
                    <button type="submit">Submit</button>
                    <button class="cancel">Cancel</button>
                </div>
            </form>
        </div>
        `;
    popup.innerHTML = html;

    _variables.parent.appendChild(popup);

    popup.classList.add('popup');
    popup.classList.add('open');
    const popupForm = popup.querySelector("form");
    popupForm.addEventListener('submit', e => {
      resolve();
      e.preventDefault();
      personToEdit.lastName = popupForm.lastName.value;
      personToEdit.firstName = popupForm.firstName.value;
      personToEdit.picture = popupForm.image.value;
      personToEdit.birthday = popupForm.birthday.value, (0, _displayList.displayPeople)(_script.myPeople);
      resolve(e.target.remove(_script.myPeople));
      (0, _utils.destroyPopup)(popup);

      _variables.container.dispatchEvent(new CustomEvent('itemsUpdated'));
    }, {
      once: true
    });

    if (popup.cancel) {
      popup.cancel.addEventListener('click', function () {
        resolve(null);
        (0, _utils.destroyPopup)(popup);
      }, {
        once: true
      });
    }
  });
}
},{"./displayList.js":"fileSrc/displayList.js","../script.js":"script.js","./utils.js":"fileSrc/utils.js","./variables.js":"fileSrc/variables.js"}],"fileSrc/delete.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePerson = void 0;

var _script = require("../script.js");

var _variables = require("./variables.js");

var _displayList = require("./displayList.js");

var _utils = require("./utils.js");

// delete a person
const deletePerson = e => {
  const iconDelete = e.target.closest('button.delete');

  if (iconDelete) {
    const tableRow = e.target.closest('tr');
    const idToDelete = tableRow.dataset.id;
    deletePersonPopup(idToDelete);
  }

  _variables.parent.dispatchEvent(new CustomEvent('itemsUpdated'));
}; // show delete popup and delete a specific person


exports.deletePerson = deletePerson;

const deletePersonPopup = idToDelete => {
  return new Promise(async function (resolve) {
    const popup = document.createElement('div');

    let personToDelete = _script.myPeople.find(person => person.id == idToDelete);

    popup.classList.add('popup'); // popup delete

    const html = `
                    <div>
                        <p>Do you really want to delete ${personToDelete.lastName} ${personToDelete.firstName}?</p>
                        <ul class="buttonDelt">
                            <li>
                                <button class="yes">Yes</button>
                            </li>
                            <li>
                                <button class="cancel">Cancel</button>
                            </li>
                    </div>
        `;
    popup.insertAdjacentHTML('afterbegin', html);
    popup.addEventListener('click', e => {
      if (e.target.matches('.yes')) {
        const people = _script.myPeople.filter(person => person.id != idToDelete);

        _script.myPeople = (people, function () {
          throw new Error('"' + "myPeople" + '" is read-only.');
        }());
        (0, _displayList.displayPeople)(_script.myPeople);
        (0, _utils.destroyPopup)(popup);
      }

      if (e.target.matches('.cancel')) {
        (0, _utils.destroyPopup)(popup);
      }

      _variables.container.dispatchEvent(new CustomEvent('itemsUpdated'));
    }); // resolve promise

    resolve();

    _variables.parent.appendChild(popup);

    popup.classList.add('open');

    _variables.container.dispatchEvent(new CustomEvent('itemsUpdated'));
  });
};
},{"../script.js":"script.js","./variables.js":"fileSrc/variables.js","./displayList.js":"fileSrc/displayList.js","./utils.js":"fileSrc/utils.js"}],"fileSrc/filters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByMonth = exports.resetFilter = exports.filterPeople = void 0;

var _script = require("../script.js");

var _displayList = require("./displayList.js");

var _variables = require("./variables.js");

const filterPeople = e => {
  (0, _displayList.displayPeople)(e, _variables.filterInputName.value);
};

exports.filterPeople = filterPeople;

const resetFilter = e => {
  (0, _displayList.displayPeople)();

  _variables.filterInputName.reset();
}; // ****** FILER BY MONTH **********


exports.resetFilter = resetFilter;

const filterByMonth = () => {
  let selectedValue = _variables.filterByMonthSelect.value;
  console.log(selectedValue);

  const filteredByMonth = _script.myPeople.filter(person => {
    let birthday = new Date(person.birthday);
    return birthday.getMonth() === Number(selectedValue);
  });

  console.log(filteredByMonth);
  _script.myPeople = (filteredByMonth, function () {
    throw new Error('"' + "myPeople" + '" is read-only.');
  }());
  return (0, _displayList.displayPeople)(_script.myPeople);
};

exports.filterByMonth = filterByMonth;
},{"../script.js":"script.js","./displayList.js":"fileSrc/displayList.js","./variables.js":"fileSrc/variables.js"}],"script.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myPeople = void 0;

var _add = require("./fileSrc/add.js");

var _edit = require("./fileSrc/edit.js");

var _delete = require("./fileSrc/delete.js");

var _displayList = require("./fileSrc/displayList.js");

var _filters = require("./fileSrc/filters.js");

var _variables = require("./fileSrc/variables.js");

// import { storeFromLocalStorage, mirrorLocalStorage } from './fileSrc/localStorage.js';
let myPeople = []; // mama array

exports.myPeople = myPeople;
///////////////////// FETCHING FUNCTION ///////////////////////////
// fetch data
const url = "https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json";

async function fetchPeople() {
  const response = await fetch(url);
  const data = await response.json();
  exports.myPeople = myPeople = [...data];
  console.log(myPeople);
  storeFromLocalStorage(myPeople);
  (0, _displayList.displayPeople)(myPeople);

  _variables.container.dispatchEvent(new CustomEvent('itemsUpdated'));

  return data;
}

function mirrorLocalStorage() {
  console.info('Saving items to LS');
  localStorage.setItem('myPeople', JSON.stringify(myPeople));
}

; // store from LS

async function storeFromLocalStorage() {
  // if there is data in the LS
  const listItem = JSON.parse(localStorage.getItem('myPeople'));

  if (listItem) {
    exports.myPeople = myPeople = listItem;
  } // if there is no data in the local, then fetch again


  if (!listItem) {
    const response = await fetch(url);
    const data = await response.json();
    exports.myPeople = myPeople = [...data];
    (0, _displayList.displayPeople)(myPeople);
  }

  _variables.container.dispatchEvent(new CustomEvent('itemsUpdated'));
}

_variables.buttonFilter.addEventListener('click', _filters.resetFilter);

window.addEventListener('click', _edit.editPeople);

_variables.filterByMonthSelect.addEventListener("input", _filters.filterByMonth);

_variables.filterInputName.addEventListener('keyup', _filters.filterPeople);

_variables.addBtn.addEventListener('click', _add.addingPeople);

window.addEventListener('click', _delete.deletePerson);
(0, _displayList.displayPeople)(myPeople);

_variables.container.addEventListener('itemsUpdated', mirrorLocalStorage);

storeFromLocalStorage();
fetchPeople();
},{"./fileSrc/add.js":"fileSrc/add.js","./fileSrc/edit.js":"fileSrc/edit.js","./fileSrc/delete.js":"fileSrc/delete.js","./fileSrc/displayList.js":"fileSrc/displayList.js","./fileSrc/filters.js":"fileSrc/filters.js","./fileSrc/variables.js":"fileSrc/variables.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64581" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map