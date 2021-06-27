export interface ICityDto {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  gmplaces?: string[];
}

export interface IGMPlaceDto {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  cityId: string;
}
