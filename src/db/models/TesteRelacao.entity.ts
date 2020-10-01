import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import Teste from './Teste.entity';

@ObjectType()
@Entity({ name: 'testeRelacao' })
export default class TesteRelacao {
  
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nome: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associação
  
  @OneToMany(
    () => Teste,
    teste => teste.testeRelacaoConnection,
  )
  testeConnection: Promise<Teste[]>;
}