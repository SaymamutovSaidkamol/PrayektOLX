import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Region {
  @Prop({ required: true, unique: true })
  name: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
