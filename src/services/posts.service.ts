import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostInput } from 'src/dto/create-post.input';
import { Posts } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { TagsService } from './tags.service';
import { CommunitiesService } from './communities.service';
import { UsersService } from './users.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
    private tagsService: TagsService,
    private communitiesService: CommunitiesService,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Posts[]> {
    return this.postsRepository.find();
  }

  async createPost(input: CreatePostInput): Promise<Posts> {
    const post = new Posts();
    post.idPrimary = uuidv4();
    post.title = input.title;
    post.description = input.description;
    post.likes = [];
    post.dislikes=[]
    post.tags = [];

    // Obtener el objeto Users basado en el campo author
    const author = await this.usersService.getUserByEmail(input.author);
    if (!author) {
      throw new Error(`El usuario ${input.author} no existe.`);
    }
    post.author = author.email; // Asigna el correo electrónico del autor

    if (input.community == null) {
      post.community = 'General';
    } else {
      if (await this.communitiesService.getCommunityByName(input.community)) {
        post.community = input.community;
      } else {
        throw new Error(`La comunidad ${input.community} no existe.`);
      }
    }

    for (const tags of input.tags) {
      if (!(await this.tagsService.findOne(tags.name))) {
        await this.tagsService.createTag({ name: tags.name });
      }
      const tag = await this.tagsService.findOne(tags.name);
      post.tags.push(tag);
    }
    return this.postsRepository.save(post);
  }

  async findPostsByCommunity(communityName: string): Promise<Posts[]> {
    return this.postsRepository.find({ where: { community: communityName } });
  }

  async deletePost(idPrimary: string): Promise<boolean> {
    const result = await this.postsRepository.delete({ idPrimary });
    return result.affected > 0;
  }

  async findPostsByAuthor(authorEmail: string): Promise<Posts[]> {
    return this.postsRepository.find({ where: { author: authorEmail } });
  }

  async addLikeToPost(postId: string, userEmail: string): Promise<Posts> {
    const post = await this.postsRepository.findOne({
      where: { idPrimary: postId },
      relations: ['likes', 'dislikes'],
    });
    if (!post) {
      throw new Error(`No se encontró ningún post con el ID: ${postId}`);
    }
  
    const user = await this.usersService.findOne(userEmail);
    if (!user) {
      throw new Error(`No se encontró ningún usuario con el email: ${userEmail}`);
    }
  
    const userLikesIndex = post.likes.findIndex(like => like.email === user.email);
    if (userLikesIndex !== -1) {
      post.likes.splice(userLikesIndex, 1); // Eliminar el "like" del usuario si ya existe en el array "likes"
    } else {
      const userDislikesIndex = post.dislikes.findIndex(dislike => dislike.email === user.email);
      if (userDislikesIndex !== -1) {
        post.dislikes.splice(userDislikesIndex, 1); // Eliminar el "dislike" del usuario si existe en el array "dislikes"
      }
      post.likes.push(user); // Agregar el "like" del usuario
    }
  
    return this.postsRepository.save(post);
  }
  
  async addDislikeToPost(postId: string, userEmail: string): Promise<Posts> {
    const post = await this.postsRepository.findOne({
      where: { idPrimary: postId },
      relations: ['likes', 'dislikes'],
    });
    if (!post) {
      throw new Error(`No se encontró ningún post con el ID: ${postId}`);
    }
  
    const user = await this.usersService.findOne(userEmail);
    if (!user) {
      throw new Error(`No se encontró ningún usuario con el email: ${userEmail}`);
    }
  
    const userDislikesIndex = post.dislikes.findIndex(dislike => dislike.email === user.email);
    if (userDislikesIndex !== -1) {
      post.dislikes.splice(userDislikesIndex, 1); // Eliminar el "dislike" del usuario si ya existe en el array "dislikes"
    } else {
      const userLikesIndex = post.likes.findIndex(like => like.email === user.email);
      if (userLikesIndex !== -1) {
        post.likes.splice(userLikesIndex, 1); // Eliminar el "like" del usuario si existe en el array "likes"
      }
      post.dislikes.push(user); // Agregar el "dislike" del usuario
    }
  
    return this.postsRepository.save(post);
  }
  
  
}
