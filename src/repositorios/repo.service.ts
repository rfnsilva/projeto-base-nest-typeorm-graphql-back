import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import Teste from '../db/models/Teste.entity';
import TesteRelacao from '../db/models/TesteRelacao.entity';

@Injectable()
class RepoService {
  public constructor(

    //serviço que injeta os repositorios no codigo
    @InjectRepository(Teste) public readonly testeRepo: Repository<Teste>,
    @InjectRepository(TesteRelacao) public readonly testeRelacaoRepo: Repository<TesteRelacao>
  ){}
}

export default RepoService;