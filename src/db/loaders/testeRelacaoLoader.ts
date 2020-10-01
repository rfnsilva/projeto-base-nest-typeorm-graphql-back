import * as DataLoader from 'dataloader';
import { getRepository } from 'typeorm';

import TesteRelacao from '../models/TesteRelacao.entity';

const batchTesteRelacoes = async (testeRelacaoIds: number[]) => {
  const testeRelacoes = await getRepository(TesteRelacao).findByIds(testeRelacaoIds);

  const testeRelacaoIdMap: { [testeRelacaoId: number]: TesteRelacao } = {}

  testeRelacoes.forEach(testeRelacao => {
    testeRelacaoIdMap[testeRelacao.id] = testeRelacao;
  });

  return testeRelacaoIds.map(testeRelacaoId => testeRelacaoIdMap[testeRelacaoId]);
}

export default () => new DataLoader(batchTesteRelacoes);
