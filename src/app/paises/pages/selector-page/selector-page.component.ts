import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    frontera: ['', [Validators.required]], // o
    // frontera: [{ value: '', disabled: true }, [Validators.required]],
  });

  // llenarSelectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  // fronteras: string[] = [];
  fronteras: PaisSmall[] = [];

  //UI
  cargando: boolean = false;

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        // cada vez que se cambie la region se resetea los paises y no quedan seleccionados
        tap(() => {
          this.paises = [];
          this.miFormulario.get('pais')?.reset('');
          // this.miFormulario.get('frontera')?.disable();
          this.cargando = true;
        }),
        switchMap((region) => this.paisesService.getPaisesByRegion(region))
      )
      .subscribe((paises) => {
        // console.log(paises);
        this.paises = paises;
      });

    // cuando cambia el pais
    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        tap(() => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
          // this.miFormulario.get('frontera')?.enable();
          this.cargando = true;
        }),
        switchMap((codigo) => this.paisesService.getPaisByCodigoCCA3(codigo)),
        switchMap( pais => this.paisesService.getPaisesByCodigos(pais[0]?.borders!)),
        tap(pais => {
          if (pais.length === 0 )  {
            this.cargando = false;
          }
        })
      )
      .subscribe((paises) => {
        // console.log('pais', pais[0]);
        // console.log('frontera', pais[0]?.borders);
        // this.fronteras = pais[0]?.borders || [];
        // console.log('fronteras', paises);
        this.fronteras = paises;
        this.cargando = false;
      });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
