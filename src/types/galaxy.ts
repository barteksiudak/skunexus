import { TObject } from './common';

export interface IPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  url: string;
}

export type TTableData = {
  GRID_CONFIG: TObject<{
    header: TObject<string>[];
    path: string;
  }>;
};
