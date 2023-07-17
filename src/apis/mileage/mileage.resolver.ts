import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';
import { Mileage } from './entities/mileage.entity';
import { MileagesService } from './mileage.service';
import { Product } from '../product/entites/product.entity';
import { mileageProductOutput } from './dto/mileage-product.output';

@Resolver()
export class MileagesResolver {
  constructor(
    private readonly mileagesService: MileagesService, //
  ) {}

  // 마일리지 내역 조회 API
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Mileage])
  fetchMileageHistory(
    @Context() context: IContext, //
  ): Promise<Mileage[]> {
    return this.mileagesService.mileageHistory({ context });
  }

  // 마일리지 사용 API
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  purchaseCoupon(
    @Args('coupon') coupon: string,
    @Args('productId') productId: string,
    @Context() context: IContext,
  ): Promise<boolean> {
    return this.mileagesService.purchaseCoupon({ context, coupon, productId });
  }

  // 마일리지 목록 페이지 조회 API
  // @UseGuards(GqlAuthGuard('access'))
  // @Query(() => [mileageProductOutput])
  // fetchMileageProduct(
  //   @Context() context: IContext, //
  // ): Promise<mileageProductOutput[]> {
  //   return this.mileagesService.mileageProduct({ context });
  // }
}
