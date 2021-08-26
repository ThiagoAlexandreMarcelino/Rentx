import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const userAlredyExist = await this.usersRepository.findByEmail(email);

    if (userAlredyExist) {
      throw new Error("User Alredy Exists");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      driver_license,
      email,
      name,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
