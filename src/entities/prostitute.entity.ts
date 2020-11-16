import { IProstitute } from 'src/shared/interfaces/characters/prostitute.interface';
import { Character } from './character.entity';

export class Prostitute extends Character implements IProstitute {
  constructor(private readonly _id: string) {
    super(_id);
  }

  isPeaceful: false = false;
  killsCount: number = 0;
}
