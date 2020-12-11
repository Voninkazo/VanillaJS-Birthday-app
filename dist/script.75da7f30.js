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
})({"script.js":[function(require,module,exports) {
const container = document.querySelector('tbody');
const parent = document.querySelector('body');
const form = document.querySelector('form');
const addBtn = document.querySelector('.add');
const filterInputName = document.querySelector('#filter-name');
const buttonFilter = document.querySelector('#reset'); // btn reset

const filterForm = document.querySelector('.filter-form');
const filterByMonthSelect = document.querySelector('#filter-month');
let myPeople = []; // mama array

const filterPeople = e => {
  displayPeople(e, filterInputName.value);
};

const resetFilter = e => {
  displayPeople();
  filterInputName.reset();
}; ///////////////////// FETCHING FUNCTION ///////////////////////////
// fetch data


const url = "https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json";

async function fetchPeople() {
  const response = await fetch(url);
  const data = await response.json();
  myPeople = [...data];
  console.log(myPeople);
  storeFromLocalStorage(myPeople);
  displayPeople(myPeople);
  container.dispatchEvent(new CustomEvent('itemsUpdated'));
  return data;
} //////////////////////  LOCAL STORAGE FUNCTIONS /////////////////////////////
// mirror from LS


function mirrorLocalStorage() {
  console.info('Saving items to LS');
  localStorage.setItem('myPeople', JSON.stringify(myPeople));
}

; // store from LS

async function storeFromLocalStorage() {
  // if there is data in the LS
  const listItem = JSON.parse(localStorage.getItem('myPeople'));

  if (listItem) {
    myPeople = listItem;
  } // if there is no data in the local, then fetch again


  if (!listItem) {
    const response = await fetch(url);
    const data = await response.json();
    myPeople = [...data];
    displayPeople(myPeople);
  }

  container.dispatchEvent(new CustomEvent('itemsUpdated'));
} /////////////////////// DISPLAY PEOPLE LIST//////////////////////////////////
// display people list


async function displayPeople(e, filterByName) {
  // sort by birthday
  let sortedPeople = myPeople.sort((a, b) => a.birthday - b.birthday);

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
  container.innerHTML = html; // container.dispatchEvent(new CustomEvent('itemsUpdated'));
}

displayPeople(); // destroy popup

async function destroyPopup(popup) {
  popup.classList.remove('open');
  popup.remove();
  popup = null;
} ///////////////////// EDIT PERSON DATA /////////////////////////////
// edit person data


async function editPeople(e) {
  const iconEdit = e.target.closest('button.edit');

  if (iconEdit) {
    const tableRow = e.target.closest('tr');
    const idToEdit = tableRow.dataset.id;
    editPeoplePopup(idToEdit);
  }
} // ****** FILER BY MONTH **********


const filterByMonth = () => {
  let selectedValue = filterByMonthSelect.value;
  console.log(selectedValue);
  const filteredByMonth = myPeople.filter(person => {
    let birthday = new Date(person.birthday);
    return birthday.getMonth() === Number(selectedValue);
  });
  console.log(filteredByMonth);
  myPeople = filteredByMonth;
  return displayPeople(myPeople);
}; // show popup and edit data


async function editPeoplePopup(idToEdit) {
  return new Promise(async function (resolve) {
    const popup = document.createElement('form');
    let personToEdit = myPeople.find(peop => peop.id == idToEdit); // popup edit= form

    const html = `
        <ul class="form">
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
        `;
    popup.innerHTML = html;
    parent.appendChild(popup);
    popup.classList.add('popup');
    popup.classList.add('open');
    popup.addEventListener('submit', e => {
      resolve();
      e.preventDefault();
      personToEdit.lastName = popup.lastName.value;
      personToEdit.firstName = popup.firstName.value;
      personToEdit.picture = popup.image.value;
      personToEdit.birthday = popup.birthday.value, displayPeople(myPeople);
      resolve(e.target.remove(myPeople));
      destroyPopup(popup);
      container.dispatchEvent(new CustomEvent('itemsUpdated'));
    }, {
      once: true
    });

    if (popup.cancel) {
      popup.cancel.addEventListener('click', function () {
        resolve(null);
        destroyPopup(popup);
      }, {
        once: true
      });
    }
  });
} //////////////////// DELETE PERSONS ////////////////////////
// delete a person


const deletePerson = e => {
  const iconDelete = e.target.closest('button.delete');

  if (iconDelete) {
    const tableRow = e.target.closest('tr');
    const idToDelete = tableRow.dataset.id;
    deletePersonPopup(idToDelete);
  }

  parent.dispatchEvent(new CustomEvent('itemsUpdated'));
}; // show delete popup and delete a specific person


const deletePersonPopup = idToDelete => {
  return new Promise(async function (resolve) {
    const popup = document.createElement('div');
    let personToDelte = myPeople.find(person => person.id == idToDelete);
    popup.classList.add('popup'); // popup delete

    const html = `
                    <div>
                        <p>Do you really want to delete ${personToDelte.lastName} ${personToDelte.firstName}?</p>
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
        const people = myPeople.filter(person => person.id != idToDelete);
        myPeople = people;
        displayPeople(myPeople);
        destroyPopup(popup);
      }

      if (e.target.matches('.cancel')) {
        destroyPopup(popup);
      }

      container.dispatchEvent(new CustomEvent('itemsUpdated'));
    }); // resolve promise

    resolve();
    parent.appendChild(popup);
    popup.classList.add('open');
    container.dispatchEvent(new CustomEvent('itemsUpdated'));
  });
}; ///////////////////////// ADD A NEW PERSON /////////////////////////


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
      myPeople.push(newPerson);
      displayPeople(myPeople);
      destroyPopup(myForm);
      container.dispatchEvent(new CustomEvent('itemsUpdated'));
    }); // cancel

    if (myForm.cancel) {
      myForm.cancel.addEventListener('click', function () {
        destroyPopup(myForm);
      }, {
        once: true
      });
    }

    resolve();
    parent.appendChild(myForm);
    myForm.classList.add('open');
  });
}

; // buttonFilter.addEventListener('click', resetFilter);
// listen for a click on the edit button

window.addEventListener('click', editPeople);
filterByMonthSelect.addEventListener("input", filterByMonth);
filterInputName.addEventListener('keyup', filterPeople);
addBtn.addEventListener('click', addingPeople);
window.addEventListener('click', deletePerson);
displayPeople(myPeople);
container.addEventListener('itemsUpdated', mirrorLocalStorage);
storeFromLocalStorage();
fetchPeople();
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61808" + '/');

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