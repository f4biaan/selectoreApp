export interface PaisSmall {
  name:         Name;
  cca3:         string;
  capital:      string[];
  altSpellings: string[];
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: NativeName;
}

export interface NativeName {
  eng: Eng;
}

export interface Eng {
  official: string;
  common:   string;
}
