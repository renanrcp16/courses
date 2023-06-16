import { ProductImageEntity } from './../entities/product-image.entity';
import { ProductCharacteristicEntity } from './../entities/product-characteristic.entity';
export class FindProductDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly category: string,
    readonly description: string,
    readonly characteristics: ProductCharacteristicEntity[],
    readonly images: ProductImageEntity[],
    readonly price: number,
    readonly stockQty: number,
  ) {}
}
