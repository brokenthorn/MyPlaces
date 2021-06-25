export interface ICityDto {
  id: string,
  name: string,
  longitude: string,
  latitude: string,
  gmplaces?: string[],
}

export interface IGMPlaceDto {
  id: string,
  name: string,
  longitude: string,
  latitude: string,
  cityId: string,
}
