import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';

import TesteRelacao from '../db/models/TesteRelacao.entity';
import TesteRelacaoInput, { TesteRelacaoDeleteInput, TesteRelacaoUpdateInput } from './inputs/testeRelacao.input';

@Resolver(() => TesteRelacao)
export default class TesteResolver {
  constructor(private readonly repoService: RepoService) {}

  //retorna todos os testesRelacao
  @Query(() => [TesteRelacao])
  public async getTestesRelacao(): Promise<TesteRelacao[]> {
    return this.repoService.testeRelacaoRepo.find();
  }

  //retorna um testeRelacao
  @Query(() => TesteRelacao, { nullable: true })
  public async getTesteRelacao(@Args('id') id: number): Promise<TesteRelacao> {
    return this.repoService.testeRelacaoRepo.findOne(id);
  }

  //adiciona um testeRelacao
  @Mutation(() => TesteRelacao)
  public async createTesteRelacao(
    @Args('data') input: TesteRelacaoInput,
  ): Promise<TesteRelacao> {
    const testeRelacao = this.repoService.testeRelacaoRepo.create({
      nome: input.nome
    })

    return await this.repoService.testeRelacaoRepo.save(testeRelacao);
  }

  //atualiza um testeRelacao
  @Mutation(() => [TesteRelacao])
  public async updateTesteRelacao(
    @Args('data') input: TesteRelacaoUpdateInput,
  ): Promise<TesteRelacao[]> {
    await this.repoService.testeRelacaoRepo.update(input.id, {...input});

    return this.repoService.testeRelacaoRepo.find({order: {id: 'ASC'}});

  }

  //deleta um testeRelacao pelo id
  @Mutation(() => [TesteRelacao])
  public async deleteTesteRelacao(
    @Args('data') input: TesteRelacaoDeleteInput,
  ): Promise<TesteRelacao[]> {
    const result = await this.repoService.testeRelacaoRepo.delete(input.id);

    const testeRelacao = await this.repoService.testeRelacaoRepo.find();

    if (result.affected === 0) {
      console.log('erro ao deletar')
      throw new Error('erro ao deletar')
    }

    return this.repoService.testeRelacaoRepo.find({order: {id: 'ASC'}});
  }
}