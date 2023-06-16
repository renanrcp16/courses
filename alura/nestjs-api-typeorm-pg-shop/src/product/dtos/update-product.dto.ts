import { IsOptional } from 'class-validator';
import { CreateProductDTO } from './create-product.dto';

export class UpdateProductDTO extends CreateProductDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  price: number;

  @IsOptional()
  stockQty: number;

  @IsOptional()
  description: string;

  @IsOptional()
  category: string;
}
