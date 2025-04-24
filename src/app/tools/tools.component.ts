import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Tools } from '../../modeles/outil'; // Adjusted the path to match a typical Angular project structure

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'source', 'actions'];
  dataSource: MatTableDataSource<Tools> = new MatTableDataSource<Tools>([]);

  ngOnInit(): void {
    this.getTools(); // suppose une méthode de récupération
  }

  getTools(): void {
    // Exemple statique, à remplacer par appel à un service
    const dummyData: Tools[] = [
      { id: 'T001', date: new Date('2024-04-01'), source: 'PDF Guide' },
      { id: 'T002', date: new Date(), source: 'Fichier ZIP' }
    ];
    this.dataSource.data = dummyData;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  open() {
    // Ouvre le formulaire d'ajout
    console.log('Ouvrir formulaire');
  }

  editTool(tool: Tools) {
    console.log('Édition', tool);
  }

  deleteTool(id: string) {
    console.log('Suppression de', id);
  }
}
