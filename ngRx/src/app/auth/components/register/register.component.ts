import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../../modules/angular-material/angular-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { register } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import { selectIsSubmitting } from '../../store/reducers';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterLink,
    HttpClientModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AuthService]
})
export class RegisterComponent implements OnInit{
  registerForm :FormGroup ;
  isSubmitting$ = this._store.select(selectIsSubmitting)
  constructor(private _formBulder: FormBuilder, private _store: Store, private _authService: AuthService){}

  ngOnInit(): void {
    this.registerForm =  this._formBulder.nonNullable.group({
      username: ['',[Validators.required]],
      email: ['', [Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  signUp(){
    console.log("Form Values: ", this.registerForm.value)
    const request : RegisterRequestInterface = {
      user: this.registerForm.value
    }
    this._store.dispatch(register({request}))
    this._authService.register(request).subscribe(res=>console.log("Resp: ", res))
  }
}
