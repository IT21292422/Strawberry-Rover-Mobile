export interface UpdateRoverPayloadType {
  initialId: number;
  roverStatus: number;
  userId: number;
}

export enum RoverStatus {
  STOP = 0,
  START = 1,
  PAUSE = 2,
  SERVICE = 3,
}

export interface Rover {
  roverId: number;
  nickname: string;
}

export interface userPayloadType {
  username: string;
  email: string;
  userId?: number;
  rovers?: Rover[];
}
