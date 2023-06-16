import { ProductService } from './product.service';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { FindProductDTO } from './dtos/find-product.dto';
import { CreateProductDTO } from './dtos/create-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('/products')
export class ProductController {
  constructor(private userService: ProductService) {}

  @Post()
  async create(@Body() product: CreateProductDTO): Promise<void> {
    await this.userService.create(product);
  }

  @Get()
  async findAll(): Promise<FindProductDTO[]> {
    const products = await this.userService.findAll();

    return products.map(
      (product) =>
        new FindProductDTO(
          product.id,
          product.name,
          product.category,
          product.description,
          product.characteristics,
          product.images,
          product.price,
          product.stockQty,
        ),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindProductDTO> {
    const product = await this.userService.findOne(id);
    if (product) {
      return new FindProductDTO(
        product.id,
        product.name,
        product.category,
        product.description,
        product.characteristics,
        product.images,
        product.price,
        product.stockQty,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDTO,
  ): Promise<void> {
    await this.userService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
