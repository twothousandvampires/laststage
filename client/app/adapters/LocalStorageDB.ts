import type { IDatabase } from 'core'

export default class LocalStorageDB implements IDatabase{
    constructor(private connection: any){
        
    }

    saveData(){
        console.log('data saved local')
    }

    addRecord(){
        console.log('add record local')
    }
}