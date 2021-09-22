function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var HMRAdderBase = /*#__PURE__*/ function() {
    "use strict";
    function HMRAdderBase() {
        _classCallCheck(this, HMRAdderBase);
        this.UPDATE_LISTENER_FUNC_NAME = 'bjsx_hmr_update';
    }
    _createClass(HMRAdderBase, [
        {
            key: "transform",
            value: function transform(code) {
            }
        },
        {
            key: "getImports",
            value: function getImports() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                return [];
            }
        },
        {
            key: "getExports",
            value: function getExports() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                return [];
            }
        },
        {
            /** returns node list of  */ key: "getDependentJSXComponents",
            value: function getDependentJSXComponents(code, imports) {
                return [];
            }
        },
        {
            key: "getFunctions",
            value: function getFunctions(nodeList) {
                return [];
            }
        },
        {
            key: "getVars",
            value: function getVars(searchVar, scopeCode) {
                return [];
            }
        },
        {
            key: "fromDirectReturnToVarReturn",
            value: function fromDirectReturnToVarReturn(code) {
                return '';
            }
        },
        {
            key: "getReturnValue",
            value: function getReturnValue(funcNode) {
                return '';
            }
        },
        {
            key: "getInsertRecord",
            value: function getInsertRecord() {
                return [];
            }
        },
        {
            /**
   * replace specific range 
   * @param insertCode inserting new code
   * @param range set of replacing locations `[startIndex, endIndex]`
   * @param code original code
   * @param insertRecord use `getInsertRecord()` to get `InsertRecord` object
   * @returns result entire code string
   */ key: "replaceCode",
            value: function replaceCode(insertCode, range, code, insertRecord, param) {
                var insertInBack = param === void 0 ? false : param;
                var prevShift = 0;
                insertRecord.filter(function(v) {
                    return v[0] < range[0] || insertInBack && v[0] === range[0];
                }).forEach(function(v) {
                    return prevShift += v[1];
                });
                insertRecord.push([
                    range[0],
                    insertCode.length - range[1] + range[0]
                ]);
                return code.substring(0, range[0] + prevShift) + insertCode + code.substring(range[1] + prevShift);
            }
        },
        {
            /**
   * insert code to specific place
   * @param insertCode inserting new code
   * @param index inserting location
   * @param code original code
   * @param insertRecord use `getInsertRecord()` to get `InsertRecord` object
   * @returns result entire code string
   */ key: "insertCode",
            value: function insertCode(insertCode1, index, code, insertRecord, param) {
                var insertInBack = param === void 0 ? false : param;
                return this.replaceCode(insertCode1, [
                    index,
                    index
                ], code, insertRecord, insertInBack);
            }
        },
        {
            key: "getCodeFragment",
            value: function getCodeFragment(range, code, insertRecord) {
                var prevShift = 0;
                insertRecord.filter(function(v) {
                    return v[0] < range[0];
                }).forEach(function(v) {
                    return prevShift += v[1];
                });
                return code.substring(range[0] + prevShift, range[1] + prevShift);
            }
        }
    ]);
    return HMRAdderBase;
}();
export { HMRAdderBase as default };
