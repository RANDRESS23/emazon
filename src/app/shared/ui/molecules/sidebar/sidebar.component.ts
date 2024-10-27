import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { EMPTY_STRING } from '@utils/constants/general';

@Component({
  selector: 'molecule-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  fullName: string = EMPTY_STRING;

  @Input() menuItems: Record<string, string>[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fullName = this.authService.getFullName();
  }

}
