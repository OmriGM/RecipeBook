

import {Pipe, PipeTransform} from "@angular/core";
import {Recipe} from "../recipe.model";

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform{

    transform(value: Recipe[],filterString, propName: string) {
        if (filterString === '') {
            return value;
        }
        const resultArr = [];
        for (const item of value) {
            if (!item.desc.toLowerCase().indexOf(filterString) || !item.name.toLowerCase().indexOf(filterString) || !item.catagory.toLowerCase().indexOf(filterString.toLowerCase())) {
                resultArr.push(item);
            } else {
                for (const ing of item.ingredients) {
                    if (!ing.name.toLowerCase().indexOf(filterString)) {
                        resultArr.push(item);
                    }
                }
            }
        }

        return resultArr;
    }

}