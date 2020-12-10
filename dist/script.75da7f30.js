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
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var container = document.querySelector('tbody');
var parent = document.querySelector('body');
var form = document.querySelector('form');
var addBtn = document.querySelector('.add');
var filterInputName = document.querySelector('#filter-name');
var buttonFilter = document.querySelector('#reset'); // btn reset

var filterForm = document.querySelector('.filter-form'); // const filterByMonth = document.querySelector('.filter-month')

var myPeople = []; // mama array

var filterPeople = function filterPeople(e) {
  displayPeople(e, filterInputName.value);
};

var resetFilter = function resetFilter(e) {
  displayPeople();
  filterInputName.reset();
}; ///////////////////// FETCHING FUNCTION ///////////////////////////
// fetch data


var url = "https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json";

function fetchPeople() {
  return _fetchPeople.apply(this, arguments);
} //////////////////////  LOCAL STORGE FUNCTIONS /////////////////////////////
// mirror from LS


function _fetchPeople() {
  _fetchPeople = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var response, data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetch(url);

          case 2:
            response = _context3.sent;
            _context3.next = 5;
            return response.json();

          case 5:
            data = _context3.sent;
            myPeople = _toConsumableArray(data);
            storeFromLocalStorage(myPeople);
            displayPeople(myPeople);
            container.dispatchEvent(new CustomEvent('itemsUpdated'));
            return _context3.abrupt("return", data);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fetchPeople.apply(this, arguments);
}

function mirrorLocalStorage() {
  console.info('Saving items to LS');
  localStorage.setItem('myPeople', JSON.stringify(myPeople));
}

; // store from LS

function storeFromLocalStorage() {
  return _storeFromLocalStorage.apply(this, arguments);
} /////////////////////// DISPLAY PEOPLE LIST//////////////////////////////////
// display people list


function _storeFromLocalStorage() {
  _storeFromLocalStorage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var listItem, response, data;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // if there is data in the LS
            listItem = JSON.parse(localStorage.getItem('myPeople'));

            if (listItem) {
              myPeople = listItem;
            } // if there is no data in the local, then fetch again


            if (listItem) {
              _context4.next = 11;
              break;
            }

            _context4.next = 5;
            return fetch("".concat(people));

          case 5:
            response = _context4.sent;
            _context4.next = 8;
            return response.json();

          case 8:
            data = _context4.sent;
            myPeople = _toConsumableArray(data);
            displayPeople(myPeople);

          case 11:
            container.dispatchEvent(new CustomEvent('itemsUpdated'));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _storeFromLocalStorage.apply(this, arguments);
}

function displayPeople(_x, _x2) {
  return _displayPeople.apply(this, arguments);
}

function _displayPeople() {
  _displayPeople = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e, filterByName) {
    var sortedPeople, html;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // sort by birthday
            sortedPeople = myPeople.sort(function (a, b) {
              return a.birthday - b.birthday;
            });

            if (filterByName) {
              sortedPeople = sortedPeople.filter(function (person) {
                var lowerCaseTitle = person.lastName.toLowerCase(); // jerusalem

                var lowerCaseFilter = filterByName.toLowerCase(); // jeru

                if (lowerCaseTitle.includes(lowerCaseFilter)) {
                  return true;
                } else {
                  return false;
                }
              });
            }

            html = sortedPeople.map(function (people) {
              ///////////////DATE FUNCTION/////////////////////
              var age = new Date().getFullYear() - new Date(people.birthday).getFullYear(); // dayOfbirth

              var dateOfBirth = new Date(people.birthday).getDate();
              var date;
              var month; // set the condition to set the right date symbols

              if (dateOfBirth > 3) {
                date = "".concat(dateOfBirth, "th");
              }

              switch (dateOfBirth % 10) {
                case 1:
                  date = "".concat(dateOfBirth, "st");
                  break;

                case 2:
                  date = "".concat(dateOfBirth, "nd");
                  break;

                case 3:
                  date = "".concat(dateOfBirth, "rd");
              }

              ; // find the current month of birth

              var monthOfBirth = new Date(people.birthday).getMonth();

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

              var oneDay = 24 * 60 * 60 * 1000; // today = date now

              var today = new Date();
              var year; // if the current month is bigger than the month of birth, then add one more month

              if (today.getMonth() > monthOfBirth) {
                year = today.getFullYear() + 1; // if it's the same, then stay the same
              } else if (today.getMonth() === monthOfBirth && today.getDate() > dateOfBirth) {
                year = today.getFullYear();
              } else {
                // the same as the before
                year = today.getFullYear();
              } // calculate the day of birth


              var dayOfBirth = new Date(year, monthOfBirth, dateOfBirth);

              if (today.getMonth() === monthOfBirth && today.getDate() > dateOfBirth) {
                dayOfBirth.setFullYear(dayOfBirth.getFullYear() + 1);
                age = new Date().getFullYear() + 1 - new Date(people.birthday).getFullYear();
              }

              ; // claulcation of the day difference from now(today)

              var dayDiffer = Math.round(Math.abs((new Date(dayOfBirth) - new Date(today)) / oneDay));
              return "\n                <tr data-id=\"".concat(people.id, "\">\n                    <td class=\"image\">\n                        <img src=\"").concat(people.picture, "\" alt=\"photo\">\n                    </td>\n                    <td class=\"name\">\n                        ").concat(people.lastName, " ").concat(people.firstName, "<br>\n                        <span>Turn ").concat(age, " on the ").concat(date, " of ").concat(month, " </span>\n                    </td>\n                    <td class=\"days-left\">").concat(dayDiffer, " days</td>\n                    <td>\n                        <button class=\"edit\" value=\"").concat(people.id, "\">\n                            <svg viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"pencil w-6 h-6\"><path d=\"M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z\"></path></svg>\n                        </button>\n                        <button class=\"delete\" value=\"").concat(people.id, "\">\n                            <svg viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"trash w-6 h-6\"><path fill-rule=\"evenodd\" d=\"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z\" clip-rule=\"evenodd\"></path></svg>\n                        </button>\n                    </td>\n                </tr>\n            ");
            }).join(' ');
            container.innerHTML = html;
            container.dispatchEvent(new CustomEvent('itemsUpdated'));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _displayPeople.apply(this, arguments);
}

displayPeople(); // destroy popup

function destroyPopup(_x3) {
  return _destroyPopup.apply(this, arguments);
} ///////////////////// EDIT PERSON DATA /////////////////////////////
// edit person data


function _destroyPopup() {
  _destroyPopup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(popup) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            popup.classList.remove('open');
            popup.remove();
            popup = null;

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _destroyPopup.apply(this, arguments);
}

function editPeople(_x4) {
  return _editPeople.apply(this, arguments);
} // ****** FILER BY MONTH **********
// const filterByMonth = persons => {
//     if (filterMonthFilter.value !== '') {
//         persons = persons.filter(person => {
//             let birthday = new Date(person.birthday);
//             return birthday.getMonth() === Number(filterMonthFilter.value);
//         });
//     }
//     return persons;
// };
// show popup and edit data


function _editPeople() {
  _editPeople = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(e) {
    var iconEdit, tableRow, idToEdit;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            iconEdit = e.target.closest('button.edit');

            if (iconEdit) {
              tableRow = e.target.closest('tr');
              idToEdit = tableRow.dataset.id;
              editPeoplePopup(idToEdit);
            }

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _editPeople.apply(this, arguments);
}

function editPeoplePopup(_x5) {
  return _editPeoplePopup.apply(this, arguments);
} // listen for a click on the edit button


function _editPeoplePopup() {
  _editPeoplePopup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(idToEdit) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(resolve) {
                var popup, personToEdit, html;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        popup = document.createElement('form');
                        personToEdit = myPeople.find(function (peop) {
                          return peop.id == idToEdit;
                        }); // popup edit= form

                        html = "\n        <ul class=\"form\">\n            <li>\n\t\t\t    <label for=\"lastName\">Last Name:</label>\n                <input type=\"text\" name=\"lastName\" id=\"lastname\" value=\"".concat(personToEdit.lastName, "\">\n            </li>\n            <li>\n\t\t\t    <label for=\"firstName\">First Name:</label>\n                <input type=\"text\" name=\"firstName\" id=\"firstname\" value=\"").concat(personToEdit.firstName, "\">\n            </li>\n            <li>\n\t\t\t    <label for=\"birthday\">Birthday:</label>\n                <input type=\"date\" name=\"birthday\" id=\"birthday\" value=\"").concat(personToEdit.birthday ? new Date(personToEdit.birthday).toISOString().substring(0, 10) : '', "\">\n            </li>\n            <li>\n\t\t\t    <label for=\"image\">Image:</label>\n                <input type=\"url\" name=\"image\" id=\"img\" value=\"").concat(personToEdit.picture, "\" alt=\"photo\">\n            </li>\n\t\t</ul>\n        <div>\n            <button type=\"submit\">Submit</button>\n            <button class=\"cancel\">Cancel</button>\n        </div>\n        ");
                        popup.innerHTML = html;
                        parent.appendChild(popup);
                        popup.classList.add('popup');
                        popup.classList.add('open');
                        popup.addEventListener('submit', function (e) {
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

                      case 9:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x8) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _editPeoplePopup.apply(this, arguments);
}

window.addEventListener('click', editPeople); //////////////////// DELETE PERSONS ////////////////////////
// delete a person

var deletePerson = function deletePerson(e) {
  var iconDelete = e.target.closest('button.delete');

  if (iconDelete) {
    var tableRow = e.target.closest('tr');
    var idToDelete = tableRow.dataset.id;
    deletePersonPopup(idToDelete);
  }

  parent.dispatchEvent(new CustomEvent('itemsUpdated'));
}; // show delete popup and delete a specific person


var deletePersonPopup = function deletePersonPopup(idToDelete) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var popup, personToDelte, html;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              popup = document.createElement('div');
              personToDelte = myPeople.find(function (person) {
                return person.id == idToDelete;
              });
              popup.classList.add('popup'); // popup delete

              html = "\n                    <div>\n                        <p>Do you really want to delete ".concat(personToDelte.lastName, " ").concat(personToDelte.firstName, "?</p>\n                        <ul class=\"buttonDelt\">\n                            <li>\n                                <button class=\"yes\">Yes</button>\n                            </li>\n                            <li>\n                                <button class=\"cancel\">Cancel</button>\n                            </li>\n                    </div>\n        ");
              popup.insertAdjacentHTML('afterbegin', html);
              popup.addEventListener('click', function (e) {
                if (e.target.matches('.yes')) {
                  var _people = myPeople.filter(function (person) {
                    return person.id != idToDelete;
                  });

                  myPeople = _people;
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

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x6) {
      return _ref.apply(this, arguments);
    };
  }());
}; ///////////////////////// ADD A NEW PERSON /////////////////////////


function addingPeople() {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
      var myForm, html;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              myForm = document.createElement('form');
              myForm.classList.add('adding');
              html = "\n                <div>\n                    <ul class=\"form\">\n                        <li>\n                            <label>Last name</label>\n                            <input type=\"text\" name=\"lastName\" required>\n                        </li>\n                        <li>\n                            <label>First name</label>\n                            <input type=\"text\" name=\"firstname\" required>\n                        </li>\n                        <li>\n                            <label>Birthday</label>\n                            <input type=\"date\" name=\"birthday\" required>\n                        </li>\n                        <li>\n                            <label>Picture</label>\n                            <input type=\"url\" name=\"image\" required>\n                        </li>\n                    </ul>\n                    <button type=\"submit\">Save</button>\n                    <button type=\"button\" name=\"cancel\" class=\"cancel\">Cancel</button>\n                </div>\n        ";
              myForm.innerHTML = html;
              myForm.classList.add('popup'); // grab inputs when submit

              myForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var el = e.currentTarget.closest('form.adding');
                var newPerson = {
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

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x7) {
      return _ref2.apply(this, arguments);
    };
  }());
}

; // buttonFilter.addEventListener('click', resetFilter);

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60329" + '/');

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