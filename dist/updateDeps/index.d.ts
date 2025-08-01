export type UpdateDepsOptions = {
    source: string;
    target: string;
    skipPostUpdateDependency?: boolean;
    skipUpdateDependency?: boolean;
};
export declare const updateDeps: (options: UpdateDepsOptions) => void;
