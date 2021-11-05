import { EventEmitter } from '@angular/core';

import { User } from 'src/app/interfaces/user';

export class Emitters {
  static authEmitter = new EventEmitter<User | any>();
}
