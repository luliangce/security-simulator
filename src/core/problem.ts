
export type Option = {
    desc:string
    fame:number
    trust:number
    result?:string
    next?:number
};

export type Problem = {
    desc:string
    options?:Option[],
    next?:number
}
