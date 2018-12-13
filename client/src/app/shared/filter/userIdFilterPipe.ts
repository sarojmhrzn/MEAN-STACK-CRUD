import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class UserIdFilterPipe implements PipeTransform {
    transform(users: any[], value: string): any[] {
        if (!users) return [];
        if (value) {
            return users.filter(user =>
                user.id.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1);
        } else {
            return users;
        }
    }
}
