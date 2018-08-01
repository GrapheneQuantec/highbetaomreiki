export interface MatrixColleciton {
    id?: string;
    category?: string;
    tags?: string[];
    matrixItems?: MatrixItem[];
  }

  export interface MatrixItem {
    content?: string;
    index?: number;
  }

  export interface MatrixCateogory {
    verbal?: string;
    nonverbal?: number;
  }
