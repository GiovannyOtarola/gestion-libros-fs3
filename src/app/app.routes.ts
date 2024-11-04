import { Routes } from '@angular/router';
import { LibrosListComponent } from './components/libros-list/libros-list.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';

export const routes: Routes = [
    { path: 'libros', component: LibrosListComponent },
    { path: 'libros/nuevo', component: LibroFormComponent },
    { path: 'libros/editar/:id', component: LibroFormComponent }, // Ruta para editar un libro
    { path: '', redirectTo: '/libros', pathMatch: 'full' } // Redirige a /libros por defecto
];