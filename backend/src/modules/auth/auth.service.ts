import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // TODO: Implement user validation with database
    // For now, return mock user for demo purposes
    if (email === 'admin@example.com' && password === 'password') {
      return {
        id: '1',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        tenantId: '1',
        role: 'admin',
      };
    }
    return null;
  }

  async register(registerDto: RegisterCompanyDto): Promise<AuthResponseDto> {
    // TODO: Implement company registration with database
    const mockUser = {
      id: '2',
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: 'admin',
      tenantId: '2',
    };

    const payload = { email: mockUser.email, sub: mockUser.id, tenantId: mockUser.tenantId };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      token_type: 'Bearer',
      expires_in: 3600,
      user: mockUser,
      message: 'Registration successful',
    };
  }

  async login(user: any): Promise<AuthResponseDto> {
    const payload = { email: user.email, sub: user.id, tenantId: user.tenantId };
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: 3600,
      user,
      message: 'Login successful',
    };
  }

  async refreshToken(user: any): Promise<AuthResponseDto> {
    const payload = { email: user.email, sub: user.id, tenantId: user.tenantId };
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: 3600,
      user,
      message: 'Token refreshed successfully',
    };
  }
}
