import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { FoodItem } from '../models/food-item.model';
import { Observable } from 'rxjs';
import { collection as fsCollection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(private firestore: Firestore) { }

  getFoods(): Observable<FoodItem[]> {
    const foodsRef = collection(this.firestore, 'foods');
    // collectionData segít Observable-t adni
    return collectionData(foodsRef, { idField: 'id' }) as Observable<FoodItem[]>;
  }

  addFood(food: FoodItem) {
    const foodsRef = collection(this.firestore, 'foods');
    return addDoc(foodsRef, food);
  }

  updateFood(id: string, data: Partial<FoodItem>) {
    const foodDoc = doc(this.firestore, `foods/${id}`);
    return updateDoc(foodDoc, data);
  }

  deleteFood(id: string) {
    const foodDoc = doc(this.firestore, `foods/${id}`);
    return deleteDoc(foodDoc);
  }
}
