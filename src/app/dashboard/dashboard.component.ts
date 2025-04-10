import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';       // Idem pour tool
import { EventService } from 'src/services/event.service';     // Et pour event
import { Pub } from 'src/modeles/Pub';
import { PubService } from 'src/services/pub.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  NB_Members: number = 0;
  NB_Articles: number = 0;
  NB_Pubs: number = 0;
  NB_Events: number = 0;
  NB_Students: number = 5;
  NB_Teachers: number = 10;
  chartDataPie: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: [ this.NB_Students, this.NB_Teachers ],
    }
  ];
  chartLabelsPie: string[] = ['Techer','Student'];
  chartOptionsPie: ChartOptions = {}; 
  constructor(
    private memberService: MemberService,
    private eventService: EventService,
    private pubService:PubService


  ) {}

  ngOnInit(): void {
    this.memberService.GetAllMembers().subscribe((response: any[]) => {
      this.NB_Members = response.length;
    });

    this.pubService.GetAllPub().subscribe((response: any[]) => {
      this.NB_Pubs = response.length;
    });
 

    this.eventService.GetAllEvents().subscribe((response: any[]) => {
      this.NB_Events = response.length;
    });
  }
}
