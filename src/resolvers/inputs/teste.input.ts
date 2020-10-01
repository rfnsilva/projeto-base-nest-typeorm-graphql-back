import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class TesteInput {
  @Field()
  readonly nome: string;

  @Field()
  readonly email: string;

  @Field()
  readonly testeRelacaoId: number;
}

@InputType()
export class TesteDeleteInput {
  @Field()
  readonly id: number;
}

@InputType()
export class TesteUpdateInput {
  @Field()
  readonly id: number;
  
  @Field()
  readonly nome: string;
  
  @Field()
  readonly testeRelacaoId: number;
}