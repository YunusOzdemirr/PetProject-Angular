import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/models/pet';


@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {
  pet: Pet;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    //let itesm: CartItem = CartItems.find(c => product.productId === product.productId)
    //  CartItems.splice(CartItems.indexOf(item), 1);
    this.takePet(this.pet);
  }
  takePet(pet: any) {
    const routeParams = this.route.snapshot.paramMap;
    const petIdFromRoute = Number(routeParams.get('id'));

    this.pet = pet.find((p: any) => p.id === petIdFromRoute);
  }

}
