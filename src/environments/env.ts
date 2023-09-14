import { DevEnvironment } from "./dev.env";
import { ProdEnvironment } from "./prod.env";

export interface Environment {
    db_url: string;
}

export function getEnvironmentVariables(): Environment {
    if(process.env.NODE_ENV === 'production') {
        return ProdEnvironment;
    } 

    return DevEnvironment;
}