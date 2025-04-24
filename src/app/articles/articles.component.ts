import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PubService } from 'src/services/pub.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalPubComponent } from '../modal-pub/modal-pub.component';
import { MoalMemberComponent } from '../modal-mem/modal-mem.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'type', 'titre', 'lien', 'date', 'sourcePdf', 'actions'];

  constructor(private PS: PubService, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this.PS.GetAllPub().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open(): void {
    const dialogRef = this.dialog.open(ModalPubComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.PS.createPub(result).subscribe(() => {
          this.fetchData();
        });
      }
    });
  }

  openMemberModal(publication: any): void {
    const dialogRef = this.dialog.open(MoalMemberComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(memberId => {
      if (memberId) {
        this.PS.ajouterMembreAPublication(publication.id, memberId).subscribe(() => {
          this.fetchData();
        });
      }
    });
  }
}
