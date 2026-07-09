import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormDefinitions } from '../model/FormDefinition';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  @Input() formConfig!: FormDefinitions<any>[];
  @Input() submitLabel: string = 'Submit';
  @Output() formSubmit = new EventEmitter<any>();
  form!: FormGroup;
  private _data: any;
  @Input()
  set data(value: any) {
    this._data = value;
    this.patchForm(value);
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    console.log('FORM CREATED:', this.form);
    if (this._data) {
      this.patchForm(this._data);
    }
  }

  buildForm() {
    let formControls: any = {};
    this.formConfig.forEach((field) => {
      //null è il valore di default
      formControls[field.name] = [null, field.validators || []];
    });
    this.form = this.fb.group(formControls);
  }

  private patchForm(value: any): void {
    if (!this.form || !value) {
      return;
    }

    const patch: any = {};

    this.formConfig.forEach(field => {
      patch[field.name] = value[field.name];
    });

    this.form.patchValue(patch);
  }


  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      console.log(this.form.value);
    }
  }
}
