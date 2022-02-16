import {
  getModelToken
} from '@nestjs/mongoose';
import {
  Test, TestingModule
} from '@nestjs/testing';
import {
  mockRepository, resultTrips, tripsNoTranformation
} from '../../test/mocks/trip.mock';
import {
  Trip
} from './models/trips.model';
import {
  TripsRepository
} from './trips.repository';

describe('TripsRepository', () => {
  let service: TripsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsRepository,
        {
          provide: getModelToken(Trip.name), useValue: mockRepository
        }
      ]
    }).compile();

    service = module.get<TripsRepository>(TripsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of trips', async () => {

      const result = {
        ...resultTrips
      };

      expect(await service.findAll({
        limit: 20,
        offset: 0
      })).toStrictEqual(JSON.parse(JSON.stringify(result)));
    });
  });

  describe('create', () => {
    it('should return an create trip', async () => {
      const result = {
        ...resultTrips['trips'][0]
      };
      const createTrip = resultTrips['trips'][0];
      delete createTrip.id;
      jest.spyOn(service, 'create').mockImplementation(() => new Promise((resolve) => resolve(result)));

      expect(await service.create({
        ...createTrip
      })).toBe(result);

    });
  });

  describe('deleteTrip', () => {
    it('should return an delete trip', async () => {
      const result = {
        ...tripsNoTranformation['trips'][0]
      };

      expect(await service.delete('620c3d85f681d9ced9bec26b')).toStrictEqual(result);

    });
  });
});
