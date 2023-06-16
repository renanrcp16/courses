import { UpdateProductDTO } from './dtos/update-product.dto';
import { CreateProductDTO } from './dtos/create-product.dto';
import { FindProductDTO } from './dtos/find-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(data: CreateProductDTO): Promise<void> {
    await this.productRepository.save({
      ...data,
    });
  }

  async findAll(): Promise<FindProductDTO[]> {
    const products = await this.productRepository.find();
    return products.map(
      (product) =>
        new FindProductDTO(
          product.id,
          product.name,
          product.category,
          product.description,
          product.characteristic,
          product.images,
          product.price,
          product.stockQty,
        ),
    );
  }

  async findOne(id: string): Promise<FindProductDTO> {
    const product = await this.productRepository.findOne({ where: { id } });
    return new FindProductDTO(
      product.id,
      product.name,
      product.category,
      product.description,
      product.characteristic,
      product.images,
      product.price,
      product.stockQty,
    );
  }

  async update(id: string, data: UpdateProductDTO): Promise<void> {
    await this.productRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
