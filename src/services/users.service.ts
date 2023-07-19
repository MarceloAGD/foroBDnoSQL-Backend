import { Injectable } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOne(email: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findUserByNickname(nickname: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        nickname,
      },
    });
  }

  async findUserByEmailPassword(
    email: string,
    password: string,
  ): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async createUser(user: CreateUserInput): Promise<Users> {
    const { password, ...userData } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
    newUser.friend = [];
    newUser.friendRequests = [];
    return this.usersRepository.save(newUser);
  }
  async getUserByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async sendFriendRequest(
    senderEmail: string,
    receiverEmail: string,
  ): Promise<Users> {
    const sender = await this.getUserByEmail(senderEmail);
    const receiver = await this.getUserByEmail(receiverEmail);
  
    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }
    if (senderEmail == receiverEmail){
      throw new Error('Sender and receiver is the same');
      
    }
  
    if (sender.friend.some((friend) => friend.email === receiver.email)) {
      throw new Error('Receiver is already a friend');
    }
  
    if (
      receiver.friendRequests.some((friend) => friend.email === sender.email)
    ) {
      throw new Error('Friend request already sent to this user');
    }
  
    const receiverWithFriendRequest: Partial<Users> = {
      id: receiver.id,
      nickname: receiver.nickname,
      friendRequests: [...receiver.friendRequests, sender],
    };
  
    await this.usersRepository.save(receiverWithFriendRequest);
  
    return receiverWithFriendRequest as Users;
  }

  async acceptFriendRequest(
    senderEmail: string,
    receiverEmail: string,
  ): Promise<Users> {
    const sender = await this.getUserByEmail(senderEmail);
    const receiver = await this.getUserByEmail(receiverEmail);

    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }

    // Verificar si la solicitud de amistad existe en el receptor
    const friendRequestExists = receiver.friendRequests.some(
      (friend) => friend.email === sender.email,
    );

    if (!friendRequestExists) {
      throw new Error('Friend request not found in the receiver');
    }

    // Eliminar la solicitud de amistad del remitente
    sender.friendRequests = sender.friendRequests.filter(
      (friend) => friend.email !== receiver.email,
    );

    // Eliminar la solicitud de amistad del receptor
    receiver.friendRequests = receiver.friendRequests.filter(
      (friend) => friend.email !== sender.email,
    );

    // Agregar el remitente como amigo del receptor
    const updatedReceiver = Object.assign({}, receiver);
    updatedReceiver.friend = [...receiver.friend, sender];

    // Agregar el receptor como amigo del remitente
    const updatedSender = Object.assign({}, sender);
    updatedSender.friend = [...sender.friend, receiver];

    // Guardar los cambios en la base de datos
    await this.usersRepository.save([updatedSender, updatedReceiver]);

    return updatedReceiver;
  }

  async declineFriendRequest(
    senderEmail: string,
    receiverEmail: string,
  ): Promise<Users> {
    const sender = await this.getUserByEmail(senderEmail);
    const receiver = await this.getUserByEmail(receiverEmail);

    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }
    // Verificar si la solicitud de amistad existe en el receptor
    const friendRequestExists = receiver.friendRequests.some(
      (friend) => friend.email === sender.email,
    );

    if (!friendRequestExists) {
      throw new Error('Friend request not found in the receiver');
    }
    // Eliminar la solicitud de amistad del remitente
    sender.friendRequests = sender.friendRequests.filter(
      (friend) => friend.email !== receiver.email,
    );

    // Eliminar la solicitud de amistad del receptor
    receiver.friendRequests = receiver.friendRequests.filter(
      (friend) => friend.email !== sender.email,
    );

    // Guardar los cambios en la base de datos
    await this.usersRepository.save([sender, receiver]);

    return receiver;
  }

  async deleteFriend(userEmail: string, friendEmail: string): Promise<Boolean> {
    // Obtener los usuarios basados en sus correos electrónicos.
    const user = await this.getUserByEmail(userEmail);
    const friend = await this.getUserByEmail(friendEmail);

    // Verificar si ambos usuarios existen.
    if (!user || !friend) {
      throw new Error('No se encontró uno o ambos usuarios.');
    }
  // Verificar si el amigo existe en la lista de amigos del usuario.
  const friendExists = user.friend.some((u) => u.email === friendEmail);

  if (!friendExists) {
    throw new Error('Friend not found in the user');
  }

    // Eliminar la amistad entre ellos.
    user.friend = user.friend.filter(f => f.email !== friendEmail);
    friend.friend = friend.friend.filter(f => f.email !== userEmail);

    // Guardar los cambios en la base de datos.
    await this.usersRepository.save([user, friend]);

    return true;
  }
}
