# NgxPhoneMask

Angular directive for autoformatting international phone numbers.

## Usage
Install via npm:
```shell
npm install ngx-phone-mask-rus
```

Import in your `app.module.ts`:
```ts
import { NgxPhoneMaskModule } from 'ngx-phone-mask';

@NgModule({
  imports: [
    NgxPhoneMaskModule
  ]
})
```

Use it:
```html
<input ngxPhoneMask [(ngModel)]='yourModelName'>
or
<input ngxPhoneMask [formControl]='yourControl'>
or
<input ngxPhoneMask formControlName='yourControlName'>
```

## Contribution
This component is under development. Pull requests and issues (PR's better) are welcome.

To publish:
```
git commit
npm version patch
npm run build
npm publish dist
```