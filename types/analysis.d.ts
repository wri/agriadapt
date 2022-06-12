export interface AnalysisLocation {
  id: number;
  label: string;
  type: 'point' | 'admin' | 'search' | 'current';
  country?: string;
  state?: { label: string; value: string };
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