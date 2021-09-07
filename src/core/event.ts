import { Problem } from './problem'

export class GameEvent {
    name?:string
    problems:Map<number, Problem> = new Map()
}
