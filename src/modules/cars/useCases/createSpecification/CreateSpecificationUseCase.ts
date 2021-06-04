import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepositories";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}
  execute({ name, description }: IRequest): void {
    const specificationAlredyExists =
      this.specificationRepository.findByName(name);

    if (specificationAlredyExists) {
      throw new Error("Specification Alredy Exists");
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
