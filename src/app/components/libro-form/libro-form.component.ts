import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService, Libro } from '../../servicios/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-libro-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './libro-form.component.html',
    styleUrls: ['./libro-form.component.css']
})
export class LibroFormComponent implements OnInit {
    libroForm: FormGroup;
    libroId: number = 0;
    isEditMode = false; // Variable para verificar si estamos en modo edición
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private backendService: BackendService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.libroForm = this.fb.group({
            titulo: ['', Validators.required],
            autor: ['', Validators.required],
            añoPublicacion: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
            genero: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.libroId = id ? Number(id) : 0; // Asignación como número, 0 si no se encuentra
        this.isEditMode = this.libroId > 0; // Verifica si es modo edición basado en si libroId es positivo
    
        if (this.isEditMode) {
            // Cargar datos del libro para edición
            this.backendService.getLibro(this.libroId).subscribe({
                next: (libro) => this.libroForm.patchValue(libro),
                error: (err) => {
                    console.error('Error al cargar libro para edición:', err);
                    this.errorMessage = 'Error al cargar el libro. Intente nuevamente.';
                }
            });
        }
    }

    onSubmit(): void {
        if (this.libroForm.valid) {
            const libro: Libro = this.libroForm.value;
            this.errorMessage = null;
    
            if (this.isEditMode) {
                this.backendService.updateLibro(this.libroId, libro).subscribe({
                    next: () => {
                        alert('Libro actualizado con éxito');
                        this.router.navigate(['/libros']);
                    },
                    error: (err) => {
                        console.error('Error al actualizar el libro:', err);
                        this.errorMessage = 'No se pudo actualizar el libro. Intente nuevamente.';
                    }
                });
            } else {
                this.backendService.addLibro(libro).subscribe({
                    next: () => {
                        alert('Libro agregado con éxito');
                        this.router.navigate(['/libros']);
                    },
                    error: (err) => {
                        console.error('Error al agregar el libro:', err);
                        this.errorMessage = 'No se pudo agregar el libro. Intente nuevamente.';
                    }
                });
            }
        } else {
            this.errorMessage = 'Por favor, complete todos los campos requeridos.';
        }
    }
     cancelar(): void {
        this.router.navigate(['/libros']); // Redirige a la lista de libros
    }
    // Método para mostrar los mensajes de error
    getErrorMessage(controlName: string): string {
        const control = this.libroForm.get(controlName);
        if (control?.hasError('required')) {
            return 'Este campo es requerido';
        }
        if (controlName === 'añoPublicacion' && (control?.hasError('min') || control?.hasError('max'))) {
            return 'Año de publicación debe ser entre 1000 y 9999';
        }
        return '';
    }
}
