import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '@/modules/users/infra/typeorm/repository/user-repository';
import { FindUserByIdRepository } from '@/modules/users/data/protocols';

type PayloadType = {
  id: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly findUserByIdRepository: FindUserByIdRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: PayloadType) {
    const { id } = payload;

    const user = await this.findUserByIdRepository.findById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
