import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

  import { Request } from 'express';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
  
  @Injectable()
  export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService,
            @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
        ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const user = await this.userRepository.findOne({
            where: {
                id: request.user.userId
            }
        })
        if(user.role === "ADMIN"){
            return true
        } else {
        throw new ForbiddenException();
        }
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }