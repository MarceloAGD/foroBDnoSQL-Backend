import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { Users } from '../entities/users.entity';
import { CreateUserInput } from '../dto/create-user.input';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [Users])
  users() {
    return this.usersService.findAll();
  }

  @Query((returns) => Users)
  user(@Args('email') email: string, @Args('password') password: string) {
    return this.usersService.findUserByEmailPassword(email, password);
  }

  @Mutation((returns) => Users)
  createUser(@Args('userInput') userInput: CreateUserInput) {
    return this.usersService.createUser(userInput);
  }

  @Query(() => Users)
  userByEmail(@Args('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Mutation(() => Users)
  sendFriendRequest(
    @Args('senderEmail') senderEmail: string,
    @Args('receiverEmail') receiverEmail: string,
  ) {
    return this.usersService.sendFriendRequest(senderEmail, receiverEmail);
  }

  @Mutation(() => Users)
  async acceptFriendRequest(
    @Args('senderEmail') senderEmail: string,
    @Args('receiverEmail') receiverEmail: string,
  ) {
    return this.usersService.acceptFriendRequest(senderEmail, receiverEmail);
  }

  
  @Mutation(() => Users)
  async declineFriendRequest(
    @Args('senderEmail') senderEmail: string,
    @Args('receiverEmail') receiverEmail: string,
  ) {
    return this.usersService.declineFriendRequest(senderEmail, receiverEmail);
  }
}
