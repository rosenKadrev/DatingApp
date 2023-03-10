import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    @Output() cancelRegister = new EventEmitter()
    public registerForm: FormGroup = new FormGroup({});
    public maxDate: Date = new Date();
    public validationErrors: string[] | undefined;

    constructor(private accountService: AccountService,
        private toastr: ToastrService,
        private fb: FormBuilder,
        private router: Router) { }

    ngOnInit(): void {
        this.initalizeForm();
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    }

    public initalizeForm() {
        this.registerForm = this.fb.group({
            gender: ['male'],
            username: ['', [Validators.required]],
            knownAs: ['', [Validators.required]],
            dateOfBirth: ['', [Validators.required]],
            city: ['', [Validators.required]],
            country: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
            confirmPassword: ['', [Validators.required, this.matchValues('password')]]
        });
        this.registerForm.controls['password'].valueChanges.subscribe({
            next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
        })
    }

    public matchValues(matchTo: string) {
        return (control: AbstractControl) => {
            return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true };
        }
    }

    public register() {
        const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
        const values = { ...this.registerForm.value, dateOfBirth: dob };
        this.accountService.register(values).subscribe({
            next: () => {
                this.router.navigateByUrl('/members')
            },
            error: error => {
                this.validationErrors = error;
            }
        });
    }

    public cancel() {
        this.cancelRegister.emit(false);
    }

    public getDateOnly(dob: string | undefined) {
        if (!dob) return;
        let theDob = new Date(dob);
        return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset()))
            .toISOString()
            .slice(0, 10);
    }
}
