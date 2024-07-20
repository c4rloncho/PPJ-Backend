import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login-auth.input';
import { RegisterInput } from './dto/register-auth.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { NotFoundError } from 'rxjs';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './dto/auth-payload';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ){}
  
  async login(input: LoginInput):Promise<AuthPayload> {
    const user = await this.userRepository.findOne({where:{username:input.username},relations:['comments']})
    
    if(!user){
      throw new NotFoundException('usuario no encontrado');
    }
    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {  id: user.id,username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(input: RegisterInput) {
    // Validar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({ where: { username: input.username } });
    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya existe');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Crear y guardar el nuevo usuario
    const user = new User();
    user.username = input.username;
    user.password = hashedPassword;
    await this.userRepository.save(user);

    // Retornar la respuesta de éxito
    return {
      success: true,
      message: 'Registro exitoso',
    };
  }

}
