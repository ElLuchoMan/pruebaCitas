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
      img: 'https://i.imgur.com/js443MJ.jpg',
      button: 'Agendar Cita',
      urlTo: '/citas',
    },
    {
      avatar: 'people',
      title: 'Usuarios',
      subtitle: 'Crea los usuarios',
     img: 'https://i.imgur.com/xshty5M.jpg',
      button: 'Ir a usuarios',
      urlTo: '/usuarios',
    },
    {
      avatar: 'assignment_ind',
      title: 'Especialista',
      subtitle: 'Modifica Especialistas',
      img: 'https://i.imgur.com/pEkp0EU.jpg',
      button: 'Ir a especialistas',
      urlTo: '/especialistas',
    },
    {
      avatar: 'next_week',
      title: 'Tipos de Cita',
      subtitle: 'Modifica los tipos de cita',
      img: 'https://i.imgur.com/n7t3yxY.jpg',
      button: 'Ir a tipos de cita',
      urlTo: '/tipo-citas',
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
