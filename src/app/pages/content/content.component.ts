import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/login/auth.service';
import { ClientService } from '../../services/client/client.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  
  name:string="";
  username:string="";
  
  constructor(
    private authService: AuthService,
    private _client: ClientService
  ) {
    
  }
  ngOnInit(): void {
    this.name = this.authService.getUser();
    let url = `${environment.wsEndpoint}/users`;
    this._client.getUserFromBackend(url).subscribe((data) => {
      this.username = data.response;
    });
  }


}
