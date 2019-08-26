import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Reviewer } from '../reviewer';
import { ProfileService } from '../profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.css']
})
export class NewaccountComponent implements OnInit {
  public role= "";
  reviewer:Reviewer=new Reviewer();
  profileFormGroup:FormGroup;
  verifyFormGroup:FormGroup;
  hide=true;
  validation_messages = {
    'name': [
      { type: 'required', message: 'name is required' },
      { type: 'maxlength', message: 'name cannot be more than 20 characters long' },
      { type: 'pattern', message: 'name must contain only numbers and letters' },
      { type: 'validUsername', message: 'name has already been taken' }
    ],
    'emailId': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'reconfirmPassword': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Password must contain atleast 1 uppercase,1 lowercase,and 1 number' }
    ]
    }

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private profileService:ProfileService,private fb:FormBuilder) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      // console.log(params);
      this.role=params['role'];
      console.log(" from newaccount componenent "+this.role);
     
    });
    this.profileFormGroup=this.fb.group({
      name:['',Validators.compose([Validators.required,Validators.maxLength(20)])],
      emailId:['',Validators.compose([Validators.required,Validators.pattern('[a-z0-9._%+-]{1,40}[@]{1}[a-z]{1,10}[.]{1}[a-z]{3}')
    ])]
    });

    this.verifyFormGroup=this.fb.group({
      password:['',Validators.compose([
        Validators.minLength(5),
        Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
      reconfirmPassword:['',Validators.required]
    },
    {Validators:passwordMatchValidator});

    function passwordMatchValidator(group:FormGroup)
    {
      let pass = group.controls.password.value;
      let confirmPass = group.controls.passwordConfirm.value;
      return pass === confirmPass ? null : { mismatch: true }
    }
  }
  

//   onClickS(name,emailId,reconfirmPassword):any
//   {
//     this.reviewer.emailId=emailId;
//     this.reviewer.name=name;
//     this.reviewer.reconfirmPassword=reconfirmPassword;
//     this.reviewer.role=this.role;
//     if(this.role == 'reviewer'){
//     this.profileService.saveReviewer(this.reviewer).
//     subscribe(
//       data => {
//         console.log("POST Request is successful ", data);},
//         error => {
//         alert("Invalid")
//         console.log("Error", error);} 

// );
//         }
//         else if(this.role == 'product-owner'){
//           this.profileService.saveProductowner(this.reviewer).
//     subscribe(
//       data => {
//         console.log("POST Request is successful ", data);},
//         error => {
//         alert("Invalid")
//         console.log("Error", error);} 

// );

//     console.log("Reviewer "+this.reviewer);
//     this.router.navigateByUrl("/");
//         }

//     console.log("Reviewer "+this.reviewer);
//     this.router.navigateByUrl("/");
    
//   }

name="";
emailId="";

  saveReviewer()
  {
    // this.reviewer.name=this.profileFormGroup.controls.name.value;
    // this.reviewer.emailId=this.profileFormGroup.controls.emailId.value;
    // this.reviewer.role=this.role;
    this.name=this.profileFormGroup.controls.name.value;
    this.emailId=this.profileFormGroup.controls.emailId.value;
    console.log("from saveReviewer : "+this.reviewer);
  }
  
  saveReviewer1()
  {
    this.reviewer.name=this.name;
    this.reviewer.emailId=this.emailId;
    this.reviewer.role=this.role;
    this.reviewer.reconfirmPassword=this.verifyFormGroup.controls.reconfirmPassword.value;
     console.log("ppppppppppppppp"+this.reviewer.role);
    if(this.role == 'reviewer'){
    this.profileService.saveReviewer(this.reviewer).
     subscribe(data =>{
      console.log("POST Request is successful ", data);
     },
     error => {
            // alert("Invalid")
            console.log("Error", error);}
      );
    console.log("fron saveReviewer1"+this.reviewer);
     }

     else if(this.role == 'product-owner'){
      this.profileService.saveProductowner(this.reviewer).
     subscribe(data => {
      console.log("POST Request is successful ", data);},
      error => {
      // alert("Invalid")
      console.log("Error", error);} 

);
  }
}
follow()
  {
    this.router.navigateByUrl("/");
  }
  
  logoclick(){
    this.router.navigateByUrl("/");
   }
}
