import { BullModule } from '@nestjs/bullmq';
import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule, SchedulerRegistry } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenTelemetryModule } from 'nestjs-otel';
import { bullConfig, bullQueues, immichAppConfig } from 'src/config';
import { databaseEntities } from 'src/entities';
import { databaseConfig } from 'src/infra/database.config';
import { otelConfig } from 'src/infra/instrumentation';
import { IAccessRepository } from 'src/interfaces/access.repository';
import { IActivityRepository } from 'src/interfaces/activity.repository';
import { IAlbumRepository } from 'src/interfaces/album.repository';
import { IKeyRepository } from 'src/interfaces/api-key.repository';
import { IAssetStackRepository } from 'src/interfaces/asset-stack.repository';
import { IAssetRepository } from 'src/interfaces/asset.repository';
import { IAuditRepository } from 'src/interfaces/audit.repository';
import { ICommunicationRepository } from 'src/interfaces/communication.repository';
import { ICryptoRepository } from 'src/interfaces/crypto.repository';
import { IDatabaseRepository } from 'src/interfaces/database.repository';
import { IJobRepository } from 'src/interfaces/job.repository';
import { ILibraryRepository } from 'src/interfaces/library.repository';
import { IMachineLearningRepository } from 'src/interfaces/machine-learning.repository';
import { IMediaRepository } from 'src/interfaces/media.repository';
import { IMetadataRepository } from 'src/interfaces/metadata.repository';
import { IMoveRepository } from 'src/interfaces/move.repository';
import { IPartnerRepository } from 'src/interfaces/partner.repository';
import { IPersonRepository } from 'src/interfaces/person.repository';
import { ISearchRepository } from 'src/interfaces/search.repository';
import { IServerInfoRepository } from 'src/interfaces/server-info.repository';
import { ISharedLinkRepository } from 'src/interfaces/shared-link.repository';
import { IStorageRepository } from 'src/interfaces/storage.repository';
import { ISystemConfigRepository } from 'src/interfaces/system-config.repository';
import { ISystemMetadataRepository } from 'src/interfaces/system-metadata.repository';
import { ITagRepository } from 'src/interfaces/tag.repository';
import { IUserTokenRepository } from 'src/interfaces/user-token.repository';
import { IUserRepository } from 'src/interfaces/user.repository';
import { AccessRepository } from 'src/repositories/access.repository';
import { ActivityRepository } from 'src/repositories/activity.repository';
import { AlbumRepository } from 'src/repositories/album.repository';
import { ApiKeyRepository } from 'src/repositories/api-key.repository';
import { AssetStackRepository } from 'src/repositories/asset-stack.repository';
import { AssetRepository } from 'src/repositories/asset.repository';
import { AuditRepository } from 'src/repositories/audit.repository';
import { CommunicationRepository } from 'src/repositories/communication.repository';
import { CryptoRepository } from 'src/repositories/crypto.repository';
import { DatabaseRepository } from 'src/repositories/database.repository';
import { FilesystemProvider } from 'src/repositories/filesystem.provider';
import { JobRepository } from 'src/repositories/job.repository';
import { LibraryRepository } from 'src/repositories/library.repository';
import { MachineLearningRepository } from 'src/repositories/machine-learning.repository';
import { MediaRepository } from 'src/repositories/media.repository';
import { MetadataRepository } from 'src/repositories/metadata.repository';
import { MoveRepository } from 'src/repositories/move.repository';
import { PartnerRepository } from 'src/repositories/partner.repository';
import { PersonRepository } from 'src/repositories/person.repository';
import { SearchRepository } from 'src/repositories/search.repository';
import { ServerInfoRepository } from 'src/repositories/server-info.repository';
import { SharedLinkRepository } from 'src/repositories/shared-link.repository';
import { SystemConfigRepository } from 'src/repositories/system-config.repository';
import { SystemMetadataRepository } from 'src/repositories/system-metadata.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { UserTokenRepository } from 'src/repositories/user-token.repository';
import { UserRepository } from 'src/repositories/user.repository';

const providers: Provider[] = [
  { provide: IActivityRepository, useClass: ActivityRepository },
  { provide: IAccessRepository, useClass: AccessRepository },
  { provide: IAlbumRepository, useClass: AlbumRepository },
  { provide: IAssetRepository, useClass: AssetRepository },
  { provide: IAssetStackRepository, useClass: AssetStackRepository },
  { provide: IAuditRepository, useClass: AuditRepository },
  { provide: ICommunicationRepository, useClass: CommunicationRepository },
  { provide: ICryptoRepository, useClass: CryptoRepository },
  { provide: IDatabaseRepository, useClass: DatabaseRepository },
  { provide: IJobRepository, useClass: JobRepository },
  { provide: ILibraryRepository, useClass: LibraryRepository },
  { provide: IKeyRepository, useClass: ApiKeyRepository },
  { provide: IMachineLearningRepository, useClass: MachineLearningRepository },
  { provide: IMetadataRepository, useClass: MetadataRepository },
  { provide: IMoveRepository, useClass: MoveRepository },
  { provide: IPartnerRepository, useClass: PartnerRepository },
  { provide: IPersonRepository, useClass: PersonRepository },
  { provide: IServerInfoRepository, useClass: ServerInfoRepository },
  { provide: ISharedLinkRepository, useClass: SharedLinkRepository },
  { provide: ISearchRepository, useClass: SearchRepository },
  { provide: IStorageRepository, useClass: FilesystemProvider },
  { provide: ISystemConfigRepository, useClass: SystemConfigRepository },
  { provide: ISystemMetadataRepository, useClass: SystemMetadataRepository },
  { provide: ITagRepository, useClass: TagRepository },
  { provide: IMediaRepository, useClass: MediaRepository },
  { provide: IUserRepository, useClass: UserRepository },
  { provide: IUserTokenRepository, useClass: UserTokenRepository },
  SchedulerRegistry,
];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(immichAppConfig),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature(databaseEntities),
    ScheduleModule,
    BullModule.forRoot(bullConfig),
    BullModule.registerQueue(...bullQueues),
    OpenTelemetryModule.forRoot(otelConfig),
  ],
  providers: [...providers],
  exports: [...providers, BullModule],
})
export class InfraModule {}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(immichAppConfig),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature(databaseEntities),
    ScheduleModule,
  ],
  providers: [...providers],
  exports: [...providers],
})
export class InfraTestModule {}
