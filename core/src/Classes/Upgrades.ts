import Character from '../Objects/src/Character'
import Upgrade from '../Types/Upgrade'
import Touch from '../Status/Touch'
import WithColdStatus from '../Status/WithColdStatus'
import WithFireStatus from '../Status/WithFireStatus'
import WithStormStatus from '../Status/WithStormStatus'
import BlessedArmour from '../Status/BlessedArmour'
import Func from '../Func'
import CallWarriorWhenBlock from '../Triggers/CallWarriorWhenBlock'
import SoulShatter from '../Abilities/Cultist/SoulShatter'
import BurningCircle from '../Abilities/Cultist/BurningCircle'
import Rune from '../Abilities/Cultist/Rune'
import Cultist from '../Objects/src/PlayerClasses/Cultist'
import Slam from '../Abilities/Cultist/Slam'
import ShieldBash from '../Abilities/Cultist/ShieldBash'
import GrimPile from '../Abilities/Cultist/GrimPile'
import UnleashPain from '../Abilities/Cultist/UnleashPain'
import PileOfThornCast from '../Abilities/Cultist/PileOfThornCast'
import SelfFlagellation from '../Abilities/Cultist/SelfFlagellation'
import GhostForm from '../Abilities/Cultist/GhostForm'
import AnnihilatorBeam from '../Abilities/Flyer/AnnihilatorBeam'
import Teeth from '../Abilities/Flyer/Teeth'
import FlameWall from '../Abilities/Flyer/FlameWall'
import Flyer from '../Objects/src/PlayerClasses/Flyer'
import Fireball from '../Abilities/Flyer/Fireball'
import FrostSphere from '../Abilities/Flyer/FrostSphere'
import LightningBolt from '../Abilities/Flyer/LightningBolt'
import ForkedLightning from '../Abilities/Flyer/ForkedLightning'
import LightBeacon from '../Abilities/Flyer/LightBeacon'
import Frostnova from '../Abilities/Flyer/Frostnova'
import StaticField from '../Abilities/Flyer/StaticField'
import Teleportation from '../Abilities/Flyer/Teleportation'
import Sparks from '../Abilities/Flyer/Sparks'
import ShatteredWeapon from '../Abilities/Swordman/ShatteredWeapon'
import BlockingTechnique from '../Triggers/BlockingTechnique'
import HeavenVengeance from '../Abilities/Swordman/HeavenVengeance'
import EmergencyOrdersTrigger from '../Triggers/EmergencyOrdersTrigger'
import WeaponSwing from '../Abilities/Swordman/WeaponSwing'
import WeaponThrow from '../Abilities/Swordman/WeaponThrow'
import Jump from '../Abilities/Swordman/Jump'
import Charge from '../Abilities/Swordman/Charge'
import Whirlwind from '../Abilities/Swordman/Whirlwind'
import Quake from '../Abilities/Swordman/Quake'
import CursedWeapon from '../Abilities/Swordman/CursedWeapon'
import Commands from '../Abilities/Swordman/Commands'
import Swordman from '../Objects/src/PlayerClasses/Swordman'
import MetalThorns from '../Abilities/Swordman/MetalThorns'
import Dash from '../Abilities/Swordman/Dash'
import SpectralSwords from '../Abilities/Swordman/SpectralSwords'
import Soulrender from '../Abilities/Cultist/Soulrender'
import Redemption from '../Status/Redemption'
import FleshHarvest from '../Status/FleshHarvest'
import WardAfterEnlightTrigger from '../Triggers/WardAfterEnlightTrigger'
import DivineWeaponTrigger from '../Triggers/DivineWeaponTrigger'
import UnhumanFortitudeTrigger from '../Triggers/UnhumanFortitudeTrigger'
import MassiveImpactTrigger from '../Triggers/MassiveImpactTrigger'
import InspirationTrigger from '../Triggers/InspirationTrigger'
import Creator from '../Status/Creator'
import DamageInRadiusWhenEnlightnent from '../Triggers/DamageInRadiusWhenEnlightnent'
import InnerPowerTrigger from '../Triggers/InnerPowerTrigger'
import Luck from '../Status/Luck'
import Forging from '../Items/Forgings/Forging'
import MagicFlowTrigger from '../Triggers/MagicFlowTrigger'
import RisingMoraleTrigger from '../Triggers/RisingMoraleTrigger'
import CrushingWave from '../Status/CrushingWave'
import FromDefendToAttackTrigger from '../Triggers/FromDefendToAttackTrigger'
import WallOfWillTrigger from '../Triggers/WallOfWillTrigger'
import FirstToStrikeTrigger from '../Triggers/FirstToStrikeTrigger'
import PressingSteps from '../Status/PressingSteps'
import ScreamTrigger from '../Triggers/ScreamTrigger'
import ImpactTrigger from '../Triggers/ImpactTrigger'
import CuttingMutator from '../Mutators/CuttingMutator'
import AnnihilationMutator from '../Mutators/AnnihilationMutator'
import CourageAvoidDamage from '../Mutators/CourageAvoidDamage'
import FocusingMutator from '../Mutators/FocusingMutator'
import BlessedWarrioraArmourMutator from '../Mutators/BlessedWarrioraArmourMutator'
import BlessedWarriorPierceMutator from '../Mutators/BlessedWarriorPierceMutator'
import SpiritStrikes from '../Triggers/SpiritStrikes'
import SpiritStrikesMutator from '../Mutators/SpiritStrikesMutator'
import BreakingBonesTrigger from '../Triggers/BreakingBonesTrigger'
import BreakingArmorTrigger from '../Triggers/BreakingArmorTrigger'
import LethalStrikesOnCritical from '../Triggers/LethalStrikesOnCritical'
import ThroughAndThrough from '../Triggers/ThroughAndThrough'
import GoldenChainmailMutator from '../Mutators/GoldenChainmailMutator'
import AscendedPierceMutator from '../Mutators/AscendedPierceMutator'
import AscendedArmourMutator from '../Mutators/AscendedArmourMutator'
import LustForLife from '../Mutators/LustForLife'
import ServiceTrigger from '../Triggers/ServiceTrigger'
import PainExtract from '../Triggers/PainExtract'
import ChargedShield from '../Triggers/ChargedShield'
import FirmGripMutator from '../Mutators/FirmGripMutator'
import CoordinationMutator from '../Mutators/CoordinationMutator'
import EnergyArmourMutator from '../Mutators/EnergyArmourMutator'
import RegeneratingBlocks from '../Triggers/RegeneratingBlocks'
import Builder from './Builder'
import MatterDistortionTrigger from '../Triggers/MatterDistortionTrigger'
import MentalShieldMutator from '../Mutators/MentalShieldMutator'
import WillToSurviveTrigger from '../Triggers/WillToSurviveTrigger'
import LastChance from '../Triggers/LastChance'
import GoodMoment from '../Triggers/GoodMoment'
import AbsorptionTrigger from '../Triggers/AbsorptionTrigger'

export default class Upgrades {
    static getAllUpgrades(): Upgrade[] {
        return [
            {
                name: 'energy armour',
                canUse: (character: Character) => {
                    return !character.avaid_damage_mutator.some(elem => elem instanceof EnergyArmourMutator)
                },
                teach: (character: Character): void => {
                    character.maximum_resources ++
                    character.avaid_damage_mutator.push(new EnergyArmourMutator())
                },
                cost: 2,
                ascend: 27,
                desc: 'Increases maximum energy and the chance to avoid damage based on energy',
            },
            {
                name: 'will',
                canUse: (character: Character) => {
                    return character.additional_energy_chance < 100
                },
                teach: (character: Character): void => {
                    character.spirit ++
                    character.additional_energy_chance ++
                },
                cost: 1,
                desc: 'Increases spirit and the chance to gain additional energy',
            },
            {
                name: 'offense',
                canUse: (character: Character) => {
                    return true
                },
                teach: (character: Character): void => {
                    character.move_speed_penalty ++
                    character.pierce ++
                },
                cost: 1,
                desc: 'Increases pierce rating and movement speed',
            },
             {
                name: 'iron will',
                canUse: (character: Character) => {
                    return !(character instanceof Cultist)
                },
                teach: (character: Character): void => {
                    character.additional_courage_chance += 2
                    character.not_to_lose_courage_when_damage_chance +=5
                },
                cost: 2,
                ascend: 20,
                desc: 'Gives a chance not to lose courage when get hit and increases a chance to get additional courage',
            },
            {
                name: 'might',
                canUse: (character: Character) => {
                    return character.power >= 30
                },
                teach: (character: Character): void => {
                    character.attack_speed -= 50
                    character.cast_speed -= 50
                    character.armour_rate += 10
                    character.pierce += 10
                },
                cost: 2,
                ascend: 18,
                desc: 'Increases attack speed, cast speed, armour, and pierce',
            },
            {
                name: 'ingenuity',
                canUse: (character: Character) => {
                    return character.power >= 25
                },
                teach: (character: Character): void => {
                    character.avoid_damage_chance += 3
                    character.cooldown_redaction += 5
                    character.status_resistance += 5
                },
                cost: 2,
                ascend: 18,
                desc: 'Increases chance to avoid damage, status resistance, and cooldown reduction',
            },
            {
                name: 'regeneration',
                type: 'mastery',
                canUse: (character: Character) => {
                    return character.life_gained >= 60
                },
                teach: (character: Character): void => {
                    character.chance_to_regen_additional_life += 5
                },
                cost: 1,
                ascend: 22,
                desc: 'Increases chance to regenerate additional life when you gain life',
            },
            {
                name: 'tormented',
                type: 'mastery',
                canUse: (character: Character) => {
                    return character.hits >= 20
                },
                teach: (character: Character): void => {
                    character.avoid_damage_chance += 2
                },
                cost: 1,
                ascend: 18,
                desc: 'Increases chance to avoid damage',
            },
            {
                name: 'second skin',
                type: 'mastery',
                canUse: (character: Character) => {
                    return character.hits >= 150
                },
                teach: (character: Character): void => {
                    character.max_life += 1
                },
                cost: 6,
                ascend: 40,
                desc: 'Increases maximum life',
            },
            {
                name: 'matter distortion',
                type: 'mastery',
                canUse: (character: Character) => {
                    return character.triggers_count >= 200 && !character.triggers_on_trigger.some(elem => elem instanceof MatterDistortionTrigger)
                },
                teach: (character: Character): void => {
                    character.triggers_on_trigger.push(new MatterDistortionTrigger())
                },
                cost: 1,
                ascend: 18,
                desc: 'When one of your triggers activates, matter around you distorts, applying various effects to you or nearby enemies',
            },
            {
                name: 'forbidden power',
                type: 'mastery',
                canUse: (character: Character) => {
                    return (character.ascend_level - character.last_ascent_mastery_getting) >= 10
                },
                teach: (character: Character): void => {
                    character.last_ascent_mastery_getting += 10
                    character.masteries.push(Builder.createRandomMastery())
                },
                cost: 1,
                ascend: 0,
                desc: 'Gives a random empowerment that can be attached to any of your skills',
            },
            {
                name: 'taste of blood',
                type: 'mastery',
                canUse: (character: Character) => {
                    return character.kills >= 350
                },
                teach: (character: Character): void => {
                    character.vampiric_rate += 3
                },
                cost: 2,
                ascend: 18,
                desc: 'Increases vampiric rate',
            },
            {
                name: 'ascended',
                canUse: (character: Character) => {
                    return character.grace >= 10 && !character.pierce_rating_mutators.some(elem => elem instanceof AscendedPierceMutator)
                },
                teach: (character: Character): void => {
                    character.pierce_rating_mutators.push(new AscendedPierceMutator())
                    character.armour_mutators.push(new AscendedArmourMutator())
                },
                cost: 1,
                ascend: 27,
                desc: 'Your pierce and armour ratings are increased by your Grace',
            },
            {
                name: 'equipped',
                canUse: (character: Character) => {
                    return character.item.length >=6
                },
                teach: (character: Character): void => {
                    character.pierce += 7
                    character.armour_rate += 7
                },
                cost: 2,
                ascend: 22,
                desc: 'If you have more than 5 items, gain +7 armour and +7 pierce rating',
            },
            {
                name: 'senselessness',
                canUse: (character: Character) => {
                    return !character.avaid_damage_mutator.some(elem => elem instanceof CourageAvoidDamage)
                },
                teach: (character: Character): void => {
                    character.avaid_damage_mutator.push(new CourageAvoidDamage())
                },
                cost: 3,
                ascend: 27,
                desc: 'Increases chance to avoid damage equlals hald of your courage, if you are couraged, bonus is doubled',
            },
            {
                name: 'regenerating blocks',
                type: 'mastery',
                canUse: (character: Character) => {
                    return character.blocks >= 30 && character.life_gained >= 50 && !character.triggers_on_block.some(elem => elem instanceof RegeneratingBlocks)
                },
                teach: (character: Character): void => {
                    character.triggers_on_block.push(new RegeneratingBlocks())
                },
                cost: 2,
                ascend: 22,
                desc: 'When you block, you have a chance to gain life',
            },
            {
                name: 'as a wall',
                type: 'mastery',
                canUse: (character: Character) => {
                    return character.blocks >= 50
                },
                teach: (character: Character): void => {
                    character.block_for_energy += 3
                },
                cost: 2,
                ascend: 22,
                desc: 'Your block chance is increased by your energy',
            },
            {
                name: 'last chance',
                canUse: (character: Character) => {
                    return !character.triggers_on_near_dead.some(elem => elem instanceof LastChance)
                },
                teach: (character: Character): void => {
                    character.triggers_on_near_dead.push(new LastChance())
                },
                cost: 2,
                ascend: 20,
                desc: 'When you reach one life you get courage equals count of nearby enemies',
            },
            {
                name: 'in the heat of battle',
                canUse: (character: Character) => {
                    return character.refresh_courage_chance <= 30
                },
                teach: (character: Character): void => {
                    character.refresh_courage_chance += 5
                },
                cost: 1,
                ascend: 14,
                desc: 'When you courage expires, there is a chance to reshresh duration instead',
            },
            {
                name: 'durability',
                canUse: (character: Character) => {
                    return !(character instanceof Cultist)
                },
                teach: (character: Character): void => {
                    character.not_to_lose_courage_when_damage_chance += 10
                },
                cost: 1,
                ascend: 20,
                desc: 'Gives a chance not to lose courage when get damage',
            },
            {
                name: 'unbroken veins',
                canUse: (character: Character) => {
                    return true
                },
                teach: (character: Character): void => {
                    character.not_to_lose_regen_when_damage_chance += 10
                },
                cost: 1,
                ascend: 12,
                desc: 'Gives a chance not to lose regenaration timer when get damage',
            }, 
            {
                name: 'good moment',
                canUse: (character: Character) => {
                    return !character.triggers_on_parry.some(elem => elem instanceof GoodMoment)
                },
                teach: (character: Character): void => {
                    character.triggers_on_parry.push(new GoodMoment())
                },
                cost: 2,
                ascend: 20,
                desc: 'When you parry there is a chance to get courage',
            }, 
            {
                name: 'coordination',
                canUse: (character: Character) => {
                    return !character.reduces_move_speed_mutators.some(elem => elem instanceof CoordinationMutator)
                },
                teach: (character: Character): void => {
                    character.reduces_move_speed_mutators.push(new CoordinationMutator())
                },
                cost: 2,
                ascend: 18,
                desc: 'Reduces movement speed penalty when you attack or cast spells',
            },        
            {
                name: 'lethal strikes',
                canUse: (character: Character) => {
                    return character.critical >= 20 && !character.triggers_on_critical.some(elem => elem instanceof LethalStrikesOnCritical)
                },
                teach: (character: Character): void => {
                    character.triggers_on_critical.push(new LethalStrikesOnCritical())
                },
                cost: 2,
                ascend: 18,
                desc: 'When you deal a critical strike, there is a chance to gain the Lethal Strikes buff',
            },
            {
                name: 'through and through',
                canUse: (character: Character) => {
                    return character.critical >= 25 && !character.triggers_on_critical.some(elem => elem instanceof ThroughAndThrough)
                },
                teach: (character: Character): void => {
                    character.triggers_on_critical.push(new ThroughAndThrough())
                },
                cost: 2,
                ascend: 15,
                desc: 'Your critical hits have a chance to damage a target behind your primary target',
            },           
            {
                name: 'immaterial',
                canUse: (character: Character) => {
                    return character.avoid_damage_chance < 20
                },
                teach: (character: Character): void => {
                    character.avoid_damage_chance += 1
                },
                cost: 1,
                ascend: 22,
                desc: 'Increases chance to avoid damage',
            },
            {
                name: 'golden chainmail',
                type: 'mastery',
                canUse: (character: Character) => {
                    return character.gold_earned >= 500 && !character.armour_mutators.some(elem => elem instanceof GoldenChainmailMutator)
                },
                teach: (character: Character) => {
                    character.armour_mutators.push(new GoldenChainmailMutator())
                },
                cost: 3,
                ascend: 18,
                desc: 'Your gold increases your armour rating',
            },
            {
                name: 'cast speed',
                canUse: (character: Character) => {
                    return character.cast_speed > 600
                },
                teach: (character: Character) => {
                    character.cast_speed -= 60
                },
                cost: 2,
                ascend: 10,
                desc: 'Increases cast speed',
            },
            {
                name: 'breaking armor',
                canUse: (character: Character) => {
                    return character.crushing_rating >= 30 && !character.triggers_on_crushing.some(elem => elem instanceof BreakingArmorTrigger)
                },
                teach: (character: Character): void => {
                    character.triggers_on_crushing.push(new BreakingArmorTrigger())
                },
                cost: 2,
                ascend: 18,
                desc: 'When you crush an enemy, there is a chance to reduce their armour',
            },
            {
                name: 'breaking bones',
                canUse: (character: Character) => {
                    return character.crushing_rating >= 15 && !character.triggers_on_crushing.some(elem => elem instanceof BreakingBonesTrigger)
                },
                teach: (character: Character): void => {
                    character.triggers_on_crushing.push(new BreakingBonesTrigger())
                },
                cost: 1,
                ascend: 10,
                desc: 'When you crush an enemy, there is a chance to reduce their movement speed',
            },
            {
                name: 'fortune-teller',
                canUse: (character: Character) => {
                    return character.chance_to_create_grace < 15
                },
                teach: (character: Character): void => {
                    character.chance_to_create_grace += 1
                    character.chance_to_additional_carved_spark += 5
                },
                cost: 1,
                ascend: 20,
                desc: 'Increases chance to gain grace when an enemy dies and to get a carved spark',
            },
            {
                name: 'agility',
                canUse: (character: Character) => {
                    return character.base_move_speed_penalty_when_action >= 30
                },
                teach: (character: Character): void => {
                    character.base_move_speed_penalty_when_action -= 5
                    character.critical += 1
                },
                cost: 2,
                ascend: 15,
                desc: 'Reduces movement speed penalty when using abilities and increases critical chance',
            },
            {
                name: 'wave of enlightenment',
                canUse: (character: Character) => {
                    return !character.triggers_on_enlight.some(
                        elem => elem instanceof DamageInRadiusWhenEnlightnent
                    )
                },
                teach: (character: Character): void => {
                    character.triggers_on_enlight.push(new DamageInRadiusWhenEnlightnent())
                },
                cost: 2,
                ascend: 12,
                desc: 'When you gain enlightenment, you deal damage in a large radius',
            },
            {
                name: 'way of enlightenment',
                canUse: (character: Character) => {
                    return character.enlightenment_threshold >= 6
                },
                teach: (character: Character): void => {
                    character.enlightenment_threshold --
                },
                cost: 5,
                ascend: 25,
                desc: 'Reduces the amount of courage required to achieve enlightenment',
            },
            {
                name: 'creator',
                canUse: (character: Character) => {
                    return !character.level.status_pull.find(
                        elem => elem.unit === character && elem instanceof Creator
                    )
                },
                teach: (character: Character): void => {
                    character.level.setStatus(character, new Creator(character.level.time))
                },
                cost: 3,
                ascend: 24,
                desc: 'Gives a chance to create a sphere around you every 5 seconds',
            },
            {
                name: 'metabolism',
                canUse: (character: Character) => {
                    return character.base_regeneration_time > 5000
                },
                teach: (character: Character): void => {
                    character.base_regeneration_time -= 200
                },
                cost: 1,
                desc: 'Increases life regeneration rate',
            },
            {
                name: 'masterliness',
                canUse: (character: Character) => {
                    return Func.chance(30) && character.third_ability.mastery_chance <= 100
                },
                teach: (character: Character): void => {
                    character.first_ability.mastery_chance += 1
                    character.second_ability.mastery_chance += 5
                    character.third_ability.mastery_chance += 10
                    character.utility.mastery_chance += 5
                },
                cost: 2,
                ascend: 18,
                desc: 'Increases the chance that empowerments will trigger on your skills',
            },
            {
                name: 'pressing steps',
                canUse: (character: Character) => {
                    return character.power >= 20 && !character.level.status_pull.find(elem => elem.unit === character && elem instanceof PressingSteps)  
                },
                teach: (character: Character): void => {
                    character.level.setStatus(character, new PressingSteps(character.level.time))
                },
                cost: 3,
                ascend: 60,
                desc: 'If you move for 3 seconds, you begin to deal damage to nearby enemies',
            },
            {
                name: 'from defense to attack',
                canUse: (character: Character) => {
                    return !character.triggers_on_parry.some(
                        elem => elem instanceof FromDefendToAttackTrigger
                    )
                },
                teach: (character: Character): void => {
                    character.triggers_on_parry.push(new FromDefendToAttackTrigger())
                },
                cost: 2,
                ascend: 10,
                desc: 'When you parry, you have a chance to increase your power and critical chance',
            },
            {
                name: 'wall of will',
                canUse: (character: Character) => {
                    return !character.triggers_on_block.some(elem => elem instanceof WallOfWillTrigger) && !(character instanceof Flyer)

                },
                teach: (character: Character): void => {
                    character.triggers_on_block.push(new WallOfWillTrigger())
                },
                cost: 2,
                ascend: 18,
                desc: 'When you block, you have a chance to increase your block chance',
            },
            {
                name: 'cutting',
                canUse: (character: Character) => {
                    return !character.pierce_rating_mutators.some(elem => elem instanceof CuttingMutator)
                },
                teach: (character: Character): void => {
                    character.pierce_rating_mutators.push(new CuttingMutator())
                },
                cost: 2,
                ascend: 18,
                desc: 'Pierce rating increases with courage, if you are couraged bonus is doubled',
            },
            {
                name: 'annihilation',
                canUse: (character: Character) => {
                    return !character.critical_rating_mutators.some(elem => elem instanceof AnnihilationMutator)                  
                },
                teach: (character: Character): void => {
                    character.critical_rating_mutators.push(new AnnihilationMutator())
                },
                cost: 2,
                ascend: 18,
                desc: 'Critical rating increases with energy',
            },
            {
                name: 'power',
                canUse: (character: Character) => {
                    return character.power < 100
                },
                teach: (character: Character): void => {
                    character.power += 2
                },
                cost: 1,
                ascend: 10,
                desc: 'Increases power',
            },
            {
                name: 'overpower',
                canUse: (character: Character) => {
                    return character.power > 20
                },
                teach: (character: Character): void => {
                    character.critical += 3
                    character.impact += 3
                    character.crushing += 3
                    character.power += 1
                },
                cost: 2,
                ascend: 18,
                desc: 'Increases critical, impact, and crushing ratings, and power',
            },
            {
                name: 'will to survive',
                canUse: (character: Character) => {
                    return !(character instanceof Flyer) && !character.triggers_on_parry.some(elem => elem instanceof WillToSurviveTrigger)
                },
                teach: (character: Character): void => {
                    character.triggers_on_parry.push(new WillToSurviveTrigger())
                },
                cost: 2,
                ascend: 18,
                desc: 'When you parry, there is a chance to get courage',
            },
            {
                name: 'first to strike',
                canUse: (character: Character) => {
                    return !character.triggers_on_parry.some(elem => elem instanceof FirstToStrikeTrigger)
                },
                teach: (character: Character): void => {
                    character.triggers_on_parry.push(new FirstToStrikeTrigger())
                },
                cost: 2,
                ascend: 8,
                desc: 'When you parry, you have a chance to increase attack and cast speed',
            },
            {
                name: 'divine forging',
                canUse: (character: Character) => {
                    return character.item.length > 0
                },
                teach: (character: Character): void => {
                    let item = Func.getRandomFromArray(character.item)

                    if (item) {
                        item.max_forgings++

                        let forging: Forging = Func.getRandomFromArray(
                            item.forge.filter(elem => elem.canBeForged())
                        )

                        if (forging) {
                            character.gold += forging.gold_cost
                            forging.forge(character)
                        }

                        let new_forge = item.getRandomForging()

                        while (
                            item.suggested_forgings.some(
                                elem => elem instanceof new_forge.constructor
                            )
                        ) {
                            new_forge = item.getRandomForging()
                        }

                        character.gold += new_forge.gold_cost

                        new_forge.forge(character)

                        item.forge.push(new_forge)
                    }
                },
                cost: 3,
                ascend: 27,
                desc: 'A random item gains a new forging, upgrades a random forging, and increases its maximum number of forgings',
            },
            {
                name: 'best day',
                canUse: (character: Character) => {
                    return !character.after_grace_statuses.some(elem => elem instanceof Luck)
                },
                teach: (character: Character): void => {
                    let status = new Luck(character.level.time)
                    status.setDuration(30000)
                    character.after_grace_statuses.push(status)
                },
                cost: 2,
                ascend: 10,
                desc: 'You become lucky for 30 seconds',
            },
            {
                name: 'crushing wave',
                canUse: (character: Character) => {
                    return character.crushing_rating >= 30 && !character.level.status_pull.find(elem => elem.unit === character && elem instanceof CrushingWave)
                    
                },
                teach: (character: Character): void => {
                    let s = new CrushingWave(character.level.time)

                    character.level.setStatus(character, s, true)
                },
                cost: 3,
                ascend: 24,
                desc: 'Every 2 seconds, nearby crushed enemies take damage',
            },
             {
                name: 'defender',
                canUse: (character: Character) => {
                    return character.chance_to_block < 100
                },
                teach: (character: Character): void => {
                    character.chance_to_block += 1
                    character.armour_rate += 2
                },
                cost: 1,
                desc: 'Increases armour and chance to block',
            },
            {
                name: 'mystic way',
                type: 'mastery',
                canUse: (character: Character) => {
                    return character.additional_energy_chance < 100 && character.ability_use >= 200
                },
                teach: (character: Character): void => {
                    character.additional_energy_chance += 2
                    character.not_to_pay_finisher_chance += 5
                },
                cost: 2,
                ascend: 18,
                desc: 'Gives a chance not to lose energy when using finishers and to gain additional energy when you gain energy',
            },    
            {
                name: 'excitement',
                canUse: (character: Character) => {
                    return character.additional_courage_chance < 100
                },
                teach: (character: Character): void => {
                    character.additional_courage_chance += 5
                    character.enlight_timer -= 2000
                },
                cost: 2,
                ascend: 8,
                desc: 'Gives a chance to gain additional courage and reduces cooldown between enlightenment gains',
            },
            {
                name: 'bravery',
                canUse: (character: Character) => {
                    return character.courage_expire_timer <= 6000
                },
                teach: (character: Character): void => {
                    character.courage_expire_timer += 250
                },
                cost: 1,
                ascend: 10,
                desc: 'Your courage expires more slowly',
            },
            {
                name: 'forger',
                canUse: (character: Character) => {
                    return character.chance_to_additional_carved_spark <= 50
                },
                teach: (character: Character): void => {
                    character.chance_to_additional_carved_spark += 25
                },
                cost: 2,
                ascend: 12,
                desc: 'Gives a chance to gain an additional carved spark',
            },
            {
                name: 'blessed fighter',
                canUse: (character: Character) => {
                    return character.life_status > character.max_life && !character.armour_mutators.some(elem => elem instanceof BlessedWarrioraArmourMutator)
                },
                teach: (character: Character): void => {
                    character.armour_mutators.push( new BlessedWarrioraArmourMutator())
                    character.pierce_rating_mutators.push( new BlessedWarriorPierceMutator())
                },
                cost: 3,
                ascend: 22,
                desc: 'If you are blessed (life above maximum), you gain additional armour and pierce rating',
            },
            {
                name: 'divine pack',
                canUse: (character: Character) => {
                    return character.max_items < 8
                },
                teach: (character: Character): void => {
                    character.max_items ++
                    character.purchased_items --
                },
                cost: 2,
                ascend: 27,
                desc: 'Grants an additional item slot',
            },
            {
                name: 'inspiration',
                canUse: (character: Character) => {
                    return character.power >= 10 && !character.triggers_on_get_energy.some(elem => elem instanceof InspirationTrigger) 
                },
                teach: (character: Character): void => {
                    character.triggers_on_get_energy.push(new InspirationTrigger())
                },
                cost: 3,
                ascend: 18,
                desc: 'Gives a chance, based on your courage, to gain maximum energy when you gain energy and drop finisher cd',
            },
            {
                name: 'massive impact',
                canUse: (character: Character) => {
                    return character.impact >= 20 && !character.triggers_on_impact.some(elem => elem instanceof MassiveImpactTrigger)                 
                },
                teach: (character: Character): void => {
                    character.triggers_on_impact.push(new MassiveImpactTrigger())
                },
                cost: 3,
                ascend: 12,
                desc: 'Gives a chance, based on your power, to create additional impacts',
            },
            {
                name: 'focusing',
                canUse: (character: Character) => {
                    return (
                        !character.armour_mutators.some(
                            elem => elem instanceof FocusingMutator
                        )
                    )
                },
                teach: (character: Character): void => {
                    character.armour_mutators.push(new FocusingMutator())
                },
                cost: 3,
                ascend: 12,
                desc: 'Courage also increases your armour, if you are couraged bonus is doubled',
            },         
            {
                name: 'impactor',
                canUse: (character: Character) => {
                    return (
                        character.impact >= 10 &&
                        character.impact_radius < 16
                    )
                },
                teach: (character: Character): void => {
                    character.impact_radius += 2
                    character.impact ++
                    let t = character.triggers_on_hit.find(elem => elem instanceof ImpactTrigger)
                    if(t){
                        t.cd -= 150
                    }
                },
                cost: 2,
                ascend: 10,
                desc: 'Increases impact rating and hit radius, and reduces cooldown between procs',
            },
            {
                name: 'divine weapon',
                canUse: (character: Character) => {
                    return  character.power >= 10 && !character.triggers_on_hit.some(elem => elem instanceof DivineWeaponTrigger)
                },
                teach: (character: Character): void => {
                    character.triggers_on_hit.push(new DivineWeaponTrigger())
                },
                cost: 3,
                ascend: 18,
                desc: 'Gives a chance, based on your power, to rain pillars of light on enemies when you hit',
            },
            {
                name: 'unhuman fortitude',
                canUse: (character: Character) => {
                    return (
                        character.power >= 25 &&
                        !character.triggers_on_get_hit.some(
                            elem => elem instanceof UnhumanFortitudeTrigger
                        )
                    )
                },
                teach: (character: Character): void => {
                    character.triggers_on_get_hit.push(new UnhumanFortitudeTrigger())
                },
                cost: 3,
                ascend: 18,
                desc: 'Grants a 30% chance to gain fortification equal to your power when taking damage',
            },
            {
                name: 'resurrection',
                canUse: (character: Character) => {
                    return !character.can_ressurect
                },
                teach: (character: Character): void => {
                    character.can_ressurect = true
                },
                cost: 7,
                ascend: 27,
                desc: 'Resurrects you after death',
            },
            {
                name: 'with storm',
                type: 'status',
                canUse: (character: Character) => {
                    return !character.level.status_pull.find(
                        elem => elem.unit === character && elem instanceof WithStormStatus
                    )
                },
                teach: (character: Character): void => {
                    let status = new WithStormStatus(character.level.time)
                    status.setPower(0)
                    character.level.setStatus(character, status, true)
                },
                cost: 2,
                ascend: 8,
                desc: 'Creates lightning periodically that shocks enemies',
            },
            {
                name: 'move speed',
                canUse: (character: Character) => {
                    return character.move_speed_penalty <= 100
                },
                teach: (character: Character): void => {
                    character.move_speed_penalty += 3
                },
                cost: 2,
                ascend: 18,
                desc: 'Increases movement speed',
            },
            {
                name: 'vampiric strikes',
                canUse: (character: Character) => {
                    return character.vampiric_rate <= 75
                },
                teach: (character: Character): void => {
                    character.vampiric_rate += 2
                },
                cost: 2,
                ascend: 8,
                desc: 'Increases vampiric rate',
            },
            {
                name: 'lightning reflexes',
                canUse: (character: Character) => {
                    return Func.chance(30)
                },
                teach: (character: Character): void => {
                    character.armour_rate += 10
                },
                cost: 2,
                ascend: 27,
                desc: 'Increases armour by 10',
            },
            {
                name: 'moment replication',
                canUse: (character: Character) => {
                    return character.chance_to_trigger_additional_time <= 30
                },
                teach: (character: Character) => {
                    character.chance_to_trigger_additional_time += 5
                },
                cost: 2,
                ascend: 15,
                desc: 'Gives a chance for a trigger to activate twice',
            },
            {
                name: 'titanic strikes',
                canUse: (character: Character) => {
                    return character.power >= 12
                },
                teach: (character: Character): void => {
                    character.impact += 6
                },
                cost: 2,
                ascend: 22,
                desc: 'Increases impact rating by 6',
            },
            {
                name: 'clear mind',
                canUse: (character: Character) => {
                    return character.knowledge >= 10 && character.cooldown_redaction < 100
                },
                teach: (character: Character): void => {
                    character.cooldown_redaction += 10
                },
                cost: 3,
                ascend: 18,
                desc: 'Increases cooldown reduction by 10%',
            },
            {
                name: 'afterlight',
                canUse: (character: Character) => {
                    return !character.triggers_on_enlight.some(
                        elem => elem instanceof WardAfterEnlightTrigger
                    )
                },
                teach: (character: Character): void => {
                    character.triggers_on_enlight.push(new WardAfterEnlightTrigger())
                },
                cost: 3,
                ascend: 22,
                desc: 'You gain 3 ward when you become enlightened',
            },
            {
                name: 'spirit strikes',
                canUse: (character: Character) => {
                    return !character.triggers_on_impact.some(elem => elem instanceof SpiritStrikes) && character.ward >= 6
                },
                teach: (character: Character): void => {
                    character.triggers_on_impact.push(new SpiritStrikes())
                    character.impact_mutators.push(new SpiritStrikesMutator())
                },
                cost: 2,
                ascend: 14,
                desc: 'Impact rating increases with your amount of ward; when you impact, there is a chance to gain ward',
            },
            {
                name: 'immune to freeze',
                canUse: (character: Character) => {
                    return !character.immune_to_freeze
                },
                teach: (character: Character): void => {
                    character.immune_to_freeze = true
                },
                cost: 8,
                ascend: 50,
                desc: 'Immune to freezing',
            },
            {
                name: 'ascending',
                canUse: (character: Character) => {
                    return character.ascend_level <= 25
                },
                teach: (character: Character): void => {
                    character.addAscent(4)
                },
                cost: 2,
                ascend: 5,
                desc: 'Increases ascension by 5',
            },
            {
                name: 'with fire',
                type: 'status',
                canUse: (character: Character) => {
                    return !character.level.status_pull.find(
                        elem => elem.unit === character && elem instanceof WithFireStatus
                    )
                },
                teach: (character: Character) => {
                    let status = new WithFireStatus(character.level.time)
                    status.setPower(0)
                    character.level.setStatus(character, status, true)
                },
                cost: 2,
                ascend: 10,
                desc: 'Periodically ignites nearby enemies',
            },
            {
                name: 'with cold',
                type: 'status',
                canUse: (character: Character) => {
                    return !character.level.status_pull.find(
                        elem => elem.unit === character && elem instanceof WithColdStatus
                    )
                },
                teach: (character: Character) => {
                    let status = new WithColdStatus(character.level.time)
                    status.setPower(0)
                    character.level.setStatus(character, status, true)
                },
                cost: 2,
                ascend: 16,
                desc: 'Periodically creates a cold blast that freezes enemies and players',
            },
            {
                name: 'heal',
                canUse: (character: Character) => {
                    return character.life_status < 4
                },
                teach: (character: Character) => {
                    character.addLife(3, true, true)
                },
                cost: 1,
                desc: 'Restores life',
            },
            {
                name: 'gold finder',
                canUse: (character: Character) => {
                    return character.chance_to_get_additional_gold < 100
                },
                teach: (character: Character) => {
                    character.chance_to_get_additional_gold += 3
                },
                cost: 1,
                desc: `Increases chance to get additional gold`,
            },
            {
                name: 'chosen one',
                canUse: (character: Character) => {
                    return character.chance_to_create_grace < 15
                },
                teach: (character: Character) => {
                    character.chance_to_create_grace += 2
                },
                cost: 2,
                ascend: 22,
                desc: `Increases your chance to gain grace after an enemy's death`,
            },
            {
                name: 'blessed',
                canUse: (character: Character) => {
                    return !character.blessed
                },
                teach: (character: Character) => {
                    character.blessed = true
                },
                cost: 4,
                ascend: 14,
                desc: 'Undead creatures you kill have a reduced chance to resurrect',
            },
            {
                name: 'pierce',
                canUse: (character: Character) => {
                    return true
                },
                teach: (character: Character) => {
                    character.pierce += 3
                },
                cost: 1,
                desc: 'Increases pierce rating',
            },
            {
                name: 'critical hit',
                canUse: (character: Character) => {
                    return character.critical < 100
                },
                teach: (character: Character) => {
                    character.critical += 3
                },
                cost: 1,
                desc: 'Increases chance to deal double damage',
            },
            {
                name: 'armour',
                canUse: (character: Character) => {
                    return true
                },
                teach: (character: Character) => {
                    character.armour_rate += 4
                },
                cost: 1,
                desc: 'Increases armour',
            },
            {
                name: 'gamble',
                canUse: (character: Character) => {
                    return character.grace >= 1 && Func.chance(20)
                },
                teach: (character: Character) => {
                    if (Func.chance(50, character.is_lucky)) {
                        character.grace *= 2
                    } else {
                        character.grace = Math.floor(character.grace / 2)
                    }
                },
                cost: 0,
                desc: 'Lose or win',
            },
            {
                name: 'resist',
                canUse: (character: Character) => {
                    return character.status_resistance < 80
                },
                teach: (character: Character) => {
                    character.status_resistance += 2
                },
                cost: 1,
                desc: 'Increases resistance',
            },
            {
                name: 'lust for life',
                canUse: (character: Character) => {
                    return !character.regen_over_max_mutators.some(elem => elem instanceof LustForLife)
                },
                teach: (character: Character) => {
                    character.regen_over_max_mutators.push(new LustForLife())
                },
                cost: 3,
                ascend: 18,
                desc: 'Gives a chance, based on your courage, to restore life above the maximum',
            },
            {
                name: 'vision',
                canUse: (character: Character) => {
                    return character.light_r < 20
                },
                teach: (character: Character) => {
                    character.light_r += 1
                },
                cost: 1,
                desc: 'Increases light radius',
            },
            {
                name: 'touch',
                type: 'buff',
                canUse: (character: Character) => {
                    return character.after_grace_statuses.filter(elem => elem.name === 'touch').length === 0
                },
                teach: (character: Character) => {
                    let status = new Touch(character.level.time)
                    status.setDuration(40000)
                    character.after_grace_statuses.push(status)
                },
                cost: 1,
                ascend: 18,
                desc: 'Grants a buff upon exiting a portal that increases all stats by 10',
            },
            {
                name: 'blessed armour',
                type: 'buff',
                canUse: (character: Character) => {
                    return (
                        character.after_grace_statuses.filter(
                            elem => elem.name === 'blessed armour'
                        ).length === 0
                    )
                },
                teach: (character: Character) => {
                    let status = new BlessedArmour(character.level.time)
                    status.setDuration(40000)
                    character.after_grace_statuses.push(status)
                },
                cost: 1,
                ascend: 8,
                desc: 'Grants a buff upon exiting a portal that gives armour to you and nearby allies',
            },
            {
                name: 'scream',
                canUse: (character: Character) => {
                    return (
                        character.chance_to_say_phrase >= 2 &&
                        !character.triggers_on_say.some(elem => elem instanceof ScreamTrigger)
                    )
                },
                teach: (character: Character) => {
                    character.triggers_on_say.push(new ScreamTrigger())
                },
                cost: 2,
                ascend: 18,
                desc: 'Nearby enemies take damage when you speak',
            },
            {
                name: 'talkativeness',
                canUse: (character: Character) => {
                    return character.chance_to_say_phrase < 8 && Func.chance(50)
                },
                teach: (character: Character) => {
                    character.chance_to_say_phrase ++
                },
                cost: 1,
                ascend: 10,
                desc: 'Increases chance to say a phrase',
            },
            {
                name: 'inner guidance',
                canUse: (character: Character) => {
                    return character.cooldown_redaction < 95
                },
                teach: (character: Character) => {
                    character.cooldown_redaction += 5
                },
                cost: 2,
                ascend: 18,
                desc: 'Reduces cooldowns',
            },
            {
                name: 'swiftness',
                canUse: (character: Character) => {
                    return true
                },
                teach: (character: Character) => {
                    character.attack_speed -= 30
                    character.cast_speed -= 30
                    character.move_speed_penalty += 3
                },
                cost: 2,
                ascend: 14,
                desc: 'Increases attack, cast, and movement speed',
            },
            {
                name: 'small ward',
                canUse: (character: Character) => {
                    return character.ward === 0
                },
                teach: (character: Character) => {
                    character.addWard(3)
                },
                cost: 1,
                ascend: 6,
                desc: 'Grants 3 ward',
            },
            {
                name: 'strong ward',
                canUse: (character: Character) => {
                    return character.ward <= 5
                },
                teach: (character: Character) => {
                    character.addWard(10)
                },
                cost: 4,
                ascend: 22,
                desc: 'Grants 10 ward',
            },
            {
                name: 'redemption',
                canUse: (character: Character) => {
                    return !character.level.status_pull.find(
                        elem => elem.unit === character && elem instanceof Redemption
                    )
                },
                teach: (character: Character) => {
                    let s = new Redemption(character.level.time)

                    character.level.setStatus(character, s)
                },
                cost: 6,
                ascend: 40,
                desc: 'Consumes a corpse to create a sphere',
            },
            {
                name: 'flesh harvest',
                canUse: (character: Character) => {
                    return !character.level.status_pull.find(
                        elem => elem.unit === character && elem instanceof FleshHarvest
                    )
                },
                teach: (character: Character) => {
                    let s = new FleshHarvest(character.level.time)

                    character.level.setStatus(character, s)
                },
                cost: 6,
                ascend: 35,
                desc: 'Consumes a corpse to heal you',
            },
            {
                name: 'discipline',
                canUse: (character: Character) => {
                    return character.maximum_resources < 12
                },
                teach: (character: Character) => {
                    if (character instanceof Character) {
                        character.maximum_resources++
                    }
                },
                cost: 3,
                ascend: 16,
                desc: 'Increases maximum energy',
            },
            {
                name: 'impact',
                canUse: (character: Character) => {
                    return character.impact < 100
                },
                teach: (character: Character) => {
                    if (character instanceof Character) {
                        character.impact += 2
                    }
                },
                cost: 1,
                ascend: 6,
                desc: 'Increases impact rating',
            },
            {
                name: 'preparation',
                canUse: (character: Character) => {
                    return true
                },
                teach: (character: Character) => {
                    character.changeStats(1)
                },
                cost: 1,
                desc: 'Increases all main stats by 1',
            },
            {
                name: 'crushing',
                canUse: (character: Character) => {
                    return character.crushing_rating < 100
                },
                teach: (character: Character) => {
                    character.crushing_rating += 3
                },
                cost: 1,
                ascend: 8,
                desc: 'Increases crushing rating',
            },
            {
                name: 'raising morale',
                canUse: (character: Character) => {
                    return (
                        !character.triggers_on_say.some(
                            elem => elem instanceof RisingMoraleTrigger
                        ) && character.chance_to_say_phrase >= 2
                    )
                },
                teach: (character: Character) => {
                    character.triggers_on_say.push(new RisingMoraleTrigger())
                },
                cost: 2,
                ascend: 18,
                desc: 'When you speak, there is a chance to heal you and nearby allies',
            },
            {
                name: 'spirit',
                canUse: (character: Character) => {
                    return character.spirit < 90
                },
                teach: (character: Character) => {
                    character.spirit += 2
                },
                cost: 1,
                ascend: 8,
                desc: 'Increases spirit',
            },
            {
                name: 'shout',
                canUse: (character: Character) => {
                    return character.level.players.length > 1 && character.chance_to_say_phrase >= 2
                },
                teach: (character: Character) => {
                    character.voice_radius += 10
                },
                cost: 2,
                ascend: 6,
                desc: 'Increases phrase radius',
            },
        ]
    }
    static getCultistUpgrades() {
        return [
            {
                name: 'runic field',
                type: 'rune',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Rune &&
                        !character.first_ability.runefield
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof Rune) {
                        character.first_ability.runefield = true
                        character.first_ability.cost += 1
                    }
                },
                cost: 3,
                ascend: 15,
                desc: 'Now you create an additional rune for each energy, but it now costs 1 more and has 500ms cooldown for each rune created',
            },
            {
                name: 'attack speed',
                canUse: (character: Character) => {
                    return character.attack_speed > 600
                },
                teach: (character: Character) => {         
                    character.attack_speed -= 50
                },
                cost: 2,
                desc: 'Increases attack speed',
            },
            {
                name: 'explosive runes',
                type: 'rune',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Rune &&
                        !character.first_ability.explosive
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof Rune) {
                        character.first_ability.explosive = true
                    }
                },
                cost: 2,
                ascend: 8,
                desc: 'Increases radius of explosion',
            },
            {
                name: 'fast detonation',
                type: 'rune',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Rune &&
                        !character.first_ability.fast_detonation
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof Rune) {
                        character.first_ability.fast_detonation = true
                    }
                },
                cost: 3,
                ascend: 18,
                desc: 'Increases detonation rate',
            },
            {
                name: 'second detonation',
                type: 'rune',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Rune &&
                        !character.first_ability.second_detanation
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof Rune) {
                        character.first_ability.second_detanation = true
                        character.first_ability.cost++
                    }
                },
                cost: 2,
                ascend: 22,
                desc: 'Your runes have a chance to explode additional time but it now costs 1 more',
            },
            {
                name: 'soul shatter',
                type: 'new ability',
                canUse: (character: Character) => {
                    return !(character.first_ability instanceof SoulShatter)
                },
                teach: (character: Character) => {
                    if (character instanceof Cultist) {
                        character.first_ability = new SoulShatter(character)
                        character.updateClientSkill()
                    }
                },
                cost: 2,
                ascend: 8,
                desc: 'Deals damage to a single target, if it dies there is a chance that souls are created, the number of which depends on courage. Souls move slowly and damage enemies',
            },
            {
                name: 'mark of darkness',
                type: 'soul shatter',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof SoulShatter &&
                        !character.first_ability.mark
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability instanceof SoulShatter) {
                        character.first_ability.mark = true
                    }
                },
                cost: 2,
                ascend: 18,
                desc: 'Always creates souls',
            },
            {
                name: 'slamming',
                type: 'slam',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Slam && !character.first_ability.slaming
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof Slam) {
                        character.first_ability.slaming = true
                    }
                },
                cost: 1,
                ascend: 6,
                desc: 'Increases the radius',
            },
            {
                name: 'soul extraction',
                type: 'slam',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Slam &&
                        !character.first_ability.soul_extraction
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof Slam) {
                        character.first_ability.soul_extraction = true
                    }
                },
                cost: 2,
                ascend: 18,
                desc: 'Increases the chance to gain grace from killing enemies',
            },
            {
                name: 'deafening wave',
                type: 'shield bash',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof ShieldBash &&
                        !character.second_ability.deafening_wave &&
                        !character.second_ability.hate
                    )
                },
                teach: (character: Character) => {
                    if (
                        character.second_ability &&
                        character.second_ability instanceof ShieldBash
                    ) {
                        character.second_ability.deafening_wave = true
                    }
                },
                cost: 2,
                ascend: 8,
                desc: 'Increases duration and radius of stunning',
            },
            {
                name: 'gore aegis',
                type: 'shield bash',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof ShieldBash &&
                        !character.second_ability.gore_aegis
                    )
                },
                teach: (character: Character) => {
                    if (
                        character.second_ability &&
                        character.second_ability instanceof ShieldBash
                    ) {
                        character.second_ability.gore_aegis = true
                    }
                },
                cost: 2,
                ascend: 14,
                desc: 'When you kill an enemy with a shield bash, you gain Gore Aegis buff',
            },
            {
                name: 'hate',
                type: 'shield bash',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof ShieldBash &&
                        !character.second_ability.deafening_wave &&
                        !character.second_ability.hate
                    )
                },
                teach: (character: Character) => {
                    if (
                        character.second_ability &&
                        character.second_ability instanceof ShieldBash
                    ) {
                        character.second_ability.hate = true
                    }
                },
                cost: 2,
                ascend: 10,
                desc: 'Shield bash no longer stuns, but instead has a chance to shatter the enemy',
            },
            // {
            //     name: 'coordination',
            //     type: 'shield bash',
            //     canUse: (character: Character) => {
            //         return (
            //             character.second_ability instanceof ShieldBash &&
            //             !character.second_ability.coordination
            //         )
            //     },
            //     teach: (character: Character) => {
            //         if (
            //             character.second_ability &&
            //             character.second_ability instanceof ShieldBash
            //         ) {
            //             character.second_ability.coordination = true
            //         }
            //     },
            //     cost: 2,
            //     ascend: 18,
            //     desc: 'Gives a 50% chance to reduce cooldown by 50%',
            // },
            {
                name: 'increase grim pile effect',
                type: 'grim pile',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof GrimPile &&
                        !character.second_ability.increased_effect
                    )
                },
                teach: (character: Character) => {
                    if (character.second_ability && character.second_ability instanceof GrimPile) {
                        character.second_ability.increased_effect = true
                    }
                },
                cost: 1,
                desc: 'Increases armour and move speed that it gives',
            },
            {
                name: 'grim pile of will',
                type: 'grim pile',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof GrimPile &&
                        !character.second_ability.resistance
                    )
                },
                teach: (character: Character) => {
                    if (character.second_ability && character.second_ability instanceof GrimPile) {
                        character.second_ability.resistance = true
                    }
                },
                cost: 1,
                ascend: 16,
                desc: 'Now also increase resist',
            },
            {
                name: 'reign of pain',
                type: 'unleashing pain',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof UnleashPain &&
                        !character.third_ability.reign_of_pain
                    )
                },
                teach: (character: Character) => {
                    if (character.third_ability && character.third_ability instanceof UnleashPain) {
                        character.third_ability.reign_of_pain = true
                    }
                },
                cost: 2,
                ascend: 22,
                desc: 'Increases enemy search radius and the number of warriors based on courage',
            },
            {
                name: 'spreading',
                type: 'self flagellation',
                canUse: (character: Character) => {
                    return (
                        character.utility instanceof SelfFlagellation &&
                        !character.utility.spreading
                    )
                },
                teach: (character: Character) => {
                    if (character.utility && character.utility instanceof SelfFlagellation) {
                        character.utility.spreading = true
                    }
                },
                cost: 2,
                ascend: 10,
                desc: 'Deals damage in small radius to enemies',
            },
            {
                name: 'restless warriors',
                type: 'unleashing pain',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof UnleashPain &&
                        !character.third_ability.restless_warriors
                    )
                },
                teach: (character: Character) => {
                    if (character.third_ability && character.third_ability instanceof UnleashPain) {
                        character.third_ability.restless_warriors = true
                    }
                },
                cost: 2,
                ascend: 18,
                desc: 'Your ghost warriors make 2 hits',
            },
            {
                name: 'ring of pain',
                type: 'pile of thorns',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof PileOfThornCast &&
                        !character.third_ability.ring_of_pain
                    )
                },
                teach: (character: Character) => {
                    if (
                        character.third_ability &&
                        character.third_ability instanceof PileOfThornCast
                    ) {
                        character.third_ability.ring_of_pain = true
                    }
                },
                cost: 2,
                ascend: 14,
                desc: 'Increases radius and frequency',
            },
            {
                name: 'collection of bones',
                type: 'pile of thorns',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof PileOfThornCast &&
                        !character.third_ability.collection_of_bones
                    )
                },
                teach: (character: Character) => {
                    if (
                        character.third_ability &&
                        character.third_ability instanceof PileOfThornCast
                    ) {
                        character.third_ability.collection_of_bones = true
                    }
                },
                cost: 1,
                ascend: 14,
                desc: 'Upon expiration, releases bones for each enemy killed',
            },
            {
                name: 'pack of the dead',
                type: 'self flagellation',
                canUse: (character: Character) => {
                    return character.utility instanceof SelfFlagellation && !character.utility.pack
                },
                teach: (character: Character) => {
                    if (character.utility && character.utility instanceof SelfFlagellation) {
                        character.utility.pack = true
                    }
                },
                cost: 1,
                ascend: 14,
                desc: 'You cannot die by using',
            },
            {
                name: 'lesson of pain',
                type: 'self flagellation',
                canUse: (character: Character) => {
                    return (
                        character.utility instanceof SelfFlagellation && !character.utility.lesson
                    )
                },
                teach: (character: Character) => {
                    if (character.utility && character.utility instanceof SelfFlagellation) {
                        character.utility.lesson = true
                    }
                },
                cost: 1,
                ascend: 10,
                desc: 'Increases move speed for short period after use',
            },
            {
                name: 'led by ghosts',
                type: 'ghost form',
                canUse: (character: Character) => {
                    return character.utility instanceof GhostForm && !character.utility.lead
                },
                teach: (character: Character) => {
                    if (character.utility && character.utility instanceof GhostForm) {
                        character.utility.lead = true
                    }
                },
                cost: 2,
                ascend: 22,
                desc: 'Your teammates also get buff',
            },
            {
                name: 'afterlife cold',
                type: 'ghost form',
                canUse: (character: Character) => {
                    return (
                        character.utility instanceof GhostForm && !character.utility.afterlife_cold
                    )
                },
                teach: (character: Character) => {
                    if (character.utility && character.utility instanceof GhostForm) {
                        character.utility.afterlife_cold = true
                    }
                },
                cost: 1,
                ascend: 10,
                desc: 'Freeze enemies',
            },
            {
                name: 'service',
                canUse: (character: Cultist) => {
                    return !character.triggers_on_heal.some(elem => elem instanceof ServiceTrigger)
                },
                teach: (character: Cultist) => {
                    character.triggers_on_heal.push(new ServiceTrigger())
                },
                cost: 2,
                ascend: 18,
                desc: 'You have a chance to get energy when you get life',
            },
            // {
            //     name: 'conduct of pain',
            //     canUse: (character: Cultist) => {
            //         return !character.triggers_on_block.some(elem => elem instanceof ConductOfPain)
            //     },
            //     teach: (character: Cultist) => {
            //         character.triggers_on_block.push(new ConductOfPain())
            //     },
            //     cost: 2,
            //     ascend: 15,
            //     desc: 'You have a chance to get energy when you block hit',
            // },
            {
                name: 'pain collector',
                canUse: (character: Cultist) => {
                    return character.soul_on_kill_chance < 10
                },
                teach: (character: Cultist) => {
                    character.soul_on_kill_chance ++
                },
                cost: 1,
                ascend: 10,
                desc: 'Increases a chnace to harvest the soul when you kill enemy',
            },
            {
                name: 'absorption',
                canUse: (character: Cultist) => {
                    return !character.on_counter_triggers.some(elem => elem instanceof AbsorptionTrigger)
                },
                teach: (character: Cultist) => {
                    character.on_counter_triggers.push(new AbsorptionTrigger())
                },
                cost: 2,
                ascend: 20,
                desc: 'When counterattacking, soul shards are released from enemies, and the number of them depends on your courage',
            },
            {
                name: 'burning circle',
                type: 'new ability',
                canUse: (character: Character) => {
                    return (
                        character instanceof Cultist &&
                        !(character.second_ability instanceof BurningCircle)
                    )
                },
                teach: (character: Character) => {
                    if (character instanceof Cultist) {
                        character.second_ability = new BurningCircle(character)
                        character.updateClientSkill()
                    }
                },
                cost: 3,
                ascend: 15,
                desc: 'Creates a circle of fire in which enemies take damage, the frequency of receiving damage depends on courage',
            },
            {
                name: 'all-consuming flame',
                type: 'burning circle',
                canUse: (character: Character) => {
                    return (
                        character instanceof Cultist &&
                        character.second_ability instanceof BurningCircle &&
                        !character.second_ability.consuming
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Cultist &&
                        character.second_ability instanceof BurningCircle
                    ) {
                        character.second_ability.consuming = true
                    }
                },
                cost: 2,
                ascend: 18,
                desc: 'Increases radius',
            },
            {
                name: 'fire hatred',
                type: 'burning circle',
                canUse: (character: Character) => {
                    return (
                        character instanceof Cultist &&
                        character.second_ability instanceof BurningCircle &&
                        !character.second_ability.hatred
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Cultist &&
                        character.second_ability instanceof BurningCircle
                    ) {
                        character.second_ability.hatred = true
                    }
                },
                cost: 1,
                ascend: 15,
                desc: 'Gives a chance to create explode when your kill enemy',
            },
            {
                name: 'devouring flame',
                type: 'burning circle',
                canUse: (character: Character) => {
                    return (
                        character instanceof Cultist &&
                        character.second_ability instanceof BurningCircle &&
                        !character.second_ability.devouring
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Cultist &&
                        character.second_ability instanceof BurningCircle
                    ) {
                        character.second_ability.devouring = true
                    }
                },
                cost: 1,
                ascend: 15,
                desc: 'Gives a chance to increase duration when you kill enemy',
            },
            {
                name: 'spiritual call',
                canUse: (character: Character) => {
                    return !character.triggers_on_block.some(
                        elem => elem instanceof CallWarriorWhenBlock
                    )
                },
                teach: (character: Character) => {
                    if (character instanceof Cultist) {
                        character.triggers_on_block.push(new CallWarriorWhenBlock())
                    }
                },
                cost: 1,
                ascend: 10,
                desc: 'When you block there is a chance to summon spirit warrior',
            },
            {
                name: 'soul fragments',
                type: 'soulrender',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Soulrender &&
                        !character.first_ability.soul_fragments
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability instanceof Soulrender) {
                        character.first_ability.soul_fragments = true
                    }
                },
                cost: 1,
                ascend: 8,
                desc: 'Increases the count of shards after tear enemy',
            },
            {
                name: 'dark proliferation',
                type: 'soulrender',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Soulrender &&
                        character.first_ability.prolifiration < 75
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability instanceof Soulrender) {
                        character.first_ability.prolifiration += 25
                    }
                },
                cost: 2,
                ascend: 18,
                desc: 'Gives a chance to your soulrender ability to tear additional nearby target',
            },
        ]
    }
    static getFlyerUpgrades() {
        return [
            {
                name: 'fire splitting',
                type: 'fireball',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Fireball &&
                        !character.first_ability.fire_splitting
                    )
                },
                teach: (character: Character) => {
                    if (character && character.first_ability instanceof Fireball) {
                        character.first_ability.fire_splitting = true
                    }
                },
                cost: 3,
                ascend: 18,
                desc: 'Your fireball has a chance to create additional projectiles based on your courage',
            },
            {
                name: 'icicles',
                type: 'frost sphere',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof FrostSphere &&
                        !character.first_ability.icicles
                    )
                },
                teach: (character: Character) => {
                    if (character && character.first_ability instanceof FrostSphere) {
                        character.first_ability.icicles = true
                    }
                },
                cost: 4,
                ascend: 14,
                desc: 'Your frost sphere releases icicles while moving, count depends on you courage',
            },
            {
                name: 'magic flow',
                canUse: (character: Character) => {
                    return !character.triggers_on_say.some(elem => elem instanceof MagicFlowTrigger)
                },
                teach: (character: Character) => {
                    character.triggers_on_say.push(new MagicFlowTrigger())
                },
                cost: 2,
                ascend: 8,
                desc: 'When you speak there is a chance to gain energy to yourself and allies',
            },
            {
                name: 'scorching',
                type: 'flame wall',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof FlameWall &&
                        !character.second_ability.scorching
                    )
                },
                teach: (character: Character) => {
                    if (character && character.second_ability instanceof FlameWall) {
                        character.second_ability.scorching = true
                    }
                },
                cost: 2,
                ascend: 10,
                desc: 'Fire wall deals damage more often',
            },
            {
                name: 'friendly flame',
                type: 'flame wall',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof FlameWall &&
                        !character.second_ability.friendly_flame
                    )
                },
                teach: (character: Character) => {
                    if (character && character.second_ability instanceof FlameWall) {
                        character.second_ability.friendly_flame = true
                    }
                },
                cost: 3,
                ascend: 18,
                desc: 'Your flame wall does not damage to players',
            },
            {
                name: 'teeth',
                type: 'new ability',
                canUse: (character: Character) => {
                    return character instanceof Flyer && !(character.first_ability instanceof Teeth)
                },
                teach: (character: Character) => {
                    if (character instanceof Flyer) {
                        character.first_ability = new Teeth(character)
                        character.updateClientSkill()
                    }
                },
                cost: 2,
                ascend: 8,
                desc: 'Fires a series of bone teeth',
            },
            {
                name: 'pulling out teeth',
                type: 'teeth',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Teeth && !character.first_ability.pulling
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability instanceof Teeth) {
                        character.first_ability.pulling = true
                    }
                },
                cost: 2,
                ascend: 18,
                desc: 'The number grows due to the corpses nearby',
            },
            {
                name: 'sharp teeth',
                type: 'teeth',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Teeth && !character.first_ability.sharp
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability instanceof Teeth) {
                        character.first_ability.sharp = true
                    }
                },
                cost: 3,
                ascend: 27,
                desc: 'Teeth pierce once',
            },
            {
                name: 'body melting',
                type: 'fireball',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.first_ability instanceof Fireball &&
                        !character.first_ability.body_melting
                    )
                },
                teach: (character: Character) => {
                    if (character instanceof Flyer && character.first_ability instanceof Fireball) {
                        character.first_ability.body_melting = true
                    }
                },
                cost: 2,
                ascend: 18,
                desc: 'Gives your fireball a chance to pass through an enemy without exploding',
            },
            {
                name: 'ignite',
                type: 'fireball',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.first_ability instanceof Fireball &&
                        !character.first_ability.ignite
                    )
                },
                teach: (character: Character) => {
                    if (character instanceof Flyer && character.first_ability instanceof Fireball) {
                        character.first_ability.ignite = true
                    }
                },
                cost: 2,
                ascend: 8,
                desc: 'Your fireball creates flames on the floor after it explodes',
            },
            {
                name: 'hand of frost',
                type: 'frost sphere',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.first_ability instanceof FrostSphere &&
                        !character.first_ability.frost_rich
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.first_ability instanceof FrostSphere
                    ) {
                        character.first_ability.frost_rich = true
                    }
                },
                cost: 1,
                ascend: 8,
                desc: 'Increases radius',
            },
            {
                name: 'ice',
                type: 'frost sphere',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.first_ability instanceof FrostSphere &&
                        !character.first_ability.ice
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.first_ability instanceof FrostSphere
                    ) {
                        character.first_ability.ice = true
                    }
                },
                cost: 2,
                ascend: 15,
                desc: 'Deals damage not only to frozen enemies',
            },
            {
                name: 'shattering ice',
                type: 'frost sphere',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.first_ability instanceof FrostSphere &&
                        !character.first_ability.shattering
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.first_ability instanceof FrostSphere
                    ) {
                        character.first_ability.shattering = true
                    }
                },
                cost: 2,
                ascend: 24,
                desc: 'Deals doubled damage to frozen enemies',
            },
            {
                name: 'reign of frost',
                type: 'frost sphere',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.first_ability instanceof FrostSphere &&
                        !character.first_ability.reign_of_frost
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.first_ability instanceof FrostSphere
                    ) {
                        character.first_ability.reign_of_frost = true
                    }
                },
                cost: 1,
                ascend: 8,
                desc: 'Increases freeze duration',
            },
            {
                name: 'high voltage',
                type: 'lightning bolt',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.first_ability instanceof LightningBolt &&
                        !character.first_ability.high_voltage
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.first_ability instanceof LightningBolt
                    ) {
                        character.first_ability.high_voltage = true
                    }
                },
                cost: 1,
                ascend: 8,
                desc: 'Lightning bolt does not apply shock and hit up to 3 targets',
            },
            {
                name: 'storm',
                type: 'lightning bolt',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.first_ability instanceof LightningBolt &&
                        !character.first_ability.storm
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.first_ability instanceof LightningBolt
                    ) {
                        character.first_ability.storm = true
                        character.first_ability.cost += 1
                    }
                },
                cost: 2,
                ascend: 18,
                desc: 'Grants a chance to create additional bolts based on your courage, but mana cost is increased',
            },
            {
                name: 'conductivity',
                type: 'lightning bolt',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.first_ability instanceof LightningBolt &&
                        !character.first_ability.conductivity
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.first_ability instanceof LightningBolt
                    ) {
                        character.first_ability.conductivity = true
                    }
                },
                cost: 2,
                ascend: 10,
                desc: 'Increases radius',
            },
            {
                name: 'improved chain reaction',
                type: 'forking lightning',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.second_ability instanceof ForkedLightning &&
                        !character.second_ability.improved_chain_reaction
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.second_ability instanceof ForkedLightning
                    ) {
                        character.second_ability.improved_chain_reaction = true
                    }
                },
                cost: 2,
                ascend: 10,
                desc: 'Increases chance to chain',
            },
            {
                name: 'fork',
                type: 'forking lightning',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.second_ability instanceof ForkedLightning &&
                        !character.second_ability.fork
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.second_ability instanceof ForkedLightning
                    ) {
                        character.second_ability.fork = true
                    }
                },
                cost: 3,
                ascend: 24,
                desc: 'Increases the amount of creating lightnings when chain',
            },
            {
                name: 'lightning eye',
                type: 'forking lightning',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.second_ability instanceof ForkedLightning &&
                        !character.second_ability.lightning_eye
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.second_ability instanceof ForkedLightning
                    ) {
                        character.second_ability.lightning_eye = true
                    }
                },
                cost: 2,
                ascend: 16,
                desc: 'Increases the target check radius for the new target',
            },
            {
                name: 'lightning waves',
                type: 'light beacon',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.third_ability instanceof LightBeacon &&
                        !character.third_ability.lightning_waves
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.third_ability instanceof LightBeacon
                    ) {
                        character.third_ability.lightning_waves = true
                    }
                },
                cost: 3,
                ascend: 10,
                desc: 'Creates electrical waves instead of lightning',
            },
            {
                name: 'air form',
                type: 'light beacon',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.third_ability instanceof LightBeacon &&
                        !character.third_ability.air_form
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.third_ability instanceof LightBeacon
                    ) {
                        character.third_ability.air_form = true
                    }
                },
                cost: 2,
                ascend: 28,
                desc: 'After casting the spell, you cannot take damage for 3 seconds',
            },
            {
                name: 'ice genesis',
                type: 'frostnova',
                canUse: (character: Character) => {
                    return character.third_ability instanceof Frostnova && !character.third_ability.ice_genesis
                    
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.third_ability instanceof Frostnova
                    ) {
                        character.third_ability.ice_genesis = true
                    }
                },
                cost: 3,
                ascend: 18,
                desc: 'If you kill the enemy there is a chance to create frost sphere',
            },
            {
                name: 'cold spires',
                type: 'frostnova',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.third_ability instanceof Frostnova &&
                        !character.third_ability.cold_spires
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Flyer &&
                        character.third_ability instanceof Frostnova
                    ) {
                        character.third_ability.cold_spires = true
                    }
                },
                cost: 4,
                ascend: 27,
                desc: 'Upon cast, you create icy spires that freeze enemies and explode',
            },
            {
                name: 'handcuffing',
                type: 'static field',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.utility instanceof StaticField &&
                        !character.utility.hand_cuffing
                    )
                },
                teach: (character: Character) => {
                    if (character instanceof Flyer && character.utility instanceof StaticField) {
                        character.utility.hand_cuffing = true
                    }
                },
                cost: 1,
                ascend: 8,
                desc: 'Targets in static field cannot attack',
            },
            {
                name: 'collapse',
                type: 'static field',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.utility instanceof StaticField &&
                        !character.utility.collapse
                    )
                },
                teach: (character: Character) => {
                    if (character instanceof Flyer && character.utility instanceof StaticField) {
                        character.utility.collapse = true
                    }
                },
                cost: 2,
                ascend: 15,
                desc: 'Targets in static field will take damage after duration',
            },
            {
                name: 'protected teleportation',
                type: 'teleportation',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.utility instanceof Teleportation &&
                        !character.utility.protected
                    )
                },
                teach: (character: Character) => {
                    if (character instanceof Flyer && character.utility instanceof Teleportation) {
                        character.utility.protected = true
                    }
                },
                cost: 2,
                ascend: 14,
                desc: 'You cannot take damage after you start teleporting',
            },
            {
                name: 'increased gate',
                type: 'teleportation',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        character.utility instanceof Teleportation &&
                        !character.utility.increased_gate
                    )
                },
                teach: (character: Character) => {
                    if (character instanceof Flyer && character.utility instanceof Teleportation) {
                        character.utility.increased_gate = true
                    }
                },
                cost: 1,
                ascend: 8,
                desc: 'Increases radius of end point',
            },
            {
                name: 'mana regen while defending',
                canUse: (character: Character) => {
                    return character instanceof Flyer && !character.allow_mana_regen_while_def
                },
                teach: (character: Character) => {
                    if (character instanceof Flyer && !character.allow_mana_regen_while_def) {
                        character.allow_mana_regen_while_def = true
                    }
                },
                cost: 4,
                ascend: 22,
                desc: 'Allows you to restore mana while you are in defend state',
            },
            {
                name: 'mental shield',
                canUse: (character: Character) => {
                    return character.power >= 10 && !character.armour_mutators.some(elem => elem instanceof MentalShieldMutator)
                },
                teach: (character: Character) => {
                    character.armour_mutators.push(new MentalShieldMutator())
                },
                cost: 2,
                ascend: 18,
                desc: 'Courage also increases your armour',
            },
            {
                name: 'charged shield',
                canUse: (character: Character) => {
                    return !character.triggers_on_block.some(elem => elem instanceof ChargedShield)
                },
                teach: (character: Character) => {
                    character.triggers_on_block.push(new ChargedShield())
                },
                cost: 1,
                ascend: 10,
                desc: 'There is a chance to create lightning when you block',
            },
            {
                name: 'annihilator beam',
                type: 'new ability',
                canUse: (character: Character) => {
                    return (
                        character instanceof Flyer &&
                        !(character.second_ability instanceof AnnihilatorBeam)
                    )
                },
                teach: (character: Character) => {
                    if (character instanceof Flyer) {
                        character.second_ability = new AnnihilatorBeam(character)
                        character.updateClientSkill()
                    }
                },
                cost: 2,
                ascend: 8,
                desc: 'Creates a beam of energy that burns enemies',
            },
            {
                name: 'light stream',
                type: 'annihilator beam',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof AnnihilatorBeam &&
                        character.second_ability.cost >= 3
                    )
                },
                teach: (character: Character) => {
                    if (character.second_ability instanceof AnnihilatorBeam) {
                        character.second_ability.cost -= 1
                    }
                },
                cost: 2,
                ascend: 14,
                desc: 'Reduces mana cost',
            },
            {
                name: 'concentrating energy',
                type: 'annihilator beam',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof AnnihilatorBeam &&
                        !character.second_ability.concentrating_energy
                    )
                },
                teach: (character: Character) => {
                    if (character.second_ability instanceof AnnihilatorBeam) {
                        character.second_ability.concentrating_energy = true
                    }
                },
                cost: 1,
                ascend: 18,
                desc: 'Always pierce',
            },
            {
                name: 'penetrating lightning',
                type: 'sparks',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof Sparks &&
                        character.third_ability.pierce < 3
                    )
                },
                teach: (character: Character) => {
                    if (character.third_ability instanceof Sparks) {
                        character.third_ability.pierce++
                    }
                },
                cost: 3,
                ascend: 16,
                desc: 'Increases the number of enemies your sparks can pass through',
            },
            {
                name: 'shocking sparks',
                type: 'sparks',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof Sparks && !character.third_ability.shock
                    )
                },
                teach: (character: Character) => {
                    if (character.third_ability instanceof Sparks) {
                        character.third_ability.shock = true
                    }
                },
                cost: 2,
                ascend: 22,
                desc: 'Your sparks shocks enemies',
            },
            {
                name: 'strong sparks',
                type: 'sparks',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof Sparks &&
                        character.third_ability.ttl < 10000
                    )
                },
                teach: (character: Character) => {
                    if (character.third_ability instanceof Sparks) {
                        character.third_ability.ttl += 2000
                    }
                },
                cost: 1,
                ascend: 8,
                desc: 'Increases duration',
            },
        ]
    }
    static getSwordmanUpgrades() {
        return [
            {
                name: 'crushing swings',
                type: 'weapon swing',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof WeaponSwing &&
                        !character.first_ability.crushing
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof WeaponSwing) {
                        character.first_ability.crushing = true
                    }
                },
                cost: 4,
                ascend: 18,
                desc: 'Increase attack range and slash angle',
            },
            {
                name: 'spirit weapon',
                canUse: (character: Character) => {
                    return character.attack_radius <= 16 && character.power >= 12
                },
                teach: (character: Character): void => {
                    character.attack_radius += 1.5
                },
                cost: 3,
                ascend: 14,
                desc: 'Increases your attack range',
            },
            {
                name: 'echo swing',
                type: 'weapon swing',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof WeaponSwing &&
                        !character.first_ability.echo_swing
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof WeaponSwing) {
                        character.first_ability.echo_swing = true
                    }
                },
                cost: 2,
                ascend: 8,
                desc: 'Gives your weapon swing chance to land an additional swing after a short time',
            },
            {
                name: 'improved swing technology',
                type: 'weapon swing',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof WeaponSwing &&
                        !character.first_ability.improved_swing_technology
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof WeaponSwing) {
                        character.first_ability.improved_swing_technology = true
                    }
                },
                cost: 1,
                ascend: 16,
                desc: 'Gives your weapon swing chance to increase move and attack speed for a short period',
            },
            {
                name: 'light grip',
                type: 'weapon throw',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof WeaponThrow &&
                        !character.first_ability.light_grip
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof WeaponThrow) {
                        character.first_ability.light_grip = true
                    }
                },
                cost: 2,
                ascend: 14,
                desc: 'Gives your weapon throw ability a chance to reduce cd time between uses by 50%',
            },
            {
                name: 'multiple blades',
                type: 'weapon throw',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof WeaponThrow &&
                        !character.first_ability.multiple
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof WeaponThrow) {
                        character.first_ability.multiple = true
                    }
                },
                cost: 4,
                ascend: 18,
                desc: 'Provides a chance to create additional copies of your thrown weapon',
            },
            {
                name: 'firm grip',
                canUse: (character: Character) => {
                    return character.blocks >= 30 && !(character instanceof Flyer) && !character.chance_not_to_lose_energy_when_block_mutators.some(elem => elem instanceof FirmGripMutator)
                },
                teach: (character: Character): void => {
                    character.chance_not_to_lose_energy_when_block_mutators.push(new FirmGripMutator())
                },
                cost: 2,
                ascend: 22,
                desc: 'Power now increases the chance not to lose energy when you block',
            },
            {
                name: 'returning',
                type: 'weapon throw',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof WeaponThrow &&
                        !character.first_ability.returning &&
                        !character.first_ability.shattering
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof WeaponThrow) {
                        character.first_ability.returning = true
                    }
                },
                cost: 3,
                ascend: 24,
                desc: 'Thrown weapons have a chance to return',
            },
            {
                name: 'while we are alive',
                type: 'inner power',
                canUse: (character: Character) => {
                    let status = character.level.status_pull.find(
                        elem => elem.unit === character && elem instanceof InnerPowerTrigger
                    )
                    if (!status || !(status instanceof InnerPowerTrigger)) return

                    return !status.while_alive
                },
                teach: (character: Character) => {
                    let status = character.level.status_pull.find(
                        elem => elem.unit === character && elem instanceof InnerPowerTrigger
                    )
                    if (!status || !(status instanceof InnerPowerTrigger)) return

                    status.while_alive = true
                },
                cost: 3,
                ascend: 27,
                desc: 'Your inner power passive also gives fortify(40%)',
            },
            {
                name: 'shattering',
                type: 'weapon throw',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof WeaponThrow &&
                        !character.first_ability.returning &&
                        !character.first_ability.shattering
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability && character.first_ability instanceof WeaponThrow) {
                        character.first_ability.shattering = true
                    }
                },
                cost: 3,
                ascend: 27,
                desc: 'Thrown weapons have a chance to shatter and realise metal parts that hit enemies',
            },
            {
                name: 'heavy landing',
                type: 'jump',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof Jump &&
                        !character.second_ability.heavy_landing
                    )
                },
                teach: (character: Character) => {
                    if (character.second_ability && character.second_ability instanceof Jump) {
                        character.second_ability.heavy_landing = true
                    }
                },
                cost: 2,
                ascend: 10,
                desc: 'After landing by jump ability your will get armour by each hited enemy',
            },
            {
                name: 'stomp',
                type: 'jump',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof Jump && !character.second_ability.stomp
                    )
                },
                teach: (character: Character) => {
                    if (character.second_ability && character.second_ability instanceof Jump) {
                        character.second_ability.stomp = true
                    }
                },
                cost: 3,
                ascend: 24,
                desc: 'Increases radius',
            },
            {
                name: 'destroyer',
                type: 'charge',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof Charge &&
                        !character.second_ability.destroyer
                    )
                },
                teach: (character: Character) => {
                    if (character.second_ability && character.second_ability instanceof Charge) {
                        character.second_ability.destroyer = true
                    }
                },
                cost: 2,
                ascend: 10,
                desc: 'Gives a chance to deal damage by charge ability',
            },
            {
                name: 'vision of possibilities',
                type: 'charge',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof Charge &&
                        !character.second_ability.possibilities
                    )
                },
                teach: (character: Character) => {
                    if (character.second_ability && character.second_ability instanceof Charge) {
                        character.second_ability.possibilities = true
                    }
                },
                cost: 2,
                ascend: 14,
                desc: 'If you hit 3 or more enemies with the charge ability, you have a chance to gain Energy',
            },
            {
                name: 'blood harvest',
                type: 'whirlwind',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof Whirlwind &&
                        !character.third_ability.blood_harvest
                    )
                },
                teach: (character: Character) => {
                    if (character.third_ability && character.third_ability instanceof Whirlwind) {
                        character.third_ability.blood_harvest = true
                    }
                },
                cost: 3,
                ascend: 35,
                desc: 'After using the whirlwind, you have a chance to create a blood sphere',
            },
            {
                name: 'fan of swords',
                type: 'whirlwind',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof Whirlwind &&
                        !character.third_ability.fan_of_swords
                    )
                },
                teach: (character: Character) => {
                    if (character.third_ability && character.third_ability instanceof Whirlwind) {
                        character.third_ability.fan_of_swords = true
                    }
                },
                cost: 3,
                ascend: 40,
                desc: 'Your whirlwind now shoots a fan of swords, and the weapon throwing ability upgrade also works',
            },
            {
                name: 'consequences',
                type: 'quake',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof Quake &&
                        !character.third_ability.consequences
                    )
                },
                teach: (character: Character) => {
                    if (character.third_ability && character.third_ability instanceof Quake) {
                        character.third_ability.consequences = true
                    }
                },
                cost: 3,
                ascend: 24,
                desc: 'Quake has a larger radius but an increased weakness duration',
            },
            {
                name: 'blast',
                type: 'quake',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof Quake && !character.third_ability.blasted
                    )
                },
                teach: (character: Character) => {
                    if (character.third_ability && character.third_ability instanceof Quake) {
                        character.third_ability.blasted = true
                    }
                },
                cost: 3,
                ascend: 35,
                desc: 'Provide a chance to instant kill',
            },
            {
                name: 'self care',
                type: 'quake',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof Quake &&
                        !character.third_ability.selfcare
                    )
                },
                teach: (character: Character) => {
                    if (character.third_ability && character.third_ability instanceof Quake) {
                        character.third_ability.selfcare = true
                    }
                },
                cost: 2,
                ascend: 8,
                desc: 'Your quake ability does not deal damage to you',
            },
            {
                name: 'drinker',
                type: 'cursed weapon',
                canUse: (character: Character) => {
                    return character.utility instanceof CursedWeapon && !character.utility.drinker
                },
                teach: (character: Character) => {
                    if (character.utility && character.utility instanceof CursedWeapon) {
                        character.utility.drinker = true
                    }
                },
                cost: 2,
                ascend: 14,
                desc: 'While you are affected by cursed weapon you have increased vampiric rate',
            },
            {
                name: 'fast commands',
                type: 'commands',
                canUse: (character: Character) => {
                    return character.utility instanceof Commands && !character.utility.fast_commands
                },
                teach: (character: Character) => {
                    if (character.utility && character.utility instanceof Commands) {
                        character.utility.fast_commands = true
                    }
                },
                cost: 1,
                ascend: 14,
                desc: 'Buff becomes shorter but stronger',
            },
            {
                name: 'shattered weapon',
                type: 'new ability',
                canUse: (character: Character) => {
                    return !(character.second_ability instanceof ShatteredWeapon)
                },
                teach: (character: Character) => {
                    if (character instanceof Swordman) {
                        character.second_ability = new ShatteredWeapon(character)
                        character.updateClientSkill()
                    }
                },
                cost: 2,
                ascend: 10,
                desc: 'Fires shards of your weapon that return to you when they hit walls or enemies, increasing your armor if you catch them as they return',
            },
            {
                name: 'sharp fragments',
                type: 'shattered weapon',
                canUse: (character: Character) => {
                    return character.second_ability instanceof ShatteredWeapon && !character.second_ability.sharp_fragments
                },
                teach: (character: Character) => {
                    if(character.second_ability instanceof ShatteredWeapon){
                        character.second_ability.sharp_fragments = true
                    }         
                },
                cost: 2,
                ascend: 18,
                desc: 'Also increases your critical chance',
            },
            {
                name: 'shrapnel',
                type: 'shattered weapon',
                canUse: (character: Character) => {
                    return character.second_ability instanceof ShatteredWeapon && !character.second_ability.shrapnel
                },
                teach: (character: Character) => {
                    if(character.second_ability instanceof ShatteredWeapon){
                        character.second_ability.shrapnel = true
                    }         
                },
                cost: 2,
                ascend: 18,
                desc: 'The shard has a 50% chance of not returning and exploding into 3 shards.',
            },
            {
                name: 'searching weapon',
                canUse: (character: Character) => {
                    return character.attack_radius < 10
                },
                teach: (character: Character) => {
                    if (character instanceof Swordman) {
                        character.attack_radius++
                    }
                },
                cost: 2,
                ascend: 8,
                desc: 'Increases attack range',
            },
            {
                name: 'attack speed',
                canUse: (character: Character) => {
                    return character.attack_speed > 600
                },
                teach: (character: Character) => {
                    if (character instanceof Swordman) {
                        character.attack_speed -= 40
                    }
                },
                cost: 2,
                desc: 'Increases attack speed',
            },
            {
                name: 'heaven vengeance',
                type: 'new ability',
                canUse: (character: Character) => {
                    return !(character.first_ability instanceof HeavenVengeance)
                },
                teach: (character: Character) => {
                    if (character instanceof Swordman) {
                        character.first_ability = new HeavenVengeance(character)
                        character.updateClientSkill()
                    }
                },
                cost: 2,
                ascend: 8,
                desc: 'Hits one enemy and strikes nearby enemies with lightning',
            },
            {
                name: 'eye for eye',
                type: 'heaven vengeance',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof HeavenVengeance &&
                        !character.first_ability.eye
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Swordman &&
                        character.first_ability instanceof HeavenVengeance
                    ) {
                        character.first_ability.eye = true
                    }
                },
                cost: 1,
                ascend: 10,
                desc: 'Increases radius of serching targets and targets count by your courage',
            },
            {
                name: 'heaven grace',
                type: 'heaven vengeance',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof HeavenVengeance &&
                        !character.first_ability.grace
                    )
                },
                teach: (character: Character) => {
                    if (
                        character instanceof Swordman &&
                        character.first_ability instanceof HeavenVengeance
                    ) {
                        character.first_ability.grace = true
                        character.triggers_on_get_hit.push(character.first_ability)
                    }
                },
                cost: 1,
                ascend: 8,
                desc: 'Gives a chance to reset cooldown when taking damage',
            },
            {
                name: 'emergency orders',
                canUse: (character: Character) => {
                    return !character.triggers_on_say.some(
                        elem => elem instanceof EmergencyOrdersTrigger
                    )
                },
                teach: (character: Character) => {
                    character.triggers_on_say.push(new EmergencyOrdersTrigger())
                },
                cost: 3,
                ascend: 14,
                desc: 'When speak, you a chance to grant you and your allies gain Command ability buff',
            },
            {
                name: 'blocking technique',
                canUse: (character: Character) => {
                    return !character.triggers_on_block.some(
                        elem => elem instanceof BlockingTechnique
                    )
                },
                teach: (character: Character) => {
                    character.triggers_on_block.push(new BlockingTechnique())
                },
                cost: 3,
                ascend: 18,
                desc: 'When you block 5 hits the next three will be successfully blocked',
            },
            {
                name: 'pressure',
                type: 'dash',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Dash &&
                        !character.first_ability.pressure
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability instanceof Dash) {
                        character.first_ability.pressure = true
                    }
                },
                cost: 2,
                ascend: 12,
                desc: 'Increases the pierce rating for each energy you have',
            },
            {
                name: 'electrified dash',
                type: 'dash',
                canUse: (character: Character) => {
                    return (
                        character.first_ability instanceof Dash &&
                        !character.first_ability.electrified
                    )
                },
                teach: (character: Character) => {
                    if (character.first_ability instanceof Dash) {
                        character.first_ability.electrified = true
                    }
                },
                cost: 3,
                ascend: 22,
                desc: 'Dash now spawns sparks upon completion of the move, the number of which depends on targets you hit by ability',
            },
            {
                name: 'pointed spines',
                type: 'metal thorns',
                canUse: (character: Character) => {
                    return (
                        character.second_ability instanceof MetalThorns &&
                        !character.second_ability.pointed
                    )
                },
                teach: (character: Character) => {
                    if (character.second_ability instanceof MetalThorns) {
                        character.second_ability.pointed = true
                    }
                },
                cost: 2,
                ascend: 15,
                desc: 'Metal thorns crush enemies when hit',
            },
            {
                name: 'call of arms',
                type: 'spectral swords',
                canUse: (character: Character) => {
                    return (
                        character.third_ability instanceof SpectralSwords &&
                        !character.third_ability.call
                    )
                },
                teach: (character: Character) => {
                    if (character.third_ability instanceof SpectralSwords) {
                        character.third_ability.call = true
                    }
                },
                cost: 4,
                ascend: 27,
                desc: 'Increases number of swords and their speed',
            },
        ]
    }
}