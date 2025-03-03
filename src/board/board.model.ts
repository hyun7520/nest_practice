export interface Board {
    id: string;
    title: string;
    decription: string;
    // enum에 정의된 값 외에는 에러
    status: BoardStatus;
}

// enum
export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}