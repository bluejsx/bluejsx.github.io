import { Parser } from 'acorn';
import jsx from 'acorn-jsx';
import HMRAdderBase from './HMRAdderBase';
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for(var i = 0, arr2 = new Array(arr.length); i < arr.length; i++){
            arr2[i] = arr[i];
        }
        return arr2;
    }
}
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
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
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
var _hotListenerInfo;
var a = {
    info: {
        './cefce/c.edas': {
            imports: {
                default: 'Unko',
                'AAA': "AAA"
            },
            src: './cefce/c.edas'
        }
    },
    varNames: [
        {
            name: 'Unko',
            info: {
                imports: {
                    default: 'Unko',
                    'AAA': "AAA"
                },
                src: './cefce/c.edas'
            }
        }
    ]
};
var HMRAdderAcron = /*#__PURE__*/ function(HMRAdderBase1) {
    "use strict";
    _inherits(HMRAdderAcron, HMRAdderBase1);
    function HMRAdderAcron() {
        _classCallCheck(this, HMRAdderAcron);
        var _this;
        _this = _possibleConstructorReturn(this, _getPrototypeOf(HMRAdderAcron).call(this));
        _this.MyParser = Parser.extend(jsx());
        return _this;
    }
    _createClass(HMRAdderAcron, [
        {
            key: "transform",
            value: function transform(code) {
                code = code.replace(/addEventListener/g, 'on').replace(/=>/g, '=> ');
                var program = this.MyParser.parse(code, {
                    ecmaVersion: 'latest',
                    sourceType: "module"
                });
                var originalCode = code;
                var imports = this.getImports(program.body);
                var exportedFuncs = this.getExportedFunctions(program.body);
                var insertRecord = this.getInsertRecord();
                exportedFuncs.forEach((function(funcNode) {
                    var start = funcNode.start, end = funcNode.end;
                    var funcCode = this.getCodeFragment([
                        start,
                        end
                    ], code, insertRecord);
                    var jsxComponents = this.getDependentJSXComponents(funcCode, imports);
                    //const refObjName = 
                    code = this.replaceCode(this.processFunctionCode(jsxComponents, funcNode, funcCode, originalCode), [
                        start,
                        end
                    ], code, insertRecord);
                }).bind(this));
                console.log(code)
                return code;
            }
        },
        {
            key: "complementRef",
            value: function complementRef(funcCode, funcNode, insertRecord) {
                //const insertRecord = this.getInsertRecord()
                var refMatches = _toConsumableArray(funcCode.matchAll(/ref={ *\[ *([A-z_]+) *, *["'`][A-z_]+["'`]/g)).map(function(v) {
                    return v[1];
                });
                var refObjName = refMatches[0];
                // const refMatch = funcCode.matchAll(/ref={ *\[ *([A-z_]+) *, *["'`][A-z_]+["'`]/g)[0]
                // let refObjName = refMatch[1]
                var directReturnAfterArrowIndex = funcCode.search(/=>[ \n]*\(?[ \n]*</) + 2;
                var directFunctionReturnRetIndex = funcCode.search(/return *\(?</);
                var insertHotListenerPlace = funcCode.lastIndexOf('return');
                var isDirectReturnJSX = directReturnAfterArrowIndex !== 1;
                if (directReturnAfterArrowIndex !== 1) {
                    insertHotListenerPlace = funcCode.length;
                    refObjName = 'refs';
                    var retC = '\nreturn self}';
                    funcCode = this.insertCode(retC, funcCode.length, funcCode, insertRecord);
                    funcCode = this.insertCode('{', directReturnAfterArrowIndex, funcCode, insertRecord);
                    funcCode = this.insertCode('const refs={};const self=', directReturnAfterArrowIndex + 2, funcCode, insertRecord);
                //funcCode = this.complementReturn(funcCode, directReturnAfterArrowIndex, insertRecord)
                } else if (directFunctionReturnRetIndex !== -1) {
                    refObjName = 'refs';
                    insertHotListenerPlace = funcCode.length - 1;
                    var retC = '\nreturn self';
                    funcCode = this.insertCode(retC, funcCode.length - 1, funcCode, insertRecord);
                    funcCode = this.replaceCode('const refs={};const self=', [
                        directFunctionReturnRetIndex,
                        directFunctionReturnRetIndex + 6
                    ], funcCode, insertRecord);
                }
                return {
                    funcCode: funcCode,
                    refObjName: refObjName,
                    insertHotListenerPlace: insertHotListenerPlace,
                    directReturnAfterArrowIndex: directReturnAfterArrowIndex
                };
            }
        },
        {
            key: "insertUpdateDef",
            value: function insertUpdateDef(funcNode, funcCode, insertHotListenerPlace, directReturnAfterArrowIndex, insertRecord) {
                var bodyNodes = funcNode.body.body;
                var paramNode = funcNode.params[0];
                if (paramNode) {
                    var pStart = paramNode.start - funcNode.start;
                    var pEnd = paramNode.end - funcNode.start;
                    var paramCode = funcCode.substring(pStart, pEnd);
                    funcCode = this.replaceCode('params', [
                        pStart,
                        pEnd
                    ], funcCode, insertRecord);
                    var firstBodyIndex = directReturnAfterArrowIndex === 1 ? funcNode.body.start - funcNode.start + 1 : directReturnAfterArrowIndex + 1;
                    funcCode = this.insertCode("\nlet ".concat(paramCode, "=params;"), firstBodyIndex, funcCode, insertRecord);
                }
                var retNode = bodyNodes === null || bodyNodes === void 0 ? void 0 : bodyNodes.find(function(v) {
                    return v.type === 'ReturnStatement';
                });
                var selfVarName = 'self';
                if (retNode) {
                    if (retNode.argument.type === 'Identifier') selfVarName = retNode.argument.name;
                // for (const varDecNode of bodyNodes.filter(v => v.type === 'VariableDeclaration')) {
                //   for (const varDeclarator of varDecNode.declarations) {
                //     if (varDeclarator.id.name === selfVarName) {
                //       insertPlace = varDeclarator.end
                //       break
                //     }
                //   }
                // }
                //const selfDec = bodyNodes.filter(v=>v.type==='VariableDeclaration'&&v.declarations[0].id.name===selfVarName)
                }
                funcCode = this.insertCode("\n".concat(selfVarName, ".").concat(this.UPDATE_LISTENER_FUNC_NAME, " = (Comp) =>{\n  const newElem=Comp(params);console.error('updating', Comp)\n  ").concat(selfVarName, ".before(newElem);\n  ").concat(selfVarName, ".remove();\n}\n"), insertHotListenerPlace, funcCode, insertRecord);
                return funcCode;
            }
        },
        {
            key: "processFunctionCode",
            value: function processFunctionCode(jsxComponents, funcNode, funcCode, wholeCode) {
                var insertRecord = this.getInsertRecord();
                var originalFuncCode = funcCode;
                var bodyNodes = funcNode.body.body;
                var ref = this.complementRef(funcCode, funcNode, insertRecord), funcCode_r = ref.funcCode, refObjName = ref.refObjName, insertHotListenerPlace = ref.insertHotListenerPlace, directReturnAfterArrowIndex = ref.directReturnAfterArrowIndex;
                funcCode = funcCode_r;
                funcCode = this.insertUpdateDef(funcNode, funcCode, insertHotListenerPlace, directReturnAfterArrowIndex, insertRecord);
                var hotListenerInfo = {
                };
                var c = 0;
                jsxComponents.forEach((function(jsxComponent) {
                    var updateInitializeLines = '';
                    var jsxNode = jsxComponent.node;
                    var _openingElement = jsxNode.openingElement, attributes = _openingElement.attributes;
                    var refNode = attributes.find(function(value) {
                        return value.name.name === 'ref';
                    });
                    if (refNode) {
                        jsxComponent.refName = refNode.value.expression.elements[1].value;
                        // 
                        bodyNodes.forEach(function(param) {
                            var type = param.type, start = param.start, end = param.end;
                            var relStart = start - funcNode.start, relEnd = end - funcNode.start;
                            var statement = originalFuncCode.substring(relStart, relEnd);
                            if (type === 'ExpressionStatement' && originalFuncCode.indexOf(jsxComponent.refName, relStart) === relStart) {
                                updateInitializeLines += "".concat(refObjName, ".").concat(statement, ";");
                            }
                        });
                        _toConsumableArray(originalFuncCode.matchAll(new RegExp(jsxComponent.refName, 'g'))).forEach((function(v) {
                            try {
                                var varNode = this.MyParser.parseExpressionAt(originalFuncCode, v.index, {
                                    ecmaVersion: 'latest',
                                    sourceType: "module"
                                });
                                if (varNode.type === 'AssignmentExpression' || varNode.type === 'CallExpression') {
                                    funcCode = this.insertCode("".concat(refObjName, "."), v.index, funcCode, insertRecord);
                                }
                            } catch (e) {
                            }
                        //console.log(originalFuncCode[v.index])
                        //if (this.MyParser.parseExpressionAt(originalFuncCode, v.index, { ecmaVersion: 'latest', sourceType: "module" })?.type === 'Identifier') {
                        //}
                        }).bind(this));
                    } else {
                        jsxComponent.refName = "bjsxc_".concat(c++);
                        funcCode = this.insertCode(" ref={[".concat(refObjName, ",'").concat(jsxComponent.refName, "']} "), jsxNode.start + jsxComponent.name.length + 1, funcCode, insertRecord);
                    }
                    var _src;
                    (_src = (_hotListenerInfo = hotListenerInfo)[jsxComponent.info.src]) !== null && _src !== void 0 ? _src : _hotListenerInfo[jsxComponent.info.src] = {
                        varMapCode: '',
                        listenCode: ''
                    };
                    var o = hotListenerInfo[jsxComponent.info.src];
                    o.varMapCode += "".concat(jsxComponent.info.imports[jsxComponent.name], ":").concat(jsxComponent.name, ",");
                    o.listenCode += "".concat(refObjName, ".").concat(jsxComponent.refName, "=").concat(refObjName, ".").concat(jsxComponent.refName, ".").concat(this.UPDATE_LISTENER_FUNC_NAME, "(").concat(jsxComponent.name, ");").concat(updateInitializeLines);
                }).bind(this));
                var hotListenerCode = '';
                var listenerAdded = false;
                for(var src in hotListenerInfo){
                    listenerAdded || (listenerAdded = true);
                    var listenerData = hotListenerInfo[src];
                    hotListenerCode += "import.meta.hot.accept('".concat(src, "',({").concat(listenerData.varMapCode, "})=>{").concat(listenerData.listenCode, "});");
                }
                if (listenerAdded) {
                    hotListenerCode = "\nif(import.meta.hot){".concat(hotListenerCode, "}");
                }
                funcCode = this.insertCode(hotListenerCode, insertHotListenerPlace, funcCode, insertRecord);
                return funcCode;
            }
        },
        {
            key: "getImports",
            value: function getImports(body) {
                var imports = {
                    varNames: [],
                    info: {
                    }
                };
                body.filter(function(v) {
                    return v.type === 'ImportDeclaration';
                }).forEach(function(v) {
                    var info = {
                        src: v.source.value,
                        imports: {
                        }
                    };
                    imports.info[v.source.value] = info;
                    v.specifiers.forEach(function(specifier) {
                        var name = specifier.local.name;
                        if (specifier.type === 'ImportDefaultSpecifier') {
                            //info.imports.default = name
                            info.imports[name] = 'default';
                        } else if (specifier.type === 'ImportSpecifier') {
                            //info.imports[specifier.imported.name] = name
                            info.imports[name] = specifier.imported.name;
                        }
                        imports.varNames.push({
                            name: name,
                            info: info
                        });
                    });
                });
                return imports;
            }
        },
        {
            key: "getExports",
            value: function getExports(body) {
                return body.filter(function(v) {
                    return v.type === 'ExportDefaultDeclaration' || v.type === 'ExportNamedDeclaration';
                });
            }
        },
        {
            key: "getExportedFunctions",
            value: function getExportedFunctions(body) {
                var funcNodes = [];
                var filterFuncs = function(node) {
                    if (node.type === 'FunctionDeclaration' || node.type === 'ArrowFunctionExpression') funcNodes.push(node);
                    else if (node.type === 'VariableDeclaration') node.declarations.forEach(function(v) {
                        return filterFuncs(v.init);
                    });
                };
                body.forEach(function(v) {
                    if (v.type === 'ExportDefaultDeclaration' || v.type === 'ExportNamedDeclaration') {
                        var declaration = v.declaration;
                        if (declaration) {
                            filterFuncs(declaration);
                        }
                    }
                });
                return funcNodes;
            }
        },
        {
            /** returns list of  */ key: "getDependentJSXComponents",
            value: function getDependentJSXComponents(code, imports) {
                var jsxInfo = [];
                _toConsumableArray(code.matchAll(/<([A-Z][A-z_]*)/g)).forEach((function(v) {
                    var compName = v[1];
                    imports.varNames.forEach((function(i) {
                        if (i.name === compName) {
                            var importedJSXData = {
                                name: compName,
                                info: i.info,
                                node: this.MyParser.parseExpressionAt(code, v.index, {
                                    ecmaVersion: 'latest',
                                    sourceType: "module"
                                })
                            };
                            jsxInfo.push(importedJSXData);
                        }
                    }).bind(this));
                //return imports.varNames.filter(v=>v.name===compName)
                }).bind(this));
                return jsxInfo;
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
        }
    ]);
    return HMRAdderAcron;
}(HMRAdderBase);
export { HMRAdderAcron as default };
