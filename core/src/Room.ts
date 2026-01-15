import { ITransport } from './Interfaces/ITransport'
import { IDatabase } from './Interfaces/IDatabase'
import Builder from './Classes/Builder'
import Client from './Client'
import item from './Items/Item'
import Level from './Level'
import TemplateAbility from './Types/TemplateAbility'
import Character from './Objects/src/Character'
import UpgradeManager from './Classes/UpgradeManager'
import Default from './Scenarios/Default'
import { ILooper } from './Interfaces/ILooper'

export class Room {

    static MAX_PLAYERS: number = 4

    private level: Level | undefined = undefined
    public clients: Map<string, Client> = new Map()
    public game_started: boolean = false

    new_game_timeout: any
    httpServer: any
    redisClient: any
    name: string = ''
    public game_loop: any
    

    constructor(private transport: ITransport, private db: IDatabase, private env_looper: ILooper) {
        this.createName()     
    }

    public start(): void {
        if (!this.level) return

        this.level.start()

        this.game_started = true
        this.transport.broadcast('start', Array.from(this.clients.values()))

        this.env_looper.start(() => this.loop())
    }

    loop(){
        if(!this.level) return

        let time = Date.now()

        if (time - this.level.last_update_time >= 30) {
            this.level.last_update_time = time
            this.level.tick(time)
            this.transport.broadcast('tick_data', JSON.stringify(this.level))
            this.level.afterTick()
        }
    }

    update(){
        if(!this.level) return
    }

    getAllPlayersItems(data) {
        let p_items: string[] = []

        data.forEach(elem => {
            p_items.push(...elem.template.item.map(i => i.name))
        })

        return p_items
    }

    private updateLobby(): void {
        let data: Client[] = Array.from(this.clients.values())

        let p_items = this.getAllPlayersItems(data)
        let list = item.list
        let available = []

        list.forEach(elem => {
            if (!p_items.includes(elem.name)) {
                available.push(elem)
            }
        })

        this.transport.broadcast('update_lobby_data', {data: data, available: available})
    }

    private createName() {
        let first = [
            'miserable',
            'brutal',
            'grimy',
            'cold',
            'rotten',
            'black',
            'demented',
            'gone',
            'bloody',
            'lifeless',
            'stinking',
            'frightening',
            'gigantic',
            'smashed',
            'bleak',
            'sinister',
            'ominous',
        ]
        let second = [
            'thing',
            'tears',
            'mace',
            'head',
            'mind',
            'ceil',
            'remains',
            'ghoul',
            'tree',
            'corpse',
            'gem',
            'shards',
            'bloat',
            'phantom',
            'melancholy',
            'woe',
            'maggot',
            'phlegm',
        ]

        this.name =
            first[Math.floor(Math.random() * first.length)] +
            ' ' +
            second[Math.floor(Math.random() * second.length)]
    }

    private createNewClient(socket_id: string): Client {
        let client: Client = new Client(socket_id)
        this.clients.set(socket_id, client)
        this.updateLobby()

        return client
    }

    public removeLevel() {
        if(this.level){
            this.env_looper.stop()
            this.level = undefined
        }

        this.game_started = false
        this.clients = new Map()
    }

    async suggetRecord(player: Character) {
        if (!this.level) return

        // await this.redisClient.setEx(
        //     player.id,
        //     60,
        //     JSON.stringify({
        //         kill_count: this.level.kill_count,
        //         waves: this.level.script instanceof Default ? this.level.script.waves_created : 0,
        //         time: this.level.time - this.level.started,
        //         class: player.name,
        //     })
        // )

        this.transport.send(player.id, 'suggers_record', this.level.kill_count)

        setTimeout(() => {
            if(this.level && this.level.players.some(elem => elem.id == player.id)){
                this.transport.broadcast('game_is_over')
            }    
        }, 20000)
    }

    async addRecord(name: string, id: string) {
        this.db.addRecord(name, id)

        return
        try {
            await this.db
                .promise()
                .execute(
                    'UPDATE game_stats set name = ? where socket = ?',
                    [name || null, id || null]
                )  
                
            this.socket.emit('game_is_over')
        } catch (err) {

        }
    }

    public async saveData(player: Character, game_type: string){
        if(!this.level || !player) return 

        this.db.saveData()
        return
        await this.db
            .promise()
            .execute(
                'INSERT INTO game_stats (name, kills, waves, time, class, socket, game_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
                ['unknown', this.level.kill_count, this.level.script instanceof Default ? this.level.script.waves_created : 0, this.level.time - this.level.started, player.name, player.id, game_type]
            )
    }

    public async endOfLevel(): void {
        // if (this.level?.players.length === 1 && this.level?.players[0].id) {
        //     try{
        //         const [results] = await this.db
        //             .promise()
        //             .execute(
        //                 `SELECT * FROM game_stats WHERE class = ? and game_type = 'solo' ORDER BY kills DESC LIMIT 3`,
        //                 [this.level?.players[0].name]
        //             )

        //         let more = true
        //         if (
        //             results.length > 2 &&
        //             results.every(elem => elem.kills >= this.level?.kill_count)
        //         ) {
        //             more = false
        //         }

        //         if (more) {
        //             await this.suggetRecord(this.level?.players[0])
        //         } else{
        //             this.socket.emit('game_is_over')
        //         }
        //     } catch (err) {
                
        //     }
        // } else {
        //     this.socket.emit('game_is_over')
        // }      
    }

    handleAction(client_id: string, event: string, payload: any){
        console.log(event, client_id)
        if(event === 'connect'){
            if(this.clients.size < Room.MAX_PLAYERS){
                this.createNewClient(client_id)
                this.transport.send(client_id, 'connect_to_lobby')
            }
            else{
                return
            }
        }

        let client = this.clients.get(client_id)
        if(!client) return

        switch(event){
            case 'change_class':
                client.template.setTemplate(payload)
                this.updateLobby()
                break;

            case 'add_record':
                this.addRecord(payload, client_id)
                break;

            case 'increase_stat':
                client.template.increseStat(payload)
                this.updateLobby()
                break;

            case 'decrease_stat':
                client.template.decreaseStat(payload)
                this.updateLobby()
                break;

            case 'get_lobby_data':
                this.updateLobby()
                break;

            case 'get_grand_forging':
                if(payload <= 0) return
                if (!client.character) return

                UpgradeManager.getGrandForging(payload, client.character)
                break;

            case 'apply_grand_forging':
                if (!client.character) return

                UpgradeManager.applyGrandForging(payload, client.character)
                break;

            case 'forge_item':
                if (!client.character) return

                UpgradeManager.forgeItem(payload, client.character)
                break;

            case 'pick_item':
                let data: Client[] = Array.from(this.clients.values())
                let items = this.getAllPlayersItems(data)
                if (items.some(elem => elem === payload)) return

                let item = Builder.createItem(payload)

                if (client.template.item.length >= client.template.max_items) {
                    client.template.item.pop()
                }

                client.template.item.push(item)

                this.updateLobby()
                break;

            case 'unpick_item':
                client.template.item = client.template.item.filter(
                    elem => elem.name != payload
                )
                this.updateLobby()
                break;

            case 'unlock_forging':
                if (!client.character) return

                UpgradeManager.unlockForging(payload, client.character)
                break;

            case 'select_skill':
                let selected: TemplateAbility | undefined = client.template.abilities.find(
                    elem => elem.name === payload
                )
                if (!selected) return

                let type: number = selected.type
                if (!type) return

                client.template.abilities
                    .filter(elem => elem.type === type)
                    .forEach(elem => (elem.selected = false))
                if (selected) {
                    selected.selected = true
                }
                this.updateLobby()
                break;

            case 'inputs':
                if (!client.character) return

                client.character.setLastInputs(payload)
                break;

            case 'add_mastery':
                if (!client.character) return

                UpgradeManager.addMastery(client.character, payload)
                break;

            case 'buy':
                if (!client.character) return

                UpgradeManager.buyNewItem(client.character)
                break;

            case 'load_template':
                client.template.abilities = payload.abilities
                client.template.item = []

                payload.item.forEach(elem => {
                    if (elem.name != '') {
                        let item = Builder.createItem(elem.name)
                        client.template.item.push(item)
                    }
                })
                client.template.stats = payload.stats
                client.template.stat_count = payload.stat_count

                this.updateLobby()
                break;

            case 'buy_item':
                if (!client.character) return

                UpgradeManager.buyItem(payload, client.character)
                break;

            case 'pick_forging':
                if (!client.character) return

                UpgradeManager.pickForging(payload, client.character)
                break;

            case 'donate':
                if (!client.character) return
                if (client.character.gold < 100) return

                client.character.gold -= 100
                client.character.grace ++

                UpgradeManager.closeForgings(client.character)
                break;

            case 'player_ready':
                client.ready = !client.ready

                if (this.allPlayersAreReady()) {
                    clearTimeout(this.new_game_timeout)

                    this.new_game_timeout = setTimeout(() => {
                        let all_still_ready: boolean = this.allPlayersAreReady()
                        if (all_still_ready) {
                            this.level = new Level(this)

                            this.clients.forEach((value, key, map) => {
                                if (this.level) {
                                    let char: Character = Builder.createCharacter(
                                        value,
                                        this.level
                                    )
                                    value.character = char
                                    this.level.assignPlayer(char)
                                    this.transport.send(client_id, 'close_upgrades')
                                    this.transport.send(client_id, 'close_suggest')
                                }
                            })

                            this.start()
                        }
                    }, 3000)
                }

                this.updateLobby()
                break;
            
            case 'disconnect':
                this.clients.delete(client_id)
                    if (this.clients.size === 0) {
                        this.removeLevel()
                        this.createName()
                    } else {
                        this.updateLobby()
                    }
                break;

            case 'set_target':
                if (!client.character) return

                client.character.setTarget(payload)
                break;

            case 'select_upgrade':
                if (!client.character) return

                client.character.upgrade(payload)
                break;

            case 'set_left_teacher':
                if (!client.character) return

                client.character.left_teacher = true
                UpgradeManager.closeSuggest(client.character)
                UpgradeManager.closeUpgrades(client.character)
                break;
            case 'set_left_forger':
                if (!client.character) return

                client.character.left_forger = true
                UpgradeManager.closeSuggest(client.character)
                UpgradeManager.closeForgings(client.character)
                break;

            case 'hold_grace':
                if (!client.character) return

                UpgradeManager.holdGrace(client.character)
                break;

            case 'hold_ascend':
                if (!client.character) return

                UpgradeManager.holdAscend(client.character)
                break;

            case 'exit_grace':
                if (!client.character) return

                client.character.exitGrace()
                break;

            case 'sacrifice':
                if (!client.character) return

                UpgradeManager.sacrifice(client.character)
                break;
        }
    }

    initSocket() {
        return
        
        this.createName()
        this.initializeRedis()

        this.socket.on('connection', (socket: Socket) => {
            // socket.emit('connect_to_lobby')

            // socket.emit('server_status', {
            //     status: this.game_started || this.clients.size >= GameServer.MAX_PLAYERS,
            //     realise: this.realise,
            //     realise_name: this.realise_name,
            // })

            if (!this.game_started && this.clients.size < GameServer.MAX_PLAYERS) {
                let client: Client = this.createNewClient(socket)

                // socket.on('change_class', (class_name: string) => {
                //     client.template.setTemplate(class_name)
                //     this.updateLobby()
                // })

                // socket.on('add_record', name => {
                //     this.addRecord(name, socket.id)
                // })

                // socket.on('set_start_scenario', start_scenario_name => {
                //     this.start_scenario_name = start_scenario_name
                // })

                // socket.on('increase_stat', (stat: string) => {
                //     client.template.increseStat(stat)
                //     this.updateLobby()
                // })

                // socket.on('decrease_stat', (stat: string) => {
                //     client.template.decreaseStat(stat)
                //     this.updateLobby()
                // })

                // socket.on('get_lobby_data', () => {
                //     this.updateLobby()
                // })

                // socket.on('get_grand_forging', amount => {
                //     if(amount <= 0) return
                //     if (!client.character) return

                //     UpgradeManager.getGrandForging(amount, client.character)
                // })

                // socket.on('apply_grand_forging', (f_name, i_name) => {
                //     if (!client.character) return

                //     UpgradeManager.applyGrandForging(f_name, i_name, client.character)
                // })

                // socket.on('forge_item', data => {
                //     if (!client.character) return

                //     UpgradeManager.forgeItem(data, client.character)
                // })

                // socket.on('pick_item', (item_name: string) => {
                //     let data: Client[] = Array.from(this.clients.values())
                //     let items = this.getAllPlayersItems(data)
                //     if (items.some(elem => elem === item_name)) return

                //     let item = Builder.createItem(item_name)

                //     if (client.template.item.length >= client.template.max_items) {
                //         client.template.item.pop()
                //     }

                //     client.template.item.push(item)

                //     this.updateLobby()
                // })

                // socket.on('unpick_item', (item_name: string) => {
                //     client.template.item = client.template.item.filter(
                //         elem => elem.name != item_name
                //     )
                //     this.updateLobby()
                // })

                // socket.on('unlock_forging', (item_name: string) => {
                //     if (!client.character) return

                //     UpgradeManager.unlockForging(item_name, client.character)
                // })

                // socket.on('select_skill', (skill_name: string) => {
                //     let selected: TemplateAbility | undefined = client.template.abilities.find(
                //         elem => elem.name === skill_name
                //     )
                //     if (!selected) return

                //     let type: number = selected.type
                //     if (!type) return

                //     client.template.abilities
                //         .filter(elem => elem.type === type)
                //         .forEach(elem => (elem.selected = false))
                //     if (selected) {
                //         selected.selected = true
                //     }
                //     this.updateLobby()
                // })

                // socket.on('inputs', (inputs: object) => {
                //     if (!client.character) return

                //     client.character.setLastInputs(inputs)
                // })

                // socket.on('add_mastery', (data: object) => {
                //     if (!client.character) return

                //     UpgradeManager.addMastery(client.character, data)
                // })

                // socket.on('buy', () => {
                //     if (!client.character) return

                //     UpgradeManager.buyNewItem(client.character)
                // })

                // socket.on('load_template', data => {
                //     try {
                //         client.template.abilities = data.abilities
                //         client.template.item = []

                //         data.item.forEach(elem => {
                //             if (elem.name != '') {
                //                 let item = Builder.createItem(elem.name)
                //                 client.template.item.push(item)
                //             }
                //         })
                //         client.template.stats = data.stats
                //         client.template.stat_count = data.stat_count

                //         this.updateLobby()
                //     } catch (e) {}
                // })

                // socket.on('buy_item', id => {
                //     if (!client.character) return

                //     UpgradeManager.buyItem(id, client.character)
                // })

                // socket.on('pick_forging', (item_id, id) => {
                //     if (!client.character) return

                //     UpgradeManager.pickForging(item_id, id, client.character)
                // })

                // socket.on('donate', () => {
                //     if (!client.character) return
                //     if (client.character.gold < 100) return

                //     client.character.gold -= 100
                //     client.character.grace ++

                //     UpgradeManager.closeForgings(client.character)
                // })

                // socket.on('player_ready', () => {
                //     client.ready = !client.ready

                //     if (this.allPlayersAreReady()) {
                //         clearTimeout(this.new_game_timeout)

                //         this.new_game_timeout = setTimeout(() => {
                //             let all_still_ready: boolean = this.allPlayersAreReady()
                //             if (all_still_ready) {
                //                 this.level = new Level(this)

                //                 this.clients.forEach((value, key, map) => {
                //                     if (this.level) {
                //                         let char: Character = Builder.createCharacter(
                //                             value,
                //                             this.level
                //                         )
                //                         value.character = char
                //                         this.level.assignPlayer(char)
                //                     }
                //                 })

                //                 this.game_started = true
                //                 this.socket.emit('start', Array.from(this.clients.values()))
                //                 this.level.start(this.start_scenario_name)
                //                 this.updateRedisLobby()
                //             }
                //         }, 3000)
                //     }

                //     this.updateLobby()
                // })

                // socket.on('disconnect', () => {
                //     this.clients.delete(socket.id)

                //     if (this.clients.size === 0) {
                //         this.removeLevel()
                //         this.createName()
                //     } else {
                //         this.updateLobby()
                //     }
                //     this.updateRedisLobby()
                // })

                // socket.on('set_target', id => {
                //     if (!client.character) return
                //     client.character.setTarget(id)
                // })

                // socket.on('select_upgrade', upgrade_name => {
                //     if (!client.character) return

                //     client.character.upgrade(upgrade_name)
                // })

                // socket.on('hold_grace', () => {
                //     if (!client.character) return

                //     UpgradeManager.holdGrace(client.character)
                // })

                // socket.on('hold_ascend', () => {
                //     if (!client.character) return

                //     UpgradeManager.holdAscend(client.character)
                // })

                // socket.on('exit_grace', () => {
                //     if (!client.character) return
                //     client.character.exitGrace()
                // })

                // socket.on('sacrifice', () => {
                //     if (!client.character) return

                //     UpgradeManager.sacrifice(client.character)
                // })
            }
        })
    }

    allPlayersAreReady(): boolean {
        let a = Array.from(this.clients.values())
        return a.length != 0 && a.every(elem => elem.ready)
    }
}