import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<string> {
    // TODO: Implement GraphQL login
    return 'GraphQL login - coming soon';
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async me(): Promise<string> {
    // TODO: Implement GraphQL me query
    return 'GraphQL me query - coming soon';
  }
}
