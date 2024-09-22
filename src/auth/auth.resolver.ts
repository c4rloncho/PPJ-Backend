import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-auth.input';
import { AuthPayload } from './dto/auth-payload';
import { AuthResponse } from './dto/auth-responde';
import { RegisterInput } from './dto/register-auth.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Args('input') loginInput: LoginInput): Promise<AuthPayload> {
    try {
      return await this.authService.login(loginInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => AuthResponse)
  async register(@Args('input') registerInput: RegisterInput) {
    try {
      return this.authService.register(registerInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
