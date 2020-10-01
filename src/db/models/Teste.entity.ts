import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne
} from 'typeorm';

import TesteRelacao from './TesteRelacao.entity'

@ObjectType()
@Entity({ name: 'teste' })
export default class Teste {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nome: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ name: 'testeRelacao_id' })
  testeRelacaoId: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => TesteRelacao)
  testeRelacao: TesteRelacao;

  // Associação

  @ManyToOne(
    () => TesteRelacao,
    testeRelacao => testeRelacao.testeConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'testeRelacao_id' })
  testeRelacaoConnection: Promise<TesteRelacao>;
}