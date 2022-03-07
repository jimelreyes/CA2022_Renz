import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SaleDocument = Sale & Document;

@Schema()
export class Sale {
  @Prop()
  userName: string;

  @Prop()
  age: string;

  @Prop()
  height: string;

  @Prop()
  gender: string;

  @Prop()
  sales: string;

  @Prop()
  lastPurchaseDate: Date;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
