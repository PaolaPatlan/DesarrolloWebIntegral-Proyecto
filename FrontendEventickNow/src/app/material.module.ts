import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos de material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'; // Importa el módulo MatListModule



  



const modulos: any = [
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatGridListModule,
  MatSelectModule,
  MatMenuModule,
  MatToolbarModule
]

@NgModule({

    imports: [... modulos, CommonModule],
    exports: [... modulos]
  
})
export class MaterialModule { }
