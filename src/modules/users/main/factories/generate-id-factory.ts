import { GenerateUuidAdapter } from '../../infra/generator/id-generator';

export const generateUuidFactory = () => {
  return new GenerateUuidAdapter();
};
