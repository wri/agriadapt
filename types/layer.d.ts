import { Source } from '@vizzuality/layer-manager';

export interface Render {
  layers?: Record<string, string | number | boolean | unknown>[];
}

export interface layerConfigSpec {
  body?: {
    sldValue: string;
  };
  render?: Render;
  source: Partial<Source>;
  [key: string]:
    | Record<string, string | number | boolean | unknown>
    | string
    | boolean
    | number;
}

export interface APILayerSpec {
  id: string;
  name: string;
  dataset: string;
  slug: string;
  description?: string;
  application: string[];
  type?: string;
  userId: string;
  iso: string[];
  provider: string;
  userId: string;
  default: boolean;
  protected: boolean;
  published: boolean;
  env: string;
  thumbnailUrl: string;
  layerConfig: layerConfigSpec;
  legendConfig: Record<string, string | number | boolean | unknown>;
  applicationConfig: APILayerAppConfig | Record<string, never>;
  interactionConfig: Record<string, string | number | boolean | unknown>;
  staticImageConfig: Record<string, string | number | boolean | unknown>;
  createdAt: string;
  updatedAt: string;
  active?: boolean;
}

export interface APILayerAppConfig {
  query: string;
  output: {
    path: string;
    type: 'number' | 'string';
    format?: string;
    prefix?: string;
    suffix?: string;
  };
  value_chain?: 'coffee' | 'cotton' | 'rice';
  subgroup?: string;
  emission_scenario?: 'rcp4.5' | 'rcp8.5';
  timescale?: 'historic' | 'future_looking';
  extreme_value?: string | number;
  extreme_direction?: 'asc' | 'desc';
  extreme_text?: string;
}
