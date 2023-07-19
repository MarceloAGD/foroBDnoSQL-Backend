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

  @Query(() => Users)
  userByNickname(@Args('nickname') nickname: string) {
    return this.usersService.findUserByNickname(nickname);
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

  @Mutation(() => Boolean)
  async deleteFriend(
    @Args('userEmail') userEmail: string,
    @Args('friendEmail') friendEmail: string,
  ) {
    // Llamamos al servicio para eliminar la amistad entre los usuarios y obtener los usuarios actualizados.
    const users = await this.usersService.deleteFriend(userEmail, friendEmail);

    // Aquí puedes agregar la lógica para enviar los correos a los usuarios si es necesario.

    return users;
  }
}
