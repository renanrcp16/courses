import { ProductEntity } from './../entities/product.entity';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Characteristic {
  id: string;

  @IsString()
  @IsNotEmpty({ message: "campo 'name' em 'category' não pode ser vazio" })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: "campo 'description' em 'category' não pode ser vazio",
  })
  description: string;

  product: ProductEntity;
}

export class Image {
  id: string;

  @IsString()
  @IsNotEmpty({ message: "campo 'url' em 'image' não pode ser vazio" })
  url: string;

  @IsString()
  @IsNotEmpty({
    message: "campo 'description' em 'image' não pode ser vazio",
  })
  description: string;

  product: ProductEntity;
}

export class CreateProductDTO {
  @IsNotEmpty({ message: "campo 'name' não pode ser vazio" })
  @MinLength(3, {
    message: "campo 'name' precisa ter ao menos 3 caractéres",
  })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: "campo 'price' não pode ser vazio" })
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: "campo 'stockQty' não pode ser vazio" })
  stockQty: number;

  @IsString()
  @IsNotEmpty({ message: "campo 'description' não pode ser vazio" })
  description: string;

  @ValidateNested()
  @IsArray()
  @Type(() => Characteristic)
  characteristics: Characteristic[];

  @ValidateNested()
  @IsArray()
  @Type(() => Image)
  images: Image[];

  @IsNotEmpty({ message: "campo 'category' não pode ser vazio" })
  @MinLength(3, {
    message: "campo 'category' precisa ter ao menos 3 caractéres",
  })
  category: string;
}
