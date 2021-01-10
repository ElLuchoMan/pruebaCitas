import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cards = [
    {
      avatar: 'book_online',
      title: 'Agendar citas',
      subtitle: 'Asigna las citas',
      img: '/assets/img/assign.jpg',
      button: 'Agendar Cita',
      urlTo: '/citas',
    },
    {
      avatar: 'people',
      title: 'Usuarios',
      subtitle: 'Crea los usuarios',
     img: '/assets/img/usuarios.jpg',
      button: 'Ir a usuarios',
      urlTo: '/usuarios',
    },
    {
      avatar: 'assignment_ind',
      title: 'Especialista',
      subtitle: 'Modifica Especialistas',
      img: '/assets/img/medico.jpg',
      button: 'Ir a especialistas',
      urlTo: '/especialistas',
    },
    {
      avatar: 'next_week',
      title: 'Tipos de Cita',
      subtitle: 'Modifica los tipos de cita',
      img: '/assets/img/appointment-type.jpg',
      button: 'Ir a tipos de cita',
      urlTo: '/tipo-citas',
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
