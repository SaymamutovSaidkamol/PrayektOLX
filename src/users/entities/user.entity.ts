import { Prop } from '@nestjs/mongoose';

export class User {
  @Prop({ required: true })
  name: string;
}
