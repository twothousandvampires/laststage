<template>
  <div id="game-info">
    <h1 style="text-align: center;">LAST STAGE</h1>
        <div id="modile-info">
            <h3>Smartphone movement</h3>
            <p>
                If you play on a smartphone, there are 2 sticks.The first one is for movement, the second one is for using abilities.
                The distance from the center of the second stick will determine how far away the point on the map will be, if the ability requires it.
            </p>
        </div>
        <h2>There are 2 types of resources in the game:</h2>
        <ul>
            <li>energy</li>
            <li>courage</li>
        </ul>

        <div>
            <img src="/preview/image.jpg" alt="">
        </div>

        <h3>Each class gets them differently:</h3>
        <ul>
            <li>Swordsman gains energy when dealing damage with abilities, courage when killing</li>
            <li>The sorcerer gains energy over time, courage when using the spell</li>
            <li>The cultist gains courage and energy when receiving damage</li>
        </ul>
        <p>
            Each ability except the last one does not consume energy, you just need to have enough energy to use it.
            The last ability consumes energy when used. Utility skills only have a cooldown.
            The main gameplay is using the first skill, getting enough energy for the second, and then using the last one.
        </p>
        <p>
            Utility uses by pressing 'E'.
        </p>
        <p>Courage hiddenly affects the strength of skills and the character, and is lost when receiving damage.</p>

        <br>

        <h2>Attacking mechanics:</h2>
        
        <h3>There is no so-called damage amount in the game. There is simply DAMAGE, let's imagine it as just a one damage. Any ability deals one damage.</h3>
            
        <ul style="gap: 10px">
            <li style="margin-bottom: 10px;"> If pierce rating is higher than armour rating you have a chance to deal additional damage based on difference.</li>
            <li style="margin-bottom: 10px;">Critical strike gives a chance to deal double damage.</li>
            <li style="margin-bottom: 10px;">The player also has a crushing rating, which gives a chance to apply a crush stack to an enemy, which will increase damage the next time they take damage.</li>
            <li style="margin-bottom: 10px;">After all damage calculation, power stat gives a chance to increase damage by 1.</li>
            <li style="margin-bottom: 10px;">Player and enemies may have fragile status. That multiple total incoming damage by 2.</li>
            <li>And the last stat that helps deal damage is "Impact". It has a default cooldown of 2 seconds. When triggered, it deals damage to adjacent targets. Does not deal damage to hit target.</li>
        </ul>
    
        <br>

        <h2>Defending mechanics:</h2>

        <ul>
            <li style="margin-bottom: 10px;">
                The player starts with 4 lives, and regenerates them over time. 
                By default, you can't regenerate more than 4, but there are ways to bypass it (for example, "LUST FOR LIFE").
                If you have more than 4 lives, your status will be - "BLESSED".
            </li>
            <li style="margin-bottom: 10px;">
                There is another defensive mechanic in the game - "WARD". If you have a ward, when you receive damage it will be spent, triggers for receiving damage will not work in this case.
                If you have ward, your status will be - "WARDED".
            </li>
            <li style="margin-bottom: 10px;">
                <p>You can block damage by pressing "SPACE", each class has a different block chance and it can be increased in different ways.</p>
                <p>You immediately enter a blocked state after pressing SPACE. Don't rely on the animation.</p>
            </li>
            <li style="margin-bottom: 10px;">
                If armour rating is higher than pierce rating you have a chance to block damage based on difference.
            </li>
             <li style="margin-bottom: 10px;">
                "SPIRIT" - Gives a chance lose resource instead life when getting damage.
            </li>
            <li>
               "FORTIFICATION" - Gives a chance to reduce total damage by 1. Calculating before crit calculation.
            </li>
        </ul>
    
        <div>
            <h2 class="button" @click.stop="show_examples = !show_examples">Click to see some examples</h2>
            <div v-if="show_examples">
                <div style="display: flex;">
                    <div style="padding: 6px;">
                        <p class="player-stat">Player:</p>
                        <p class="player-stat">PIERCE - 31</p>
                        <p class="player-stat">CRITICAL - 14</p>
                        <p class="player-stat">CRUSHING - 5</p>
                        <p class="player-stat">IMPACT - 56</p>
                        <p class="player-stat">POWER - 43</p>
                    </div>
                    <div style="padding: 6px;">
                        <p class="enemy-stat">Enemy: </p>
                        <p class="enemy-stat">ARMOUR - 44</p>
                        <p class="enemy-stat">FORTIFICATION - 12</p>
                        <p class="enemy-stat">CRUSH STACKS - 0</p>
                        <p class="enemy-stat">FRAGILE - yes</p>
                    </div>
                    <div style="width: 65%;">
                        <p>Base damage is <span class="player-stat">1</span></p>
                        <p><span class="player-stat">PIERCE</span> less than <span class="enemy-stat">ARMOUR</span> and diference is 13, so chance that enemy avoid damage is 13% - no proc, enemy did not avoid damage</p>
                        <p>enemy do not has <span class="enemy-stat">CRUSH STACKS</span> damage still is 1</p>
                        <p>new <span class="enemy-stat">CRUSH STACK</span> chance is 5% - no proc, <span class="enemy-stat">CRUSH STACK</span> still is 0</p>
                        <p><span class="enemy-stat">FORTIFICATION</span> chance is 12% - no proc, damage still is 1</p>
                        <p><span class="player-stat">CRITICAL</span> chance is 14% - proc, damage now is 1 * 2 = 2</p>
                        <p>enemy is <span class="enemy-stat">FRAGILE</span>, damage now is 2 * 2 = 4</p>
                        <p><span class="player-stat">POWER</span> chance is 43% - proc, damage now is 4 + 1 = 5</p>
                        <p>so, total damage is 5</p>
                        <p><span class="player-stat">IMPACT</span> chance is 56% - proc, surrounding targets get 5 damage</p>
                    </div>
                </div>
                 <div style="display: flex;">
                    <div style="padding: 6px;">
                        <p class="player-stat">Player:</p>
                        <p class="player-stat">PIERCE - 24</p>
                        <p class="player-stat">CRITICAL - 16</p>
                        <p class="player-stat">CRUSHING - 51</p>
                        <p class="player-stat">IMPACT - 24</p>
                        <p class="player-stat">POWER - 4</p>
                    </div>
                    <div style="padding: 6px;">
                        <p class="enemy-stat">Enemy: </p>
                        <p class="enemy-stat">ARMOUR - 10</p>
                        <p class="enemy-stat">FORTIFICATION - 3</p>
                        <p class="enemy-stat">CRUSH STACKS - 1</p>
                        <p class="enemy-stat">FRAGILE - no</p>
                    </div>
                    <div style="width: 65%;">
                        <p>Base damage is <span class="player-stat">1</span></p>
                        <p><span class="player-stat">PIERCE</span> more thar <span class="enemy-stat">ARMOUR</span> and diference is 14, so chance is 14% - no proc, damage still is <span class="player-stat">1</span></p>
                        <p>enemy has <span class="enemy-stat">CRUSH STACKS</span> damage now 1 + 1 = 2</p>
                        <p>new <span class="enemy-stat">CRUSH STACK</span> chance is 51% - proc, <span class="enemy-stat">CRUSH STACK</span> on enemy now is 2</p>
                        <p><span class="enemy-stat">FORTIFICATION</span> chance is 3% - proc, damage now is 2 - 1 = 1</p>
                        <p><span class="player-stat">CRITICAL</span> chance is 16% - no proc, damage still is 1</p>
                        <p>enemy is not <span class="enemy-stat">FRAGILE</span>, damage still is 1</p>
                        <p><span class="player-stat">POWER</span> chance is 4% - no proc, damage still is 1</p>
                        <p>so, total damage is 1</p>
                        <p><span class="player-stat">IMPACT</span> chance is 24% - proc, surrounding targets get 1 damage</p>
                    </div>
                </div>
                <div style="display: flex;">
                    <div style="padding: 6px;">
                        <p class="enemy-stat">Enemy: </p>
                        <p class="enemy-stat">PIERCE - 44</p>
                        <p class="enemy-stat">CRITICAL - 24</p>
                        <p class="enemy-stat">POWER - 17</p>
                    </div>
                    <div style="padding: 6px;">
                        <p class="player-stat">Player:</p>
                        <p class="player-stat">ARMOUR - 31</p>
                        <p class="player-stat">BLOCK CHANCE - 65</p>
                        <p class="player-stat">SPIRIT - 10</p>
                        <p class="player-stat">WARD - 0</p>
                        <p class="player-stat">FORTIFICATION - 10</p>
                        <p class="player-stat">IN BLOCK STANCE - yes</p>
                        <p class="player-stat">FRAGILE - no</p>
                    </div>
                    <div style="width: 65%;">
                        <p>Base damage is <span class="player-stat">1</span></p>
                        <p>player has no <span class="player-stat">WARD</span> damage did not absorbed</p>
                        <p>player's <span class="player-stat">SPIRIT</span> is 10, - no proc, damage did not go to energy instead life</p>
                        <p>player <span class="player-stat">IN BLOCK STANCE</span> and <span class="player-stat">BLOCK CHANCE</span> is 65% - no proc, damage did not avoided</p>
                        <p>enemy's <span class="enemy-stat">PIERCE</span> more than player's <span class="player-stat">ARMOUR</span> and diference is 13, chance is 13% - proc, damage now is 1 + 1</p>
                        <p><span class="player-stat">FORTIFICATION</span> chance is 10% - no proc, damage still is 2</p>
                        <p>enemy's <span class="enemy-stat">CRITICAL</span> chance is 24% - proc, damage now is 2 * 2 = 4</p>
                        <p>player is not <span class="player-stat">FRAGILE</span>, damage still is 4</p>
                        <p>enemy's <span class="player-stat">POWER</span> chance is 17% - proc, damage now is 4 + 1 = 5</p>
                        <p>so, total damage is 5</p>
                        <p>player lose 5 life</p>
                    </div>
                </div>
                <div style="display: flex;">
                    <div style="padding: 6px;">
                        <p class="enemy-stat">Enemy: </p>
                        <p class="enemy-stat">PIERCE - 12</p>
                        <p class="enemy-stat">CRITICAL - 55</p>
                        <p class="enemy-stat">POWER - 14</p>
                    </div>
                    <div style="padding: 6px;">
                        <p class="player-stat">Player:</p>
                        <p class="player-stat">ARMOUR - 76</p>
                        <p class="player-stat">BLOCK CHANCE - 50</p>
                        <p class="player-stat">SPIRIT - 0</p>
                        <p class="player-stat">WARD - 1</p>
                        <p class="player-stat">FORTIFICATION - 0</p>
                        <p class="player-stat">IN BLOCK STANCE - no</p>
                        <p class="player-stat">FRAGILE - yes</p>
                    </div>
                    <div style="width: 65%;">
                        <p>Base damage is <span class="player-stat">1</span></p>
                        <p>player has <span class="player-stat">WARD</span> damage absorbed, 1 <span class="player-stat">WARD</span> was losed</p>
                    </div>
                </div>
                <div style="display: flex;">
                    <div style="padding: 6px;">
                        <p class="enemy-stat">Enemy: </p>
                        <p class="enemy-stat">PIERCE - 26</p>
                        <p class="enemy-stat">CRITICAL - 56</p>
                        <p class="enemy-stat">POWER - 2</p>
                    </div>
                    <div style="padding: 6px;">
                        <p class="player-stat">Player:</p>
                        <p class="player-stat">ARMOUR - 65</p>
                        <p class="player-stat">BLOCK CHANCE - 50</p>
                        <p class="player-stat">SPIRIT - 0</p>
                        <p class="player-stat">WARD - 0</p>
                        <p class="player-stat">FORTIFICATION - 20</p>
                        <p class="player-stat">IN BLOCK STANCE - no</p>
                        <p class="player-stat">FRAGILE - no</p>
                    </div>
                    <div style="width: 65%;">
                        <p>Base damage is <span class="player-stat">1</span></p>
                        <p>player has no <span class="player-stat">WARD</span> damage did not absorbed</p>
                        <p>player's <span class="player-stat">SPIRIT</span> is 0, - no proc, damage did not go to energy instead life</p>
                        <p>player is not <span class="player-stat">IN BLOCK STANCE</span></p>
                        <p>enemy's <span class="enemy-stat">PIERCE</span> less than player's <span class="player-stat">ARMOUR</span> and diference is 39, chance is 39% - proc, damage absorbed by armour</p>
                    </div>
                </div>
            </div>

            <h3 class="player-stat">If we sum it up, the calculation of dealing damage to enemy is "base damage" -> "pierce or amour proc" -> "crush stacks" -> "enemy fotrtification chance" -> "critical chance" -> "enemy fragile status" -> "power proc" -> "impact proc"</h3>
            <h3 class="enemy-stat">The calculation of dealing damage to player is "base damage" -> "ward absorb" -> "spirit absorb" -> "block chance" -> "pierce or armour proc" -> "player fortification chance" -> "enemy critical chance" -> "player fragile status" -> "enemy power"</h3>
        </div>
       
        <br>

        <h2>Game flow:</h2>

        <h3>The player has 3 currencies:</h3>

        <ul>
            <li>grace (spent on improving the character, buying and improving new/existing skills, getting strong buffs for a while)</li>
            <li>gold (spent on purchasing and upgrading items)</li>
            <li>ascent (uses to reroll upgrades and deteminates how powerfull upgrades you will get)</li>
        </ul>
    
        <p>
            You can take 2 items on start, buy 2 items from vendor and find 2 items from enemies drop.
        </p>

        <br>
        
        <h3>Game drop:</h3>
        <p>
            When killing enemies, you will get something:
            <ul>
                <li>Grace - gives you 1 grace <span><img width="120px" height="120px" src="/preview/grace.png"></span></li>
                <li>Essence - resrores health and briefly increases vision radius <span><img  width="120px" height="120px" src="/preview/entity.png"></span></li>
                <li>Energy sphere - gives 2 energy and phasing<span><img width="120px" height="120px" src="/preview/charged_sphere.png"></span></li>
                <li>Sorcerer's skull - gives 1 ward and one free cast<span><img width="120px" height="120px" src="/preview/skull.gif"></span></li>
                <li>Item - gives a random item <span><img width="120px" height="120px" src="/preview/item_drop.gif"></span></li>
                <li>Helm - increases random stat and increases ascent level <span><img class="bg" width="120px" height="120px" src="/preview/helm.png"></span></li>
            </ul>
        </p>

        <h3>If you kill a enemy by youself you will get gold.</h3>

        <br>

        <p>Periodically a portal will appear where you can spend gold and grace to improve the character. Will last for 1 minute.<span><img class="bg" width="120px" height="120px" src="/preview/grace_portal.png"></span></p>

        <br>

        <h3>Statuses</h3>
        <p>During the game, negative and positive statuses will be applied to you, for example:
            <ul>
                <li>weakness - you can't block and receive energy <span><img width="60px" height="60px" src="/icons/weakness.png"></span></li>
                <li>poison - you can't gain life <span><img width="60px" height="60px" src="/icons/poison.png"></span></li>
                <li>stream - receiving energy every 2 seconds <span><img width="60px" height="60px" src="/icons/stream.png"></span></li>
                <li>immortality - you can't take damage <span><img width="60px" height="60px" src="/icons/immortality.png"></span></li>
                <li>phasing - you can move through enemies <span><img width="60px" height="60px" src="/icons/phase.png"></span></li>
                <li>etc.</li>
            </ul>
        </p>
        
        <h3>Game activities</h3>
         
        <h4>Manifistations</h4>
        <div>
            <p>
                After a certain amount of time, activate it. Once activated, you'll gain complications, and after a short time, it will reappear. The activation time and penalty will increase. If this has been activated at least once, or there have been five activations, you'll receive a reward whose strength depends on the number of activations.
            </p>
            <div>
                <img title="forging your items, summons enemies when activated" width="200px" height="200px" style="margin-right: 12px;" src="/preview/forge_manifistation.png" alt="">
                <img title="increases your stats, applyes negative status to you when activated"  width="200px" height="200px"  src="/preview/flesh_manifistation.png" alt="">
            </div>
        </div>
        <h4>Challenges</h4>
        <div>
            <p>
                If all players have activated the challenge, a zone will be created for you to complete. Completing the challenge will earn you a reward; exiting the zone or failing to complete the challenge will incur a penalty.
            </p>
            <div>
                <img title="create a portal and gives one free upgrade, when failed drains 3 grace" width="200px" height="200px" style="margin-right: 12px;" src="/preview/ultimate1.png" alt="">
                <img title="increases enemy create rate and chance for dropping grace from them, when failed reduces enemy create rate"  width="200px" height="200px"  src="/preview/ultimate2.png" alt="">
            </div>
        </div>
        
        <h4>Ancient</h4>

        <div>
            <p>
                There are 20 seconds during which you can hit him, after disappearing there is a chance, based on the number of hits you have on him, to get a powerful trigger.
            </p>
            <div>
                 <img width="200px"  style="margin-right: 12px;" height="200px"  src="/preview/ancient.png" alt=""></img>
                 <img width="200px" height="200px"  src="/preview/ancient2.png" alt=""></img>
            </div>
        </div>

        <h4>Sigils</h4>

        <div>
            <p>
                Drains your energy to give you more help.
            </p>
            <div>
                 <img  style="margin-right: 12px;" title="drains 6 energy and cast powerfull spell afterwards" width="200px" height="200px"  src="/preview/callofpower.png" alt=""></img>
                 <img title="drains 6 courage and grants powerful status afterwards." width="200px" height="200px"  src="/preview/circleofcalm.png" alt=""></img>
            </div>
        </div>

        <h2>HAFE FUN!</h2>
  </div>
</template>
<script setup>
    let show_examples = ref(false)
</script>
 <style>
    .enemy-stat{
        color: red;
        font-size: 20px;
    }
    .player-stat{
        color: darkgreen;
        font-size: 20px;
    }
</style>
