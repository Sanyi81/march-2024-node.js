import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { ISignIn, IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: Partial<IUser>,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await this.isEmailExistOrThrow(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({ ...dto, password });

    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });

    await emailService.sendMail(
      EmailTypeEnum.WELCOME,
      "skyharts2002@gmail.com",
      { name: user.name },
    );
    return { user, tokens };
  }

  public async signIn(
    dto: ISignIn,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User was not found", 404);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }

    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async refresh(
    refreshToken: string,
    payload: ITokenPayload,
  ): Promise<ITokenPair> {
    await tokenRepository.deleteOneByParams({ refreshToken });
    const tokens = tokenService.generateTokens({
      userId: payload.userId,
      role: payload.role,
    });
    await tokenRepository.create({ ...tokens, _userId: payload.userId });
    return tokens;
  }

  public async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exist", 409);
    }
  }

  public async logout(
    jwtPayload: ITokenPayload,
    tokenId: string,
  ): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);
    await tokenRepository.deleteOneByParams({ _id: tokenId });
    await emailService.sendMail(
      EmailTypeEnum.LOGOUT,
      "skyharts2002@gmail.com",
      {
        name: user.name,
      },
    );
  }

  public async logoutAll(jwtPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);
    await tokenRepository.deleteManyByParams({ _userId: jwtPayload.userId });
    await emailService.sendMail(EmailTypeEnum.LOGOUT, user.email, {
      name: user.name,
    });
  }
}

export const authService = new AuthService();
