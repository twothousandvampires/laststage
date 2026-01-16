<template>
    <div id="forge">
        <div class="left-block">
            <div style="display: flex;width: 100%;justify-content: space-around;padding: 4px;">
                <div>
                    <p style="font-size: 16px; color: gold;"
                    @mouseover="$title($event, 'Click on item for unlocking forgings. Cost depends on existing count.')"
                    @mouseleave="$closeTitle()"
                    >gold: 
                </p>
                <span>{{ data.gold }}</span>
                </div>
                <div>
                    <p style="font-size: 16px; color: gold;"
                        @mouseover="$title($event, 'What is this for?')"
                        @mouseleave="$closeTitle()"
                        @click="showSparks()">
                        sparks:
                    </p>
                    <span> {{ data.carved_sparks }}</span>
                </div>          
            </div>
        </div>
        <div v-if="items.length" id="suggest">
            <div v-for="(item, index) in items">
                <img
                class="button"
                @mouseover="$title($event, item.description)"
                @mouseleave="$closeTitle()"
                @click="$socket.emit('buy_item', index); items.length = 0"
                :src="`/icons/${item.name}.png`" alt="">
            </div>
        </div>
        <div v-if="forgings.length" id="suggest">
            <div v-for="(forging, index) in forgings">      
                <p
                class="button"
                @mouseover="$title($event, forging.description + '(upgrade cost: ' +  forging.cost + ')')"
                @mouseleave="$closeTitle()"
                @click="$socket.emit('pick_forging', {id: id, index: index}); forgings.length = 0">
                {{  forging.name }}
                </p>
            </div>
        </div>
       
        <div style="display: flex;flex-direction: column; justify-content: start;align-items: center;gap: 10px">
            <div style="display: flex;flex-direction: column; justify-content: center;align-items: center;gap: 10px;width: 100%;">      
                <div style="width: 100%;display: flex;justify-content: space-around;">
                    <p
                        class="button"
                        style="color: whitesmoke;font-size: 20px;"
                        @click="$socket.emit('set_left_forger')"
                        >left
                    </p>
                     <p v-if="data.gold >= 100"
                        @mouseover="$title($event, 'Pay 100 gold and get one grace.')"
                        @mouseleave="$closeTitle()"
                        @click="$socket.emit('donate')"
                        style="font-size: 20px;cursor: pointer;"
                        class="button">donate
                    </p>
                    <p v-if="data.can_buy"
                        @mouseover="$title($event, 'Buy an item for 100 gold.')"
                        @mouseleave="$closeTitle()"
                        @click="$socket.emit('buy')" 
                        style="font-size: 20px;cursor: pointer;"
                        class="button"> buy item
                    </p>
                    <p 
                        @mouseover="$title($event, 'Spend all of your carved sparks (max is 100), the more there are, the greater the chance of creating a synthesized property, which can then be applied to an item')"
                        @mouseleave="$closeTitle()" 
                        class="button"
                        @click.stop="getGrandForging()"
                        style="font-size: 20px;cursor: pointer;"
                    >synthesize</p>
                </div>
           
        </div>
       
        <div style="max-width: 400px;">
                <img v-for="grand_forging in data.grand_forgings"
                class='button'
                @mouseover="$title($event, {
                    main_title: grand_forging.name,
                    text: grand_forging.description
                })"
                @mouseleave="$closeTitle()" 
                @click.stop="selectGrandForging(grand_forging.name)"
                width="60px"
                height="60px"
                :src="`/icons/synthesized property.png`" alt=""
            >
        </div>
        <div style="grid-template-columns: 220px 220px; display: grid;margin-bottom: 20px;gap: 20px 0;">
            <div v-for="item in data.items" style="display: flex; flex-direction: column;align-items: center;">
                <div style="display: flex;">
                    <img
                    :class="item.forge.length < item.max_forgings ? 'button' : ''"
                    @mouseover="$title($event, {
                        main_title: getUnlockCost(item),
                        text: item.description
                    })"
                    @mouseleave="$closeTitle()" 
                    @click="unlockForge(item)"
                    width="60px"
                    height="60px"
                    :src="`/icons/${item.name}.png`" alt=""
                >
                    <!-- <p style="font-size: 12px; color: black;">
                        {{ item.name }}
                    </p> -->
                </div>
                
                <div style="display: flex; flex-direction: column;">
                    <p  :style="forge.can ? '' : 'background-color: red'" v-for="(forge, index) in item.forge"
                        class="button"
                        @mouseover="$title($event, forge.description + '\n(upgrade cost: ' +  forge.cost + ')')"
                        @mouseleave="$closeTitle()"
                        @click="$socket.emit('forge_item', {
                            item_name: item.name,
                            forge: index
                        })">
                        <span style="font-size: 14px;">{{ forge.name }} ({{ forge.value }})</span>
                    </p>
                </div>         
                
            </div>
        </div>
        
        </div>
         <Stats :stats="data.stats" :triggers="data.triggers"></Stats>
    </div>
</template>
<script setup>
    const { $getInstance, $title, $closeTitle } = useNuxtApp();
    
    let $socket = $getInstance()
 
    const props = defineProps({
    data: {
        type: Object,
        required: true,
        },
    });


    console.log(props.data.items)

    let items = ref([])
    let forgings =  ref([])
    let id = ref(0)

    let grand_forging_name = ref('')

    let unlockForge = (item) => {
        if(grand_forging_name.value != ''){
            applyGrandForging(item.name)
        }
        else{
            $socket.emit('unlock_forging', item.name)
            item.length = 0
        }       
    }

    let getGrandForging = () => {
        let a = props.data.carved_sparks
        if(a > 100){
            a = 100
        }
        $socket.emit('get_grand_forging', a)
    }

    let getUnlockCost = (item) => {
        if(item.forge.length >= item.max_forgings) return 'maximum forgings'
        return 'forging unlock cost: ' + ((item.forge.length * 15) + 15)
    }

    let applyGrandForging = (item_name) => {
        $socket.emit('apply_grand_forging', {
            f_name: grand_forging_name.value,
            i_name: item_name        
        })
        grand_forging_name.value = ''
    }   

    let selectGrandForging = (name) => {
        grand_forging_name.value = name
    }

    $socket.on('suggest_items', (data) => {
        items.value = data
    })

    $socket.on('suggest_forgings', data => {
        id.value = data.item_id
        forgings.value = data.data
    })
</script>