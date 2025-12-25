export interface newMenu {
  id: number;
  backgroundImage: File | null;
  color: {
    primary: string;
    secondary: string;
  };
  logo: File | null;
  pos: string;
  title: string;
}

