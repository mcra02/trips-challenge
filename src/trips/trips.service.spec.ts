import {
  getModelToken
} from '@nestjs/mongoose';
import {
  Test, TestingModule
} from '@nestjs/testing';
import {
  createTripData,
  mockRepository, resultTrips
} from '../../test/mocks/trip.mock';
import {
  Trip
} from './models/trips.model';
import {
  TripsRepository
} from './trips.repository';
import {
  TripsService
} from './trips.service';

describe('TripsService', () => {
  let service: TripsService;

  let repository: TripsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        TripsRepository,
        {
          provide: getModelToken(Trip.name), useValue: mockRepository
        }
      ]
    }).compile();

    service = module.get<TripsService>(TripsService);
    repository = module.get<TripsRepository>(TripsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllTrips', () => {
    it('should return an array of trips', async () => {
      const result = {
        ...resultTrips
      };
      jest.spyOn(repository, 'findAll').mockImplementation(() => new Promise((resolve) => resolve(result)));

      expect(await service.findAllTrips({
        limit: 20,
        offset: 0
      })).toBe(result);
    });
  });

  describe('createTrip', () => {
    it('should return an create trip', async () => {
      const result = {
        ...resultTrips['trips'][0]
      };
      jest.spyOn(repository, 'create').mockImplementation(() => new Promise((resolve) => resolve(result)));

      expect(await service.createTrip({
        ...createTripData
      })).toBe(result);

    });
  });

  describe('deleteTrip', () => {
    it('should return an delete trip', async () => {
      const result = {
        ...resultTrips['trips'][0]
      };
      jest.spyOn(repository, 'delete').mockImplementation(() => new Promise((resolve) => resolve(result)));

      expect(await service.deleteTrip('620c3d85f681d9ced9bec26b')).toBe(result);

    });
  });
});
