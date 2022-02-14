import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { UsuarioExisteService } from '../novo-suario/usuario-existe.service';
import { Router } from '@angular/router';
import { NovoUsuario } from './novo-usuario';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExisteService: UsuarioExisteService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email] ],
      nomeCompleto: ['', [Validators.required, Validators.minLength(4)] ],
      nomeUsuario: ['', [Validators.required], [this.usuarioExisteService.usuarioJaExiste()] ],
      senha: ['', [Validators.required] ]
    });
  }

  cadastrar() {
    if (this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe( () => {
        this.router.navigate(['']);
      }, (error) => {
        console.log("erro")
      }
      )
    }
  }

}
