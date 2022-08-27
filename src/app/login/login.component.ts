import { Component, OnInit } from "@angular/core";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { AuthService } from "../services/auth/login/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  json: any = null;

  showPasswordInput: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  username = new FormControl('');
  password = new FormControl('')

  invalidLogin: boolean = false;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService
  ) {
    localStorage.clear();
    sessionStorage.clear();
    this.message = "";
  }

  async onSubmit() {
    this.message = "";
    if (this.loginForm.invalid) {
      return;
    }


    const body = new HttpParams()
      .set("username", this.loginForm.value.username!)
      .set("password", this.loginForm.value.password!)
      .set("grant_type", "password")
      .set("client_id", "spring-boot-keycloak")
      .set("client_secret", "")
      .set("scope", "openid");

    let json: any;
    await this.auth.login(body.toString()).then(function (data) {

      json = data;

    });

    if (json.error) {
      this.message = "Invalidate credentials, please try again.";
      return;
    }
    else {
      this.auth.saveToken(json.access_token);
      this.router.navigate(["/"]);
    }

  }

  showPassword() {

    var element = document.getElementById("iconPassword");
    var visibility = document.getElementsByClassName("icon-visibility");
    if (visibility.length > 0) {
      element!!.classList.remove("icon-visibility");
      element!!.classList.add("icon-visibility_off");
      (<HTMLInputElement>document.getElementById('password')).type = 'text';
    }
    else {
      element!!.classList.remove("icon-visibility_off");
      element!!.classList.add("icon-visibility");
      (<HTMLInputElement>document.getElementById('password')).type = 'password';
    }



  }
  ngOnInit() {
    window.sessionStorage.removeItem("token");
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.required],
    });

    const error = this.activatedRoute.snapshot.paramMap.get("error");
    if (error != null) {
      this.message = error;
    }
  }

}
