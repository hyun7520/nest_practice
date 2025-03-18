// DB를 사용하기 때문에 불필요
// export interface Board {
//     id: string;
//     title: string;
//     description: string;
//     // enum에 정의된 값 외에는 에러
//     status: BoardStatus;
// }

// enum
export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}