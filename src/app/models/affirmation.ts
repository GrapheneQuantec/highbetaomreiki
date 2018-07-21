export interface Affirmation {
    id?: string;
    title?: string;
    content?: string;
    fontSettings?: FontSettings;
  }

  export interface FontSettings {
    fontSize?: number;
    lineHeight?: number;
    letterSpacing?: number;
  }