import {Pipe, PipeTransform} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {isUndefined} from "util";

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform{

    transform(value: Ingredient[],filterString) {
        if (isUndefined(filterString)) {
            return value;
        }
        const resultArr = [];
        for (const item of value) {
            if (!item.name.toLowerCase().indexOf(filterString.toLowerCase())) {
                resultArr.push(item);
            }
        }

        return resultArr;
    }

}