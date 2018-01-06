import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../../shared/shoppingList.service';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() onAddClickEvent = new EventEmitter<Ingredient>();
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;
  // @ViewChild('nameInput') ingrName: ElementRef;
  // @ViewChild('amountInput') ingrSmount: ElementRef;
  @ViewChild('f') form: HTMLFormElement;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onAddClick() {
    // if (form. !== '') {
    //   const toAddName = this.ingrName.nativeElement.value;
    //   const toAddAmount = this.ingrSmount.nativeElement.value;
    //   this.shoppingListService.addNewIngredientToArray(new Ingredient(toAddName, toAddAmount));
    //   this.ingrName.nativeElement.value = '';
    //   this.ingrSmount.nativeElement.value = '';
    // }

    if (this.form.value.name !== '') {
      const newIngredient = new Ingredient(this.form.value.name, this.form.value.amount);
      if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      } else {
        this.shoppingListService.addNewIngredientToArray(newIngredient);

      }
      // this.form.value.name = '';
      // this.form.value.amount = '';
      // this.form.setValue({name: '',
      //                     amount: ''});
      this.onClear();
    }
  }



  onClear() {
    this.editMode = false;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
