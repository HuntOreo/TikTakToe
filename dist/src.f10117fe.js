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
})({"src/models/Player.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var Player = /*#__PURE__*/function () {
  function Player(player) {
    _classCallCheck(this, Player);

    this.player = player;
  }

  _createClass(Player, [{
    key: "name",
    get: function get() {
      return this.player.name;
    }
  }, {
    key: "id",
    get: function get() {
      return this.player.playerTurn;
    }
  }, {
    key: "marker",
    get: function get() {
      return this.player.marker;
    }
  }, {
    key: "current",
    get: function get() {
      return this.player.myTurn;
    }
  }, {
    key: "score",
    get: function get() {
      return this.player.score;
    }
  }, {
    key: "addScore",
    value: function addScore() {
      this.player.score += 1;
    }
  }, {
    key: "changeName",
    value: function changeName(newName) {
      this.player.name = newName;
    }
  }, {
    key: "toggleTurn",
    value: function toggleTurn(status) {
      this.player.myTurn = status;
    }
  }]);

  return Player;
}();

exports.Player = Player;
},{}],"src/models/Board.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = void 0;

var Board = /*#__PURE__*/function () {
  function Board(board) {
    _classCallCheck(this, Board);

    this.board = board;
  } // Finds the amount of rows and columns on the board
  // amnt of rows should be same as columns.


  _createClass(Board, [{
    key: "findRoot",
    value: function findRoot(boardSize) {
      var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (counter < boardSize) {
        if (counter * counter === boardSize) return counter;
      }

      return this.findRoot(boardSize, counter + 1);
    } // Sets the amount of rows and columns

  }, {
    key: "setRoot",
    value: function setRoot() {
      var _a;

      this.root = this.findRoot(Number((_a = this.board) === null || _a === void 0 ? void 0 : _a.length));
    } // Creates a 2D array represenitation of the board.
    // Returns the created array.

  }, {
    key: "create",
    value: function create() {
      this.setRoot();
      var row = [];
      var column = [];

      for (var i = 0; i < this.root; i++) {
        for (var j = 0; j < this.root; j++) {
          var str = "<></>";
          row = [].concat(_toConsumableArray(row), [str]);
        }

        column = [].concat(_toConsumableArray(column), [row]);
        row = [];
      }

      var builtBoard = _toConsumableArray(column);

      return builtBoard;
    } // Updates the 2D array of the board
    // with the players placed marker,
    // returns the new updated 2D array.

  }, {
    key: "update",
    value: function update() {
      var _a;

      var row = [];
      var column = [];

      for (var i = 0; i < Number((_a = this.board) === null || _a === void 0 ? void 0 : _a.length); i += this.root) {
        for (var j = i; j < i + this.root; j++) {
          var element = this.board[j].children[0];
          row = [].concat(_toConsumableArray(row), [element]);
        }

        column = [].concat(_toConsumableArray(column), [row]);
        row = [];
      }

      var builtBoard = _toConsumableArray(column);

      return builtBoard;
    }
  }]);

  return Board;
}();

exports.Board = Board;
},{}],"src/models/WinCondition.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WinCondition = void 0;

var Player_1 = require("./Player");

var WinCondition = /*#__PURE__*/function () {
  function WinCondition(player, root, board, listener) {
    _classCallCheck(this, WinCondition);

    this.player = player;
    this.root = root;
    this.board = board;
    this.listener = listener;
    this.draw = new Player_1.Player({
      name: 'draw',
      playerTurn: -1,
      marker: 'd',
      myTurn: false,
      score: 0
    });
  } // Checks to see if a winning move has been made on the board.


  _createClass(WinCondition, [{
    key: "check",
    value: function check() {
      var column = this.columnCheck(this.player);
      var row = this.rowCheck(this.player);
      var back = this.backCheck(this.player);
      var forward = this.forwardCheck(this.player);
      var moves = this.movesLeft();

      if (column.won) {
        return this.won(this.listener, column.elements);
      } else if (row.won) {
        return this.won(this.listener, row.elements);
      } else if (back.won) {
        return this.won(this.listener, back.elements);
      } else if (forward.won) {
        return this.won(this.listener, forward.elements);
      } else if (moves === 0) {
        return {
          winner: this.draw,
          result: false
        };
      }

      return {
        winner: this.player,
        result: false
      };
    } // makes result === true when won
    // removes click listener for tiles, removing ability to add to board.
    // highlights the winning tiles.

  }, {
    key: "won",
    value: function won(remove, elements) {
      for (var i = 0; i < this.root; i++) {
        for (var j = 0; j < this.root; j++) {
          var element = this.board[i][j];
          var parent = element.parentNode;
          parent === null || parent === void 0 ? void 0 : parent.removeEventListener('click', remove);
        }
      }

      this.color(elements);
      this.player.addScore();
      return {
        winner: this.player,
        result: true
      };
    } // Applies highlights depending on win condition.

  }, {
    key: "color",
    value: function color(elements) {
      elements.forEach(function (element) {
        element.style.backgroundColor = 'cb9efe';
      });
    } // Check row for win

  }, {
    key: "rowCheck",
    value: function rowCheck(player) {
      var count = 0;
      var divs = [];

      for (var i = 0; i < this.root; i++) {
        for (var j = 0; j < this.root + 1; j++) {
          if (count < this.root) {
            if (this.board[i][j].innerText !== player.marker) break;
            count += 1;
            divs = [].concat(_toConsumableArray(divs), [this.board[i][j]]);
            continue;
          }

          var row = {
            elements: divs,
            won: true
          };
          return row;
        }

        divs = [];
        count = 0;
      }

      return {
        elements: divs,
        won: false
      };
    } // Checks for win in a column

  }, {
    key: "columnCheck",
    value: function columnCheck(player) {
      var count = 0;
      var divs = [];

      for (var i = 0; i < this.root; i++) {
        for (var j = 0; j < this.root + 1; j++) {
          if (count < this.root) {
            if (this.board[j][i].innerText !== player.marker) break;
            count += 1;
            divs = [].concat(_toConsumableArray(divs), [this.board[j][i]]);
            continue;
          }

          var column = {
            elements: divs,
            won: true
          };
          return column;
        }

        divs = [];
        count = 0;
      }

      return {
        elements: divs,
        won: false
      };
    } // Checks for a win in a forward diagonal

  }, {
    key: "forwardCheck",
    value: function forwardCheck(player) {
      var count = 0;
      var indexTwo = this.root - 1;
      var divs = [];

      for (var i = 0; i < this.root; i++) {
        if (this.board[i][indexTwo].innerText === player.marker) {
          count += 1;
          divs = [].concat(_toConsumableArray(divs), [this.board[i][indexTwo]]);
          indexTwo -= 1;

          if (count === this.root) {
            var diagonal = {
              elements: divs,
              won: true
            };
            return diagonal;
          }
        }
      }

      return {
        elements: divs,
        won: false
      };
    } // Checks for a win on a back diagonal.

  }, {
    key: "backCheck",
    value: function backCheck(player) {
      var count = 0; // counter for how many times a marker appears diagonolly

      var divs = []; // array of elemnts that have the players marker

      for (var i = 0; i < this.root; i++) {
        // if counter does not meet needed amount for win, scan board for following marker.
        if (count < this.root + 1) {
          if (this.board[i][i].innerText === player.marker) {
            count += 1;
            divs = [].concat(_toConsumableArray(divs), [this.board[i][i]]);

            if (count === this.root) {
              var diagonal = {
                elements: divs,
                won: true
              };
              console.log('won');
              return diagonal;
            }
          }
        }
      }

      return {
        elements: divs,
        won: false
      };
    }
  }, {
    key: "movesLeft",
    value: function movesLeft() {
      var tiles = this.root * this.root;
      var moves = tiles;
      this.board.forEach(function (row) {
        row.forEach(function (tile) {
          if (tile.innerText !== '') {
            moves -= 1;
          }
        });
      });
      return moves;
    }
  }]);

  return WinCondition;
}();

exports.WinCondition = WinCondition;
},{"./Player":"src/models/Player.ts"}],"src/models/Match.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Match = void 0;

var Player_1 = require("./Player");

var Board_1 = require("./Board");

var WinCondition_1 = require("./WinCondition"); // Controls match progression


var Match = /*#__PURE__*/function () {
  function Match(entrees, foundation) {
    _classCallCheck(this, Match);

    this.entrees = entrees;
    this.foundation = foundation;
    this.scoreKeepers = document.querySelectorAll('.score');
    this.setPlayers(entrees);
    this.setBoard(foundation);
  } // Creates players for match


  _createClass(Match, [{
    key: "setPlayers",
    value: function setPlayers(players) {
      this.players = players.map(function (player) {
        return new Player_1.Player({
          name: player.name,
          playerTurn: players.indexOf(player),
          marker: player.marker,
          myTurn: players.indexOf(player) === 0 ? true : false,
          score: 0
        });
      });
    } // Gets whose turn it currently is.
    // If no player turn is set,
    // Default to player ones turn

  }, {
    key: "getCurrent",
    value: function getCurrent(players) {
      var current = players.find(function (player) {
        return player.current === true;
      });
      if (current) return current;
      return players[0];
    } // Gets the next player. defaults to player one, if no player is found.

  }, {
    key: "getNext",
    value: function getNext(players, current) {
      var next = players[players.indexOf(current) + 1];
      if (players.indexOf(current) + 1 > players.length - 1) return players[0];
      return next;
    } // Places the players marker.
    // Updates the board array with marker.

  }, {
    key: "placeMarker",
    value: function placeMarker(event, player) {
      var target = event.target;
      target.innerText = player.marker;
      this.builtBoard = this.board.update();
    } // Create Board

  }, {
    key: "setBoard",
    value: function setBoard(foundation) {
      this.board = new Board_1.Board(foundation);
      this.builtBoard = this.board.create();

      for (var i = 0; i < this.scoreKeepers.length; i++) {
        this.scoreKeepers[i].innerHTML = "\n      <h3>".concat(this.players[i].name, "</h3>\n      <p>").concat(this.players[i].score, "</p>\n    ");
      }
    } // wipes board, then sets a fresh one for a new round.

  }, {
    key: "restart",
    value: function restart() {
      var _a;

      var alert = document.querySelector('.results');
      var foundation = (_a = document.querySelector('.board')) === null || _a === void 0 ? void 0 : _a.children;

      for (var i = 0; i < foundation.length; i++) {
        foundation[i].innerHTML = "<div></div>";
      }

      alert.classList.toggle('show');
      alert.classList.toggle('hide');
      this.setBoard(foundation);
    } // Cycles through the players turn, then ends it, passing to the next player.

  }, {
    key: "play",
    value: function play(event, listener) {
      var current = this.getCurrent(this.players);
      var next = this.getNext(this.players, current);
      this.placeMarker(event, current);
      var condition = new WinCondition_1.WinCondition(current, this.builtBoard.length, this.builtBoard, listener);
      var results = condition.check();

      for (var i = 0; i < this.scoreKeepers.length; i++) {
        this.scoreKeepers[i].innerHTML = "\n      <h3>".concat(this.players[i].name, "</h3>\n      <p>").concat(this.players[i].score, "</p>\n    ");
      }

      current.toggleTurn(false);
      next.toggleTurn(true);
      return results;
    }
  }]);

  return Match;
}();

exports.Match = Match;
},{"./Player":"src/models/Player.ts","./Board":"src/models/Board.ts","./WinCondition":"src/models/WinCondition.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var _a;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Match_1 = require("./models/Match");

var boxes = document.querySelector('.board').children;
var tiles = document.querySelectorAll('.box');
var entreeOne = {
  name: 'Hunter',
  marker: 'X'
};
var entreeTwo = {
  name: 'Braden',
  marker: 'O'
};
var match = new Match_1.Match([entreeOne, entreeTwo], boxes);

var onClick = function onClick(e) {
  var _a;

  var checked = match.play(e, onClick);
  var player = checked.winner;
  var alert = document.querySelector('.results');
  var text = alert.children[0].children[0];

  if (checked.result) {
    alert.classList.toggle('hide');
    alert.classList.toggle('show');
    text.innerText = "".concat(player.name, " wins!");
  } else if (checked.result === false && player.name === 'draw') {
    alert.classList.toggle('hide');
    alert.classList.toggle('show');
    text.innerText = "Draw! No more moves.";
  }

  var target = e.target;
  (_a = target.parentNode) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', onClick);
};

var restart = function restart(e) {
  match.restart();
  tiles.forEach(function (box) {
    box.addEventListener('click', onClick);
  });
};

tiles.forEach(function (box) {
  box.addEventListener('click', onClick);
});
(_a = document.querySelector('.restart')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', restart);
},{"./models/Match":"src/models/Match.ts"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61632" + '/');

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
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map