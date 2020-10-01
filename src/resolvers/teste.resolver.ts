import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';

import Teste from '../db/models/Teste.entity';
import TesteInput, { TesteDeleteInput, TesteUpdateInput } from './inputs/teste.input';
import TesteRelacao from 'src/db/models/TesteRelacao.entity';

import { context } from 'src/db/loaders'; //dataloader

@Resolver(() => Teste)
export default class TesteResolver {
  constructor(private readonly repoService: RepoService) {}

  //retorna todos os testes
  @Query(() => [Teste])
  public async getTestes(): Promise<Teste[]> {
    return this.repoService.testeRepo.find();
  }

  //retorna um teste
  @Query(() => Teste, { nullable: true })
  public async getTeste(@Args('id') id: number): Promise<Teste> {
    return this.repoService.testeRepo.findOne(id);
  }

  //retorna todas as categorias de acordo com a fornecedor
  @Query(() => [Teste])
  public async getTesteTesteRelacao(
    @Args('testeRelacaoId') testeRelacaoId: number,
  ): Promise<Teste[]> {
    return this.repoService.testeRepo.find({
      where: { testeRelacaoId },
    });
  }

  //adiciona um teste
  @Mutation(() => Teste)
  public async createTeste(
    @Args('data') input: TesteInput,
  ): Promise<Teste> {
    const teste = this.repoService.testeRepo.create({
      nome: input.nome,
      email: input.email,
      testeRelacaoId: input.testeRelacaoId
    })

    return await this.repoService.testeRepo.save(teste);
  }

  //atualiza um teste
  @Mutation(() => [Teste])
  public async updateTeste(
    @Args('data') input: TesteUpdateInput,
  ): Promise<Teste[]> {
    await this.repoService.testeRepo.update(input.id, {...input});

    return this.repoService.testeRepo.find({order: {id: 'ASC'}});

  }

  //deleta um teste pelo id
  @Mutation(() => [Teste])
  public async deleteTeste(
    @Args('data') input: TesteDeleteInput,
  ): Promise<Teste[]> {
    const result = await this.repoService.testeRepo.delete(input.id);

    const teste = await this.repoService.testeRepo.find();

    if (result.affected === 0) {
      console.log('erro ao deletar')
      throw new Error('erro ao deletar')
    }

    return this.repoService.testeRepo.find({order: {id: 'ASC'}});

  }

  //resolver fields
  
  @ResolveField(() => TesteRelacao, { name: 'testeRelacao' })
  public async getTesteRelacao(
    @Parent() parent: Teste,
    @Context() { testeRelacaoLoader }: typeof context,
  ): Promise<TesteRelacao> {
    return testeRelacaoLoader.load(parent.testeRelacaoId); // DataLoader
  }
}