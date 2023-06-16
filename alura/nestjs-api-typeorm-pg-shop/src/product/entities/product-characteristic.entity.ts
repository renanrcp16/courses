import { ProductEntity } from './product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_characteristics')
export class ProductCharacteristicEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 100, nullable: false })
  description: string;

  @ManyToOne(() => ProductEntity, (product) => product.characteristic, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  product: ProductEntity;
}
