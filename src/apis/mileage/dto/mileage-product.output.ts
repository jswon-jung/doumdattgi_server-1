import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class mileageProductOutput {
  @Field(() => String, { nullable: true })
  image_url: string;

  @Field(() => String)
  product_title: string;

  @Field(() => String)
  product_summary: string;

  @Field(() => Date)
  mileage_createdAt: Date;

  @Field(() => String)
  mileage_coupon: string;
}
