export interface AnalysisLocation {
  id: number;
  label: string;
  type: 'point' | 'admin' | 'address' | 'current';
  country?: string;
  state?: { label: string; value: string };
  iso: string;
  address: string;
  longitude?: number;
  latitude?: number;
  geo?: Record<string, any>;
  editing: boolean;
}

export interface PointLocation {
  id: number;
  label: string;
  type: 'point';
  longitude: number;
  latitude: number;
  geo?: Record<string, any>;
  editing: boolean;
}