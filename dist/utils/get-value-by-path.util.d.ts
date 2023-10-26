export declare function valueByPath<S, K1 extends keyof S, K2 extends keyof S[K1], K3 extends keyof S[K1][K2], K4 extends keyof S[K1][K2][K3], K5 extends keyof S[K1][K2][K3][K4]>(obj: S, path: [K1, K2, K3, K4]): S[K1][K2][K3][K4][K5];
export declare function valueByPath<S, K1 extends keyof S, K2 extends keyof S[K1], K3 extends keyof S[K1][K2], K4 extends keyof S[K1][K2][K3]>(obj: S, path: [K1, K2, K3, K4]): S[K1][K2][K3][K4];
export declare function valueByPath<S, K1 extends keyof S, K2 extends keyof S[K1], K3 extends keyof S[K1][K2]>(obj: S, path: [K1, K2, K3]): S[K1][K2][K3];
export declare function valueByPath<S, K1 extends keyof S, K2 extends keyof S[K1]>(obj: S, path: [K1, K2]): S[K1][K2];
export declare function valueByPath<S, K1 extends keyof S>(obj: S, path: [K1]): S[K1];
