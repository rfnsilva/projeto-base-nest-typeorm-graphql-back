import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class TesteRelacaoInput {
  @Field()
  readonly nome: string;
}

@InputType()
export class TesteRelacaoDeleteInput {
  @Field()
  readonly id: number;
}

@InputType()
export class TesteRelacaoUpdateInput {
  @Field()
  readonly id: number;
  
  @Field()
  readonly nome: string;
}