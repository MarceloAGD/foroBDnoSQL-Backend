import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users.module';
import { TagsModule } from './modules/tags.module';
import { PostsModule } from './modules/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {ApolloFederationDriver,ApolloFederationDriverConfig,} from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommunitiesModule } from './modules/communities.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('DB_URL'), // Updated line
        useNewUrlParser: true,
        synchronize: true,
        logging: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    TagsModule,
    UsersModule,
    PostsModule,
    CommunitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get('PORT');
  }
}
