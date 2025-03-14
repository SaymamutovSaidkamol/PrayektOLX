import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Region, RegionSchema } from 'src/region/entities/region.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'salom',
      signOptions: { expiresIn: '15m' },
    }),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Region.name, schema: RegionSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
