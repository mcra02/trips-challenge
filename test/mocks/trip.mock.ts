export const mockRepository = {
  find(){
    return {
      skip: () => ({
        limit: () => ({
          exec: () => {
            return tripsNoTranformation['trips'].map((x, index) => ({
              ...x, transform: () => resultTrips['trips'][index]
            }));
          }
        })
      })
    };
  },
  // create: jest.fn(() => ({
  //   ...tripsNoTranformation['trips'][0]
  // })),
  create(){
    return {
      ...tripsNoTranformation['trips'][0],
      save: () => ({
      })
    };
  },
  findByIdAndDelete(id:string){
    return {
      exec: () => (tripsNoTranformation['trips'].filter(x => x._id === id)[0])
    };
  }
};

export const resultTrips = {
  'trips': [
    {
      'boundingBox': [
        {
          'lon': -70.567177,
          'lat': -33.580462
        },
        {
          'lon': -70.567147,
          'lat': -33.580432
        },
        {
          'lon': -70.567147,
          'lat': -33.580432
        },
        {
          'lon': -70.567144,
          'lat': -33.580433
        }
      ],
      'overspeedsCount': 2,
      'duration': 1500000,
      'distance': 10.4,
      'end': {
        'lon': -70.567177,
        'lat': -33.580462,
        'address': 'Avenida Grecia 1043',
        'time': 1642541428000
      },
      'start': {
        'lon': -70.567227,
        'lat': -33.580158,
        'address': 'Avenida Apoquindo 291',
        'time': 1642539928000
      },
      'id': '620c3d85f681d9ced9bec26b'
    },
    {
      'boundingBox': [
        {
          'lon': -70.568502,
          'lat': -33.580158
        },
        {
          'lon': -70.567227,
          'lat': -33.580158
        },
        {
          'lon': -70.567227,
          'lat': -33.580053
        },
        {
          'lon': -70.568502,
          'lat': -33.580053
        },
        {
          'lon': -70.568502,
          'lat': -33.580158
        }
      ],
      'overspeedsCount': 5,
      'duration': 36000,
      'distance': 1.2,
      'end': {
        'lon': -70.567227,
        'lat': -33.580158,
        'address': 'El Peñón 1231, Puente Alto, Región Metropolitana, Chile',
        'time': 1642500462000
      },
      'start': {
        'lon': -70.568502,
        'lat': -33.580053,
        'address': 'El Peñón 1115, Puente Alto, Región Metropolitana, Chile',
        'time': 1642500498000
      },
      'id': '620d3b08023ac57bae667fee'
    }
  ]
};

export const createTripData = {
  'readings': [
    {
      'time': 1642500462000,
      'speed': 50,
      'speedLimit': 10,
      'location': {
        'lat': -33.580158,
        'lon': -70.567227
      }
    },
    {
      'time': 1642500466000,
      'speed': 26,
      'speedLimit': 10,
      'location': {
        'lat': -33.58013,
        'lon': -70.566995
      }
    },
    {
      'time': 1642500470000,
      'speed': 28,
      'speedLimit': 10,
      'location': {
        'lat': -33.580117,
        'lon': -70.566633
      }
    },
    {
      'time': 1642500474000,
      'speed': 13,
      'speedLimit': 10,
      'location': {
        'lat': -33.580078,
        'lon': -70.566408
      }
    },
    {
      'time': 1642500498000,
      'speed': 200,
      'speedLimit': 10,
      'location': {
        'lat': -33.580053,
        'lon': -70.568502
      }
    }
  ]
};

export const tripsNoTranformation = {
  'trips': [
    {
      '_id': '620c3d85f681d9ced9bec26b',
      'boundingBox': [
        {
          'lon': -70.567177,
          'lat': -33.580462,
          '_id': '620c3d85f681d9ced9bec26c'
        },
        {
          'lon': -70.567147,
          'lat': -33.580432,
          '_id': '620c3d85f681d9ced9bec26d'
        },
        {
          'lon': -70.567147,
          'lat': -33.580432,
          '_id': '620c3d85f681d9ced9bec26e'
        },
        {
          'lon': -70.567144,
          'lat': -33.580433,
          '_id': '620c3d85f681d9ced9bec26f'
        }
      ],
      'overspeedsCount': 2,
      'duration': 1500000,
      'distance': 10.4,
      'end': {
        'lon': -70.567177,
        'lat': -33.580462,
        'address': 'Avenida Grecia 1043',
        'time': 1642541428000,
        '_id': '620c3d85f681d9ced9bec270'
      },
      'start': {
        'lon': -70.567227,
        'lat': -33.580158,
        'address': 'Avenida Apoquindo 291',
        'time': 1642539928000,
        '_id': '620c3d85f681d9ced9bec271'
      },
      '__v': 0
    },
    {
      '_id': '620d3b08023ac57bae667fee',
      'boundingBox': [
        {
          'lon': -70.568502,
          'lat': -33.580158,
          '_id': '620d3b08023ac57bae667fef'
        },
        {
          'lon': -70.567227,
          'lat': -33.580158,
          '_id': '620d3b08023ac57bae667ff0'
        },
        {
          'lon': -70.567227,
          'lat': -33.580053,
          '_id': '620d3b08023ac57bae667ff1'
        },
        {
          'lon': -70.568502,
          'lat': -33.580053,
          '_id': '620d3b08023ac57bae667ff2'
        },
        {
          'lon': -70.568502,
          'lat': -33.580158,
          '_id': '620d3b08023ac57bae667ff3'
        }
      ],
      'overspeedsCount': 5,
      'duration': 36000,
      'distance': 1.2,
      'end': {
        'lon': -70.567227,
        'lat': -33.580158,
        'address': 'El Peñón 1231, Puente Alto, Región Metropolitana, Chile',
        'time': 1642500462000,
        '_id': '620d3b08023ac57bae667ff4'
      },
      'start': {
        'lon': -70.568502,
        'lat': -33.580053,
        'address': 'El Peñón 1115, Puente Alto, Región Metropolitana, Chile',
        'time': 1642500498000,
        '_id': '620d3b08023ac57bae667ff5'
      },
      '__v': 0
    }
  ]
};
