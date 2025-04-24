import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/services/member.service';
import { EventService } from 'src/services/event.service';
import { PubService } from 'src/services/pub.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Evt } from 'src/modeles/Evt';
import { Member } from 'src/modeles/Member'; // make sure tabEvent is in this interface

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

  // Pie & Doughnut for Members
  chartLabelsPie: string[] = ['Students', 'Teachers'];
  chartDataPie: ChartDataset[] = [];
  chartDataDoughnut: ChartDataset[] = [];
  chartLabelsDoughnut: string[] = ['Students', 'Teachers'];

  // Doughnut for Events by Location
  chartLabeldoughnuts: string[] = [];
  chartDatadoughnut: ChartDataset[] = [];

  // Line Chart: Events per Member
  chartLabelsline: string[] = [];
  chartDataline: ChartDataset[] = [];

  // Shared chart options
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Chart Data'
      }
    }
  };
  chartLabelsBarLieu: string[] = [];
  chartDataBarLieu: ChartDataset[] = [];
  
  chartOptionsBarLieu: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Nombre d\'événements par lieu'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Lieu'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nombre d\'événements'
        }
      }
    }
  };
  
  chartOptionsPie: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  chartOptionsDoughnut: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  constructor(
    private memberService: MemberService,
    private eventService: EventService,
    private pubService: PubService
  ) {}
  ngOnInit(): void {
    // 🧍 Get Members and calculate stats
    this.memberService.GetAllMembers().subscribe((response: Member[]) => {
      this.NB_Members = response.length;
      this.NB_Students = 0;
      this.NB_Teachers = 0;
  
      const memberNames: string[] = [];
      const eventCounts: number[] = [];
  
      response.forEach(member => {
        if (member.type.toLowerCase() === 'student') {
          this.NB_Students++;
        } else if (member.type.toLowerCase() === 'teacher') {
          this.NB_Teachers++;
        }
  
        memberNames.push(member.name);
        eventCounts.push(member.tabEvent ? member.tabEvent.length : 0);
      });
  
      const memberData = [this.NB_Students, this.NB_Teachers];
      const memberColors = ['#36A2EB', '#FF6384'];
  
      this.chartDataPie = [
        {
          label: 'Members by Type (Pie)',
          data: memberData,
          backgroundColor: memberColors
        }
      ];
  
      this.chartDataDoughnut = [
        {
          label: 'Members by Type (Doughnut)',
          data: memberData,
          backgroundColor: memberColors
        }
      ];
  
      this.chartLabelsline = memberNames;
      this.chartDataline = [
        {
          label: 'Number of Events per Member',
          data: eventCounts,
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66,165,245,0.2)',
          fill: true,
          tension: 0.3
        }
      ];
    });
  
    // 📍 Events by Lieu
    this.eventService.GetAllEvents().subscribe((events: Evt[]) => {
      this.NB_Events = events.length;
  
      const lieuCounts: { [lieu: string]: number } = {};
  
      events.forEach(event => {
        const lieu = event.lieu || 'Unknown';
        lieuCounts[lieu] = (lieuCounts[lieu] || 0) + 1;
      });
  
      this.chartLabeldoughnuts = Object.keys(lieuCounts);
      const data = Object.values(lieuCounts);
  
      const colors = this.chartLabeldoughnuts.map(() =>
        '#' + Math.floor(Math.random() * 16777215).toString(16)
      );
  
      this.chartDatadoughnut = [
        {
          label: 'Events by Location (Doughnut)',
          data,
          backgroundColor: colors
        }
      ];
  
      // ✅ Bar Chart (MUST BE INSIDE this.eventService callback)
      this.chartLabelsBarLieu = Object.keys(lieuCounts);
      this.chartDataBarLieu = [
        {
          label: 'Événements par lieu',
          data: Object.values(lieuCounts),
          backgroundColor: '#42A5F5'
        }
      ];
    });
  
    // 📚 Publications Count
    this.pubService.GetAllPub().subscribe((response: any[]) => {
      this.NB_Pubs = response.length;
    });
  }
  
}
