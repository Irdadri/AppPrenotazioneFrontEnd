export interface FormDefinitions<T>{
    name: string;
    type: string;
    label: string;
    cols: number;
    validators?: any[];

}