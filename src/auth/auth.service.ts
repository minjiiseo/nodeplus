import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { DEFAULT_CUSTOMER_POINT } from 'src/constants/point.constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signUp(SignUpDto) {
    const { email, password, passwordConfirm, nickname } = SignUpDto;

    const isPasswordMatched = password === passwordConfirm;
    if (!isPasswordMatched) {
      throw new BadRequestException(
        '비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.',
      );
    }

    const existedUser = await this.userRepository.findOneBy({ email });
    if (existedUser) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    }

    const user = await this.userRepository.save({
      email,
      password,
      nickname,
      points: DEFAULT_CUSTOMER_POINT,
    });
    delete user.password;

    return user;
  }
}
