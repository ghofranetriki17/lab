import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';
import { EventService } from 'src/services/event.service';
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
  NB_Students: number = 0;
  NB_Teachers: number = 0;

  chartDataPie: ChartDataset[] = [];
  chartLabelsPie: string[] = ['Students', 'Teachers'];
  chartOptionsPie: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
  };

  constructor(
    private memberService: MemberService,
    private eventService: EventService,
    private pubService: PubService
  ) {}

  ngOnInit(): void {
    // 🔁 Loop through members to count students and teachers
    this.memberService.GetAllMembers().subscribe((response: any[]) => {
      this.NB_Members = response.length;

      this.NB_Students = 0;
      this.NB_Teachers = 0;

      response.forEach(member => {
        if (member.type.toLowerCase() === 'student') {
          this.NB_Students++;
        } else if (member.type.toLowerCase() === 'teacher') {
          this.NB_Teachers++;
        }
      });

      // ✅ Update pie chart data
      this.chartDataPie = [
        {
          label: 'Members by Type',
          data: [this.NB_Students, this.NB_Teachers],
          backgroundColor: ['#36A2EB', '#FF6384']
        }
      ];
    });

    this.pubService.GetAllPub().subscribe((response: any[]) => {
      this.NB_Pubs = response.length;
    });

    this.eventService.GetAllEvents().subscribe((response: any[]) => {
      this.NB_Events = response.length;
    });
  }
}
