(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
	(factory((global['ngx-phone-mask'] = {}),global.ng.core,global.ng.common,global.ng.forms));
}(this, (function (exports,core,common,forms) { 'use strict';

var noop = function () { };
var masks = [
    '1',
    '1 (1',
    '1 (11',
    '1 (111',
    '1 (111) 1',
    '1 (111) 11',
    '1 (111) 11-1',
    '1 (111) 11-11',
    '1 (111) 11-111',
    '1 (111) 111-111',
    '1 (111) 111-11-11',
    '1 (111) 111-111-11'
];
var clean = function (number) {
    return number
        .toString()
        .replace(/[^\d\^]/gm, '');
};
var format = function (number) {
    var /** @type {?} */ lastCharIndex = 0;
    var /** @type {?} */ cleanValue = clean(number);
    var /** @type {?} */ charCount = cleanValue.replace(/\^/gm, '').length;
    if (charCount === 0) {
        return {
            formatted: '',
            cursorPosition: 0
        };
    }
    var /** @type {?} */ mask = masks[charCount - 1];
    if (charCount > 1 && !mask) {
        return null;
    }
    var /** @type {?} */ cursorPosition;
    var /** @type {?} */ formatted = mask.split('').map(function (c, i) {
        if (c === '1') {
            if (cleanValue[lastCharIndex] == '^') {
                cursorPosition = i + 1;
                lastCharIndex++;
            }
            lastCharIndex++;
            return cleanValue[lastCharIndex - 1];
        }
        else {
            return c;
        }
    }).join('');
    if (!cursorPosition) {
        cursorPosition = formatted.length;
    }
    cursorPosition++; // because of '+'
    return {
        formatted: "+" + formatted,
        cursorPosition: cursorPosition
    };
};
var NgxPhoneMaskDirective = (function () {
    /**
     * @param {?} input
     */
    function NgxPhoneMaskDirective(input) {
        this.input = input;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.valueType = 'clean';
        this.showMask = true;
        this.oldValue = '';
    }
    /**
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.updateInputView = function () {
        var /** @type {?} */ input = this.input.nativeElement;
        var /** @type {?} */ cursorPosition = input.selectionStart;
        var /** @type {?} */ value = this._value;
        var /** @type {?} */ valueWithCursor = value.substring(0, cursorPosition) + '^' + value.substring(cursorPosition);
        var /** @type {?} */ formatted = format(valueWithCursor);
        if (!formatted) {
            input.value = this.oldValue;
            return;
        }
        var /** @type {?} */ newValue = formatted.formatted;
        if (newValue != input.value) {
            input.value = newValue;
            input.setSelectionRange(formatted.cursorPosition, formatted.cursorPosition);
        }
        this.oldValue = newValue;
        this.emitValue(newValue);
    };
    /**
     * @param {?} v
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.emitValue = function (v) {
        var /** @type {?} */ value;
        switch (this.valueType) {
            case 'clean':
                value = v.replace(/[^\d\+]/gm, '');
                break;
            case 'full':
                value = v;
                break;
        }
        this.onChangeCallback(value);
    };
    /**
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.onInput = function () {
        this._value = this.input.nativeElement.value;
        this.updateInputView();
    };
    Object.defineProperty(NgxPhoneMaskDirective.prototype, "value", {
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            var /** @type {?} */ value = v ? v : '';
            this._value = value;
            this.updateInputView();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    return NgxPhoneMaskDirective;
}());
NgxPhoneMaskDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[ngxPhoneMask]',
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return NgxPhoneMaskDirective; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
NgxPhoneMaskDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
NgxPhoneMaskDirective.propDecorators = {
    'valueType': [{ type: core.Input },],
    'showMask': [{ type: core.Input },],
    'onInput': [{ type: core.HostListener, args: ['input',] },],
};
var NgxPhoneMaskModule = (function () {
    function NgxPhoneMaskModule() {
    }
    return NgxPhoneMaskModule;
}());
NgxPhoneMaskModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                declarations: [NgxPhoneMaskDirective],
                exports: [NgxPhoneMaskDirective]
            },] },
];
/**
 * @nocollapse
 */
NgxPhoneMaskModule.ctorParameters = function () { return []; };

exports.NgxPhoneMaskModule = NgxPhoneMaskModule;
exports.ɵa = NgxPhoneMaskDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-phone-mask.umd.js.map
