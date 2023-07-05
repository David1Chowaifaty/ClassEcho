/*
[
  {
    docId: 'yrJKjTiFHghQYW2okch4',
    role: 'doctor',
    username: 'khalil1234',
    phone: '+96103309051',
    id: '6EZUw2ya41R3LoEuU5PmIYZmepg2',
    field: 'heart',
    profileImage: 
      'https://firebasestorage.googleapis.com/v0/b/ouvatech.appspot.com/o/556de972-3187-45cb-96a3-1738e38af4a6.jpeg?alt=media&token=205fa6d1-d395-49cb-92e5-2b6babe3c7ce',
    accepted: false,
    clinics: [
      {
        country: 'Argentina',
        phone: '+96106325632',
        city: 'main',
        street: 'main',
        id: 'pHxUBO39wbbDy00g',
        floor: '2',
        building: 'khalil'
      }
    ],
    email: 'khalil.tadros.2@gmail.com',
    country: 'Argentina',
    biography: 'hjkjjjjjjjjjj\ndsdsdsdsds\nsdsdsdsdsd\nsdsdsdsdsd',
    hospital: 'CHN'
  }
]
*/
type Doctor = {
  email: string;
  country: string;
  biography: string | undefined;
  hospital: string;
  clinics: Clinics[] | undefined;
  docId: string;
  username: string;
  profileImage: string | undefined;
  accepted: boolean;
  field: string;
  suspended: boolean | undefined;
  id: string;
  phone: string | undefined;
};
type Clinics = {
  country: string;
  phone: string;
  city: string;
  street: string;
  id: string;
  floor: string;
  building: string;
};
