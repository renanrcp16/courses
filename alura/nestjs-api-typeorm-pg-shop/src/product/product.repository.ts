import { ProductEntity } from './entities/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  async create(product: ProductEntity): Promise<void> {
    await this.products.push(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.products;
  }

  async findOne(id: string): Promise<ProductEntity> {
    return await this.products.find((product) => product.id === id);
  }

  async update(id: string, data: Partial<ProductEntity>): Promise<void> {
    const userToUpdate = await this.products.find(
      (product) => product.id === id,
    );

    if (!userToUpdate) {
      throw new Error('Product not found');
    }

    Object.entries(data).forEach(([key, value]) => (userToUpdate[key] = value));
  }

  async delete(id: string): Promise<void> {
    const userToDelete = await this.findOne(id);

    this.products = this.products.filter(
      (product) => product.id != userToDelete.id,
    );
  }
}
