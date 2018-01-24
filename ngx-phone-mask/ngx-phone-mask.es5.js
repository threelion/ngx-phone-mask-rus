import { Directive, ElementRef, HostListener, Input, NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var noop = function () { };
// var masks = [
//     '1',
//     '1 (1',
//     '1 (11',
//     '1 (111',
//     '1 (111) 1',
//     '1 (111) 11',
//     '1 (111) 11-1',
//     '1 (111) 11-11',
//     '1 (111) 11-111',
//     '1 (111) 111-111',
//     '1 (111) 111-11-11',
//     '1 (111) 111-111-11'
// ];
var masks = [
    ' (1',
    ' (11',
    ' (111',
    ' (111) 1',
    ' (111) 11',
    ' (111) 11-1',
    ' (111) 11-11',
    ' (111) 11-111',
    ' (111) 111-111',
    ' (111) 111-11-11'/*,
    ' (111) 111-111-11'*/
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
    // cursorPosition++; // because of '+'
    return {
        formatted: formatted,
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
    { type: Directive, args: [{
                selector: '[ngxPhoneMask]',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return NgxPhoneMaskDirective; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
NgxPhoneMaskDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
NgxPhoneMaskDirective.propDecorators = {
    'valueType': [{ type: Input },],
    'showMask': [{ type: Input },],
    'onInput': [{ type: HostListener, args: ['input',] },],
};
var NgxPhoneMaskModule = (function () {
    function NgxPhoneMaskModule() {
    }
    return NgxPhoneMaskModule;
}());
NgxPhoneMaskModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [NgxPhoneMaskDirective],
                exports: [NgxPhoneMaskDirective]
            },] },
];
/**
 * @nocollapse
 */
NgxPhoneMaskModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { NgxPhoneMaskModule, NgxPhoneMaskDirective as ɵa };
//# sourceMappingURL=ngx-phone-mask.es5.js.map
