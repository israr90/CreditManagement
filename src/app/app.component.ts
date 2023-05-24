import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityServiceService } from 'src/app/services/utility-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private utilityServiceService: UtilityServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // this.getUserAuthication();
  }
  // getUserAuthication(): any {
  //   this.utilityServiceService.isLogged().then((result: boolean) => {
  //     if (!result) {
  //       this.router.navigateByUrl('/login');
  //     } else {
  //       //  this.router.navigateByUrl('/br');
  //     }
  //   });
  // }
}
