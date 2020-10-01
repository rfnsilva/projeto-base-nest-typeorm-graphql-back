import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RepoService from './repo.service';

import Teste from '../db/models/Teste.entity';
import TesteRelacao from '../db/models/TesteRelacao.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Teste,
      TesteRelacao
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {

}

//modulo que exporta os repositorios
export default RepoModule;