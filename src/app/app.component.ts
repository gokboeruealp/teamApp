import { Component } from '@angular/core';
import { EMPTY, empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Team Generator';

  newMemberName = "";
  members: string[] = [];
  errorMessage = '';
  numberOfTeams: number | string = '';
  teams: string[][] = [];

  onInput(member: string) {
    this.newMemberName = member;
  }

  addMember() {
    if (!this.newMemberName) {
      this.errorMessage = "Name Can't Be Empty!";
      return;
    }
    this.errorMessage = '';
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }

  onNumberOfTeamsInput(value: string) {
    this.numberOfTeams = Number(value);
  }

  generateTeams() {
    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMessage = "Invalid Number of Teams";
      return;
    }

    if(this.members.length < this.numberOfTeams)
    {
      this.errorMessage = "Not Enough Members";
      return;
    }

    this.errorMessage = "";

    const allMembers = [...this.members]
    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];

        if(!member) break;
        if (this.teams[i]) {
          this.teams[i].push(member);
        }
        else {
          this.teams[i] = [member];
        }
      }
    }

    this.members = [];
    this.numberOfTeams = "";
  }
}
