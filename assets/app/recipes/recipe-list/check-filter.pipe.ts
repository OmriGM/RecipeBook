import {Pipe, PipeTransform} from "@angular/core";
import {Recipe} from "../recipe.model";

@Pipe({
    name: 'checkFlter'
})
export class CheckFilterPipe implements PipeTransform{

    transform(value: Recipe[],meat: boolean, vegan: boolean, vegetartian: boolean) {
        if (meat && vegan && vegetartian) {
            return value;
        }
        const stringToCheck = '' +(!vegan? 'vegan ' : '') + (!meat? 'meat ' : '')+ (!vegetartian? 'vegetartian ' : '');
        const resultArr = [];
        for (const item of value) {
            if (stringToCheck.toLowerCase().includes(item.catagory.toLowerCase())){
                resultArr.push(item);
            }
        }

        return resultArr;
    }

}