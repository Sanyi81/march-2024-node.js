import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError("Name cannot be empty", 400);
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email cannot be empty", 400);
    }
    if (!dto.password || dto.password.length < 6) {
      throw new ApiError("Password cannot be empty", 400);
    }
    return await userRepository.create(dto);
  }

  public async getById(userId: number): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User Not Found", 404);
    }
    return user;
  }

  public async updateById(userId: number, dto: IUser): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError("Name cannot be empty", 400);
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email cannot be empty", 404);
    }
    if (!dto.password || dto.password.length < 6) {
      throw new ApiError("Password cannot be empty", 400);
    }
    return await userRepository.updateById(userId, dto);
  }

  public async deleteById(userId: number): Promise<void> {
    return await userRepository.deleteById(userId);
  }
}

export const userService = new UserService();
