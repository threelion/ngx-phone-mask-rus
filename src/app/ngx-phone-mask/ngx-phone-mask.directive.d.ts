import { ElementRef } from '@angular/core';
export declare class NgxPhoneMaskDirective {
    private input;
    private onTouchedCallback;
    private onChangeCallback;
    valueType: 'clean' | 'full';
    showMask: boolean;
    disabled: any;
    private _value;
    private oldValue;
    constructor(input: ElementRef);
    updateInputView(): void;
    emitValue(v: any): void;
    onInput(): void;
    value: any;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: any): void;
}
