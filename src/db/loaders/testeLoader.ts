import * as DataLoader from 'dataloader';
import { getRepository } from 'typeorm';

import Teste from '../models/Teste.entity';

const batchTestes = async (testeIds: number[]) => {
  const testes = await getRepository(Teste).findByIds(testeIds);

  const testeIdMap: { [testeId: number]: Teste } = {}

  testes.forEach(teste => {
    testeIdMap[teste.id] = teste;
  });

  return testeIds.map(testeId => testeIdMap[testeId]);
}

export default () => new DataLoader(batchTestes);