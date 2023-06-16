import { ProductImageEntity } from './product-image.entity';
import { ProductCharacteristicEntity } from './product-characteristic.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'stock_qty', nullable: false })
  stockQty: number;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'category', length: 100, nullable: false })
  category: string;

  @OneToMany(
    () => ProductCharacteristicEntity,
    (productCharacteristicEntity) => productCharacteristicEntity.product,
    { cascade: true, eager: true },
  )
  characteristic: ProductCharacteristicEntity[];

  @OneToMany(
    () => ProductImageEntity,
    (productImagesEntity) => productImagesEntity.product,
    { cascade: true, eager: true },
  )
  images: ProductImageEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
