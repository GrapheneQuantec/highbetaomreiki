export interface Affirmation {
  id?: string;
  title?: string;
  content?: string;
  fontSettings?: FontSettings;
  omegaBackground?: string;
  category?: string;
}

export interface FontSettings {
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
}
