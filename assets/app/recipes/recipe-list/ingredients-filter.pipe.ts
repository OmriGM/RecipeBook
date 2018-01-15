import {Pipe, PipeTransform} from "@angular/core";
import {Recipe} from "../recipe.model";
import {isUndefined} from "util";

@Pipe({
    name: 'ingredientFilter'
})
export class IngredientsFilterPipe implements PipeTransform{

    transform(value: Recipe[],count: number) {
        if (isUndefined(count)) {
            return value;
        }
        const resultArr = [];
        for (const item of value) {
            if (item.ingredients !== null) {
                if (count >= item.ingredients.length){
                    resultArr.push(item);
                }
            }

        }

        return resultArr;
    }

}