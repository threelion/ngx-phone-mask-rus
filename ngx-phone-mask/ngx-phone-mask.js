import { Directive, ElementRef, HostListener, Input, NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
// const masks = [
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
const masks = [
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
const clean = (number) => {
    return number
        .toString()
        .replace(/[^\d\^]/gm, '');
};
const format = (number) => {
    let /** @type {?} */ lastCharIndex = 0;
    const /** @type {?} */ cleanValue = clean(number);
    const /** @type {?} */ charCount = cleanValue.replace(/\^/gm, '').length;
    if (charCount === 0) {
        return {
            formatted: '',
            cursorPosition: 0
        };
    }
    const /** @type {?} */ mask = masks[charCount - 1];
    if (charCount > 1 && !mask) {
        return null;
    }
    let /** @type {?} */ cursorPosition;
    const /** @type {?} */ formatted = mask.split('').map((c, i) => {
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
        formatted: `${formatted}`,
        cursorPosition
    };
};
class NgxPhoneMaskDirective {
    /**
     * @param {?} input
     */
    constructor(input) {
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
    updateInputView() {
        const /** @type {?} */ input = this.input.nativeElement;
        const /** @type {?} */ cursorPosition = input.selectionStart;
        const /** @type {?} */ value = this._value;
        const /** @type {?} */ valueWithCursor = value.substring(0, cursorPosition) + '^' + value.substring(cursorPosition);
        const /** @type {?} */ formatted = format(valueWithCursor);
        if (!formatted) {
            input.value = this.oldValue;
            return;
        }
        const /** @type {?} */ newValue = formatted.formatted;
        if (newValue != input.value) {
            input.value = newValue;
            input.setSelectionRange(formatted.cursorPosition, formatted.cursorPosition);
        }
        this.oldValue = newValue;
        this.emitValue(newValue);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    emitValue(v) {
        let /** @type {?} */ value;
        switch (this.valueType) {
            case 'clean':
                value = v.replace(/[^\d\+]/gm, '');
                break;
            case 'full':
                value = v;
                break;
        }
        this.onChangeCallback(value);
    }
    /**
     * @return {?}
     */
    onInput() {
        this._value = this.input.nativeElement.value;
        this.updateInputView();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        let /** @type {?} */ value = v ? v : '';
        this._value = value;
        this.updateInputView();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
NgxPhoneMaskDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxPhoneMask]',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NgxPhoneMaskDirective),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
NgxPhoneMaskDirective.ctorParameters = () => [
    { type: ElementRef, },
];
NgxPhoneMaskDirective.propDecorators = {
    'valueType': [{ type: Input },],
    'showMask': [{ type: Input },],
    'onInput': [{ type: HostListener, args: ['input',] },],
};

class NgxPhoneMaskModule {
}
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
NgxPhoneMaskModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { NgxPhoneMaskModule, NgxPhoneMaskDirective as ɵa };
//# sourceMappingURL=ngx-phone-mask.js.map
