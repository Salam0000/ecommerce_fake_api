import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) { }
  reactiveForm1: FormGroup = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', Validators.required, Validators.minLength(8)],
    email: ['', Validators.required, Validators.email],
    phone: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
  });
  // not strict ts.config
  ngOnInit(): void {
  }
  onSubmit() {
    const data = this.reactiveForm1.value;
    let model = {
      email: this.reactiveForm1.value.email,
      password: this.reactiveForm1.value.password,
      userName: {
        firstName: this.reactiveForm1.value.firstname,
        lastName: this.reactiveForm1.value.lastname,
      }
    }
    console.log(model);
    console.log(data);
    console.log(this.authService.register(model));
    let token = this.authService.register(model);
    localStorage.setItem('token', token);
    this.reactiveForm1.reset();
  }
}
