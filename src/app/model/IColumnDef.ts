export interface IColumnDef<T> {
    header: string;    
    field: keyof T;
    visible?: boolean;
}