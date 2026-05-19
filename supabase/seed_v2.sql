-- ============================================================
-- Hextech ARAM Assistant — 完整种子数据 v2
-- 数据来源: arammayhem.com (2026-05-18)
-- 符文: 195个 (彩色65 + 金色68 + 银色62)
-- 羁绊: 9个
-- ============================================================

-- 清空重建
TRUNCATE runes CASCADE;
TRUNCATE fetters CASCADE;

-- ============================================================
-- RUNES (195)
-- ============================================================

-- Prismatic/Chromatic (彩色/棱彩) — 65个
INSERT INTO runes (name, description, quality, tier, effect_type, icon_url) VALUES
  ('回归基本功', '你的终极技能已被封印。获得30%技能伤害、治疗效果、护盾，和60技能急速', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Back_To_Basics_mayhem_augment.webp'),
  ('史上最大雪球', 'Upgrades your Mark into a massive snowball, empowering it with an increased size radius and the ability…', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Biggest_Snowball_Ever_mayhem_augment.webp'),
  ('利刃华尔兹', '获得召唤师技能利刃华尔兹。 利刃华尔兹会让你进入不可被选取状态，在此期间对敌人进行反复突进并造成伤害', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Blade_Waltz_mayhem_augment.webp'),
  ('魄罗之王的弹跳', 'Replace a summoner spell with Bounce of the Poro King. [b]Bounce of the Poro King:[/b] See win rate…', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Bounce_of_the_Poro_King_mayhem_augment.webp'),
  ('你摸不到', '施放你的终极技能会使你进入持续@InvulnDuration@秒的的免疫伤害状态(@Cooldown@秒冷却时间)', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Cant_Touch_This_mayhem_augment.webp'),
  ('地狱三头犬', 'Gain the Hail of Blades and Press the Attack keystone runes. See win rate, pick rate, best champions, combo…', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Cerberus_mayhem_augment.webp'),
  ('死亡之环', '你造成的治疗效果和生命回复效果会对相距最近的那个敌方英雄造成@HealToDamageConversion*100@%该治疗数额的魔法伤害', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Circle_of_Death_mayhem_augment.webp'),
  ('小丑学院', 'Gain Shaco Backstab, Deceive and Hallucinate explosion. Replace a summoner spell with Deceive. [b]Passive…', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Clown_College_mayhem_augment.webp'),
  ('巨像的勇气', '定身或缚地一个敌方英雄后获得100 – 300(基于等级)（+ 5%最大生命值）护盾值', 'prismatic', 'chromatic', 'defense', 'https://arammayhem.com/augments/Courage_of_the_Colossus_mayhem_augment.webp'),
  ('残忍', 'Immobilizing or grounding an enemy champion summons a comet above them that lands at their current location after 1…', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Cruelty_mayhem_augment.webp'),
  ('全凭身法', '你的冲刺、跳跃、闪烁或传送类技能获得100技能急速', 'prismatic', 'chromatic', 'mobility', 'https://arammayhem.com/augments/Dashing_mayhem_augment.webp'),
  ('你肩上的恶魔', 'Forge a pact with Teemo, who drains 0.5% of your [b]current[/b] health every second, increased to 5%…', 'prismatic', 'chromatic', 'defense', 'https://arammayhem.com/augments/Devil_on_Your_Shoulder_mayhem_augment.webp'),
  ('亮出你的剑', '变为近战状态，并且获得30%攻击力、30%生命值、25%攻击速度、20%生命偷取和25%移动速度 ，每个属性都基于舍弃的攻击距离提升0-30%（从500开始，每15提升3%）', 'prismatic', 'chromatic', 'defense', 'https://arammayhem.com/augments/Draw_Your_Sword_mayhem_augment.webp'),
  ('飞身踢', 'Your basic attacks and abilities execute enemy champions below 5% (+ 3% per 100 of your AD) (+ 0.2% per 1000 of your…', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Dropkick_mayhem_augment.webp'),
  ('卡皮巴拉空投', '获得召唤师技能卡皮巴拉空投。 在2秒后，一个卡皮巴拉撞进地面，造成25%最大生命值的真实伤害', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Droppybara_mayhem_augment.webp'),
  ('双刀流', '在你攻击时，发射一个次级弩箭，造成40%伤害和40%效能的命中。获得20%总攻击速度', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Dual_Wield_mayhem_augment.webp'),
  ('信念者的强化', 'Granting a heal or shield to an allied champion blesses them for 8 seconds. Whenever a blessed ally…', 'prismatic', 'chromatic', 'defense', 'https://arammayhem.com/augments/Empowered_By_The_Faithful_mayhem_augment.webp'),
  ('至高天诺言', '获得15%治疗和护盾强度，获得至高天诺言召唤师技能。警惕传送至你的友军并在着陆时提供持续3秒的100 - 250(基于等级) +100%AP + 10%额外生命值护盾值', 'prismatic', 'chromatic', 'defense', 'https://arammayhem.com/augments/Empyrean_Promise_mayhem_augment.webp'),
  ('尤里卡', '获得相当于30%法术强度的技能急速', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Eureka_mayhem_augment.webp'),
  ('连拨击锤', 'Your next basic attack in each cardinal direction within 750 range additionally on-attack fires 5 bolts at the…', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Fan_The_Hammer_mayhem_augment.webp'),
  ('感受燃烧', '获得召唤师技能感受灼烧。 感受灼烧会对所有附近的敌人们施放引燃和虚弱。 范围：800', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Feel_the_Burn_mayhem_augment.webp'),
  ('精怪魔法', '你的终极技能的伤害会对敌人造成持续2秒的变形效果', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Fey_Magic_mayhem_augment.webp'),
  ('最终形态', '在施放你的终极技能时，获得持续10秒的50%最大生命值护盾、20%全能吸血和30%额外移动速度。(20秒冷却时间)', 'prismatic', 'chromatic', 'defense', 'https://arammayhem.com/augments/Final_Form_mayhem_augment.webp'),
  ('砍伤', '获得50%攻击速度。攻击造成 20-40/10-20（+25%/20%额外护甲）真实伤害 命中', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Gash_mayhem_augment.webp'),
  ('巨人杀手', '体型变小，获得30%移动速度，并基于敌方英雄体型大于你的程度造成10%到30%额外伤害', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Giant_Slayer_mayhem_augment.webp'),
  ('玻璃大炮', '减少30%最大生命值。造成15%额外真实伤害', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Glass_Cannon_mayhem_augment.webp'),
  ('夺金', '用攻击或技能对一个英雄造成伤害时会造成额外50-150(基于等级) +40%额外AD +20%AP魔法伤害，并为你提供30金币和持续1.5秒的25%移动速度(每个英雄有30秒冷却时间)', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Goldrend_mayhem_augment.webp'),
  ('歌利亚巨人', '体型变大，获得35%生命值和15%适应之力', 'prismatic', 'chromatic', 'defense', 'https://arammayhem.com/augments/Goliath_mayhem_augment.webp'),
  ('男爵之手', '获得33%适应之力，附近友方小兵都获得极大增强', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Hand_of_Baron_mayhem_augment.webp'),
  ('当心小蛋糕！', 'Periodically, a Cupcake will fly across the map. Champions can consume the Cupcake by moving within its…', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Heads_Up_Cupcake!_mayhem_augment.webp'),
  ('神圣雪球', '你的雪球获得100技能急速，使用雪球冲刺后获得1秒的免疫伤害', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Holy_Snowball_mayhem_augment.webp'),
  ('小猫咪找妈妈', '站在一个友军的附近并将其标记为你的妈妈。 当朝着妈妈移动时，获得37.5%移动速度。当靠近你的妈妈时，获得75%移动速度、50%治疗和护盾强度', 'prismatic', 'chromatic', 'defense', 'https://arammayhem.com/augments/I&#x27;m_a_Baby_Kitty_Where_is_Mama_mayhem_augment.webp'),
  ('炼狱导管', '技能会施加一层可无限叠加的灼烧，每秒造成1.2 - 12 (基于等级) (+ 2.8 %额外AD) (+ 1.2 % AP) 点魔法伤害。 灼烧效果会降低你各基础技能的冷却时间0.08秒', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Infernal_Conduit_mayhem_augment.webp'),
  ('无限循环往复', '获得60技能急速，参与击杀额外获得3技能急速', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Infinite_Recursion_mayhem_augment.webp'),
  ('珠光护手', '你的技能可以造成暴击，造成145%总伤害。获得25%(+ 4.5% AP)%暴击几率', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Jeweled_Gauntlet_mayhem_augment.webp'),
  ('尊我为王', '当你第一次携带一件传说级装备并乘坐敌人的传送门时，你会加冕为王，升级你的装备并获得一个随机棱彩阶强化符文', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/King_Me_mayhem_augment.webp'),
  ('激光治疗', '施放一个持续2.5秒的治疗激光，治疗友军200-550(基于等级) +70%AP +50%额外生命值 生命值，对敌人造成100-350(基于等级) +50%AP魔法伤害并使敌人减速20%', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Laser_Heal_mayhem_augment.webp'),
  ('科学狂人', '在回合开始时，你的体型要么变大(获得@ADAmp*100@%适应之力和@HealthAmp*100@%生命值)要么变小(获得@Haste@技能急速和@MovespeedAmp*100@%移动速度)', 'prismatic', 'chromatic', 'defense', 'https://arammayhem.com/augments/Mad_Scientist_mayhem_augment.webp'),
  ('物法皆修', '你的每次攻击为你提供6 - 18 法术强度，并且你的每次技能为你提供3 - 9 攻击力 增益可无限叠加并刷新，但有5秒的持续时间', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Master_of_Duality_mayhem_augment.webp'),
  ('秘术冲拳', '命中使你的各个技能的冷却时间缩减其1.25秒冷却时间', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Mystic_Punch_mayhem_augment.webp'),
  ('不祥契约', '基于已损失生命值，获得至多75 - 150(基于等级)法术强度，50%移动速度和20%全能吸血。施放技能会消耗你的5%当前生命值。 在30%生命值时获得最大增益', 'prismatic', 'chromatic', 'defense', 'https://arammayhem.com/augments/Ominous_Pact_mayhem_augment.webp'),
  ('全能龙魂', '获得3个随机龙魂', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Omni_Soul_mayhem_augment.webp'),
  ('轨道镭射', '在2.5秒后，召唤一道轨道镭射光束落下，造成25%目标最大生命值的真实伤害并在3秒内持续造成共360-600 (基于等级) 的魔法伤害。 每场游戏仅会有一位玩家拥有这个强化符文', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/OrbitalLaser_mayhem_augment.webp'),
  ('潘朵拉的盒子', '将你的所有强化符文变为随机的棱彩阶强化符文', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/PandorasBox_mayhem_augment.webp'),
  ('舞会女王', '每25秒自动获得一个围绕你的聚光灯，聚光灯会在2.5秒后落下，当它着陆时，获得洛的终极技能，魅惑你碰到的敌人们', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Prom_Queen_mayhem_augment.webp'),
  ('蛋白粉奶昔', '获得25%(+35%额外护甲)(+35%额外魔抗)治疗和护盾强度', 'prismatic', 'chromatic', 'defense', 'https://arammayhem.com/augments/Protein_Shake_mayhem_augment.webp'),
  ('量子计算', 'Automatically cast an improved version of Tactical Sweep when an enemy champion is within 650 units of you…', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Quantum_Computing_mayhem_augment.webp'),
  ('任务：海牛阿福的勇士', '需求：参与击杀@TakedownsNeeded@次。 奖励：金铲铲', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Quest:_Urf&#x27;s_Champion_mayhem_augment.webp'),
  ('任务：沃格勒特的巫师帽', '即刻：获得【无用大棒】。 需求：持有【灭世者的死亡之帽】和【中娅沙漏】。 奖励：获得【沃格勒特的巫师帽】', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Quest:_Wooglet&#x27;s_Witchcap_mayhem_augment.webp'),
  ('红包', '每25-15(基于等级)秒，你的周围随机出现红包，拾取红包可以获得10-18(基于等级)到28-58(基于等级)金币，随机属性，以及持续4秒的150移动速度', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Red_Envelopes_mayhem_augment.webp'),
  ('最万用的瞄准镜', '获得300攻击距离，如果你是远程英雄则降低至150攻击距离', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Scopiest_Weapons_mayhem_augment.webp'),
  ('慢炖', '每一秒，对500码内的敌方英雄们施加一层可无限叠加的灼烧，在5秒的持续时间里每秒造成0.35%最大生命值的伤害', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Slow_Cooker_mayhem_augment.webp'),
  ('属性叠属性叠属性！', '获得5个属性锻造器，有更高几率出现黄金阶和棱彩阶锻造器！ 在你的下一次强化符文选取时，每个栏位获得一次额外的刷新', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Stats_on_Stats_on_Stats!_mayhem_augment.webp'),
  ('和我一起困在这里', '使用你的终极技能时会嘲讽附近的敌人们并提供给你持续2秒的40%伤害减免', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Stuck_In_Here_With_Me_mayhem_augment.webp'),
  ('战争交响乐', '获得致命节奏和征服者基石符文', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Symphony_of_War_mayhem_augment.webp'),
  ('踢踏舞', 'Basic attacks on-hit against enemy champions and minions grant 10 [b]bonus[/b] movement speed, lasting for 5…', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Tap_Dancer_mayhem_augment.webp'),
  ('质变：混沌', '获得2个随机的强化符文', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Transmute:_Chaos_mayhem_augment.webp'),
  ('扳机炼狱', 'Your damaging basic attacks and abilities against at least one enemy champion unique from the previous…', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Triggered_Inferno_mayhem_augment.webp'),
  ('精准奇才', 'Upon damaging an enemy while located at over 700 units away at the time of the hit, cast Trueshot Barrage in…', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/TrueshotProdigy_mayhem_augment.webp'),
  ('终极唤醒', '你的终极技能获得30技能急速。在施放你的终极技能后，重置你所有基础技能的冷却时间并获得持续15秒的300基础技能急速。(20秒冷却时间)', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Ultimate_Awakening_mayhem_augment.webp'),
  ('终极刷新', '在施放终极技能后刷新你的终极技能。(@Cooldown@秒冷却时间或阵亡时重置)', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Ultimate_Revolution_mayhem_augment.webp'),
  ('升级：米凯尔的祝福', 'Upgrades Mikael''s Blessing, reducing the cooldown of Purify to 45 seconds and empowering its active…', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Upgrade_Mikael&#x27;s_Blessing_mayhem_augment.webp'),
  ('任务：艾卡西亚的陷落', '即刻：获得一个斑比的熔渣并且你可以同时购买两件献祭装备。 需求：持有【日炎圣盾】和【璀璨回响】。 奖励：将【日炎圣盾】和【璀璨回响】组合成【虚空献祭】', 'prismatic', 'chromatic', 'utility', 'https://arammayhem.com/augments/Void_Immolation_mayhem_augment.webp'),
  ('虚空裂隙', 'Damaging an enemy champion with an ability summons a Void Scar at the location they were damaged for 6 seconds. If…', 'prismatic', 'chromatic', 'damage', 'https://arammayhem.com/augments/Void_Rift_mayhem_augment.webp'),
  ('风语者的祝福', '你的治疗效果和护盾效果还会提升目标30-60的护甲和魔法抗性，这些加成持续3秒', 'prismatic', 'chromatic', 'defense', 'https://arammayhem.com/augments/Windspeaker&#x27;s_Blessing_mayhem_augment.webp');

-- Gold (金色) — 68个
INSERT INTO runes (name, description, quality, tier, effect_type, icon_url) VALUES
  ('全心为你', '你的治疗和护盾在用在一个友军身上时会变强@HealShieldAmp*100@%', 'gold', 'gold', 'defense', 'https://arammayhem.com/augments/All_For_You_mayhem_augment.webp'),
  ('尖端发明家', '获得60装备急速(相当于37%装备冷却缩减)。 装备急速可缩减所有装备技能的冷却时间%i:cooldown%', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Apex_Inventor_mayhem_augment.webp'),
  ('超强大脑', '获得一个可吸收300%法术强度伤害的护盾，护盾被打破前持续生效。护盾会在阵亡时或每70秒刷新一次', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Big_Brain_mayhem_augment.webp'),
  ('面包和黄油', '你的Q获得100技能急速', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Bread_And_Butter_mayhem_augment.webp'),
  ('面包和奶酪', '你的E获得@EAbilityHaste@技能急速', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Bread_and_Cheese_mayhem_augment.webp'),
  ('面包和果酱', '你的W获得@WAbilityHaste@技能急速', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Bread_And_Jam_mayhem_augment.webp'),
  ('星界躯体', '获得1500，但你造成的伤害降低10%', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Celestial_Body_mayhem_augment.webp'),
  ('作弊：我能回城！', '按下【回城】能够回到基地，购买装备并且获得强化符文', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Cheating_mayhem_augment.webp'),
  ('会心治疗', '你的治疗和护盾可以暴击，获得@CritHeal*100@%额外数额的效果。获得20%暴击几率', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Critical_Healing_mayhem_augment.webp'),
  ('暴击飞弹', '获得25%暴击率，当你暴击时，会施放1-4道飞弹(基于暴击率)，每道飞弹造成11-40(+7%额外攻击力)(+10%法术强度)魔法伤害', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Critical_Missile_mayhem_augment.webp'),
  ('暴击律动', '获得25%暴击几率。你的普攻在暴击时获得可叠加的6%攻击速度。(至多至10层)', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Critical_Rhythm_mayhem_augment.webp'),
  ('黎明使者的坚决', '在跌到@HealthThreshold*100@%生命值以下时，在3秒里持续回复共@HealAmount*100@%最大生命值。（45秒 冷却时间）', 'gold', 'gold', 'defense', 'https://arammayhem.com/augments/Dawnbringer&#x27;s_Resolve_mayhem_augment.webp'),
  ('魔鬼之舞', 'Gain the Fleet Footwork and Grasp of the Undying keystone runes. See win rate, pick rate, best champions, combo…', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Demon&#x27;s_Dance_mayhem_augment.webp'),
  ('神圣干预', '每35秒，召唤护体星星缓慢地降落在你身上。在它着陆时，你和附近的友军们进入2.5秒的免疫伤害状态', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Divine_Intervention_mayhem_augment.webp'),
  ('捐赠', '获得2500金币', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Donation_mayhem_augment.webp'),
  ('双发快射', '获得25%暴击率，暴击时会额外施加一次命中', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Double_Tap_mayhem_augment.webp'),
  ('虚幻武器', '你的技能可施加命中。每个目标有1秒冷却时间', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Ethereal_Weapon_mayhem_augment.webp'),
  ('裁决使', '对生命值低于30%的敌人们多造成10%伤害。在参与击杀后重置你的基础技能', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Executioner_mayhem_augment.webp'),
  ('最终都市列车', '在你阵亡时，朝击杀你的敌人发动一辆列车，对命中的敌人造成150-750(+50%法术强度)(+65%额外攻击力)(+15%最大生命值)物理伤害。这个列车不会停下', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Final_City_Transit_mayhem_augment.webp'),
  ('火上浇油', '你的攻击还会灼烧敌人，在@BleedDuration@秒的持续时间里每秒持续造成@PercentMaxHPDamagePer5Seconds*20@%最大生命值的魔法伤害。灼烧可无限叠加', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Firebrand_mayhem_augment.webp'),
  ('有始有终', '获得先攻和黑暗收割基石符文。此外，你每拥有一个强化符文，即可获得8黑暗收割层数', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/From_Beginning_To_End_mayhem_augment.webp'),
  ('罪恶快感', '参与击杀后，获得持续4秒的100%移动速度和15%总攻击速度', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Get_Excited!_mayhem_augment.webp'),
  ('祖母的辣椒油', '施加一个灼烧时，会在附近掉落一个持续5秒的辣椒油池子，站在一个辣椒油池子上每秒会回复60-150(+30x燃烧来源)生命值，并对敌人造成60(+100x燃烧来源)魔法伤害', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Grandma&#x27;s_Chili_Oil_mayhem_augment.webp'),
  ('生机迸发', '获得【生机迸发】召唤师技能。【生机迸发】会猛然提升你的体型，击飞附近的敌人们并提供300（+20%生命值）最大生命值', 'gold', 'gold', 'defense', 'https://arammayhem.com/augments/Growth_Spurt_mayhem_augment.webp'),
  ('圣火', 'Your heals and shields cause you to fire a missile to the nearest enemy unit within 650 units over 0.32 seconds…', 'gold', 'gold', 'defense', 'https://arammayhem.com/augments/Holy_Fire_mayhem_augment.webp'),
  ('不动如山', '获余震和冰川增幅基石符文', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Impassable_mayhem_augment.webp'),
  ('关键暴击', '获得20%暴击几率', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/It&#x27;s_Critical_mayhem_augment.webp'),
  ('杀戮时间到了', 'Upon casting your ultimate ability, you apply Death Mark to all enemy champions (8 second cooldown). The…', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/It&#x27;s_Killing_Time_mayhem_augment.webp'),
  ('基石法师', '获得召唤：艾黎和奥术彗星基石符文', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Keystone_Conjurer_mayhem_augment.webp'),
  ('闪电打击', '获得40%总攻击速度。 在2.5攻击次数/秒时，造成额外的魔法伤害 命中', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Lightning_Strikes_mayhem_augment.webp'),
  ('魔法飞弹', '用一个技能造成伤害时，会对每个被命中的敌人发射3个魔法飞弹，每个魔法飞弹基于飞行距离至多造成1%最大生命值的真实伤害', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Magic_Missile_mayhem_augment.webp'),
  ('神射法师', '你的攻击造成相当于你75%法术强度的额外物理伤害', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Marksmage_mayhem_augment.webp'),
  ('仆从大师', '你的召唤物获得@MinionSizeIncrease*100@%体型提升、生命值和伤害', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Minionmancer_mayhem_augment.webp'),
  ('夜狩', '在对敌人造成伤害的3秒内参与击杀该敌人会使你进入1.5秒的隐身状态', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Nightstalking_mayhem_augment.webp'),
  ('回力ok镖', '每@BaseCooldown@秒朝着一个附近的敌人自动施放投掷一个回力镖，对命中的敌人们造成40 – 200 (基于等级) (+ 22%额外AD) (+ 15% AP)自适应伤害', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Ok_Boomerang_mayhem_augment.webp'),
  ('狂徒豪气', '你的冲刺、跳跃、闪烁或传送类技能会为你提供12点额外护甲和12点额外魔法抗性，持续15秒，最多可叠加至5层(共提供60点双抗)。当前层数会在状态栏中显示', 'gold', 'gold', 'defense', 'https://arammayhem.com/augments/Outlaw&#x27;s_Grit_mayhem_augment.webp'),
  ('溢流', '你的法力值消耗翻倍。你的技能的治疗效果、护盾效果和伤害的效能提升10% （每 100最大法力值+ 0.5 % ）', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Overflow_mayhem_augment.webp'),
  ('坚韧', '获得250%基础生命回复，在低于25%生命值时提升至10%基础生命回复', 'gold', 'gold', 'defense', 'https://arammayhem.com/augments/Perseverance_mayhem_augment.webp'),
  ('超凡邪恶', '在你用技能命中敌人时永久获得1法术强度。 如果是作为你的第二个强化符文，则自带40法术强度', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Phenomenal_Evil_mayhem_augment.webp'),
  ('弹球', '你的雪球获得50技能急速，造成额外100-500(基于等级)真实伤害，并且可以从墙上反弹，每次反弹都会提升它25%体型，20%伤害，并且缩短它30%冷却时间', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Pinball_mayhem_augment.webp'),
  ('魄罗爆破手', '你周期性地召集魄罗，最多5只，攻击和技能会发射所有魄罗，每个魄罗造成3%最大生命值的真实伤害并击退敌人', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Poro_Blaster_mayhem_augment.webp'),
  ('任务：钢化你心', '需求：持有【心之钢】且层数在300层或以上。 奖励：将你当前及后续的心之钢层数乘以3', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Quest:_Steel_Your_Heart_mayhem_augment.webp'),
  ('古式佳酿', '使用一个技能时会回复5 – 60 (基于等级)（+ 1%最大生命值）点生命值', 'gold', 'gold', 'defense', 'https://arammayhem.com/augments/Rabble_Rousing_mayhem_augment.webp'),
  ('循环往复', '获得60技能急速', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Recursion_mayhem_augment.webp'),
  ('无休回复', '你每移动1000码距离就会回复20-120(基于等级)（+0.1% 最大生命值）的生命值', 'gold', 'gold', 'defense', 'https://arammayhem.com/augments/Restless_Restoration_mayhem_augment.webp'),
  ('更万用的瞄准镜', '获得200攻击距离，如果你是远程英雄则降低至100攻击距离', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Scopier_Weapons_mayhem_augment.webp'),
  ('炽烈黎明', '你的技能会标记敌人，使其在被你的友军的下一个攻击或技能命中时会受到额外40-200(基于等级)魔法伤害', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Searing_Dawn_mayhem_augment.webp'),
  ('缩小引擎', '每次参与击杀敌方英雄会让你变小4%，获得10技能急速和2%移动速度，死亡时损失65%层数', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Shrink_Engine_mayhem_augment.webp'),
  ('缩小射线', '你的攻击会对敌人造成持续3秒的@DamageReduction*100@%伤害削减效果', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Shrink_Ray_mayhem_augment.webp'),
  ('老练狙神', '用一个非终极技能命中一个@SnipeDistance@码距离外的敌人时，返还该技能80%冷却时间(周期性技能返还65%)', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Skilled_Sniper_mayhem_augment.webp'),
  ('一板一眼', '获得25攻击力。你的攻击速度变为@StaticRatio@。所有额外攻击速度会被转化为攻击力。(每1%攻速转为1攻击力)', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Slow_And_Steady_mayhem_augment.webp'),
  ('雪球扭蛋机', 'Hitting an enemy champion with Mark casts a random harmful summoner spell on them, and also casts a random…', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Snowball_Roulette_mayhem_augment.webp'),
  ('升级：雪球', 'Your Mark is empowered to hail a snowstorm at the location where the target was hit for 2 seconds, granting…', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Snowball_Upgrade_mayhem_augment.webp'),
  ('咏叹奏鸣', '每10秒交替自动施放【坚毅咏叹调】和【迅捷奏鸣曲】', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Sonata_mayhem_augment.webp'),
  ('吞噬灵魂', '定身一个敌方英雄会获得20最大生命值', 'gold', 'gold', 'defense', 'https://arammayhem.com/augments/Soul_Eater_mayhem_augment.webp'),
  ('灵魂虹吸', '获得@CritChance*100@%暴击几率和作用于暴击的@HealPercentage*100@%生命偷取', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Soul_Siphon_mayhem_augment.webp'),
  ('心灵净化', '参与击杀英雄时，在其上方产生一次爆炸，对敌人造成相当于其15%当前生命值的伤害。随后它会持续存在1.5秒，对敌人造成60%减速效果', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Spiritual_Purification_mayhem_augment.webp'),
  ('属性叠属性！', '获得4个属性锻造器，有更高几率出现黄金阶和棱彩阶锻造器！', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Stats_on_Stats!_mayhem_augment.webp'),
  ('坦克引擎', '参与击杀时，获得一个层数，使你的体型增大5%并提升5%最大生命值。阵亡时损失65%层数', 'gold', 'gold', 'defense', 'https://arammayhem.com/augments/Tank_Engine_mayhem_augment.webp'),
  ('穿针引线', '获得@PercentPen*100@%护甲穿透和法术穿透', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Thread_the_Needle_mayhem_augment.webp'),
  ('质变：棱彩阶', '获得1个随机棱彩阶强化符文', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Transmute:_Prismatic_mayhem_augment.webp'),
  ('接二连三', '每第三次攻击，你附带的命中会触发第二次', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/Twice_Thrice_mayhem_augment.webp'),
  ('升级：狂妄', '参与击杀时，【狂妄】回复你的2.5%最大生命值+ 0.5%*层数的已损失生命值，并且在增益持续时间提供10+5*层数 的移动速度。此外，获得250金币', 'gold', 'gold', 'defense', 'https://arammayhem.com/augments/Upgrade_Hubris_mayhem_augment.webp'),
  ('升级：无尽之刃', '获得25%暴击几率和500金币。 装备【无尽之刃】后，你的暴击会随机造成额外暴击伤害，最高可至你暴击几率的50%', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Upgrade_Infinity_Edge_mayhem_augment.webp'),
  ('升级：耀光', '你的【咒刃】效果造成额外目标最大生命值物理伤害并治疗你自身。此外，获得250金币', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Upgrade_Sheen_mayhem_augment.webp'),
  ('吸血习性', '你不再能够被友军治疗或获得任何生命回复。获得30%全能吸血', 'gold', 'gold', 'defense', 'https://arammayhem.com/augments/Vampirism_mayhem_augment.webp'),
  ('易损', '你的装备效果和持续伤害效果可以暴击来造成40%额外伤害。获得20%暴击几率', 'gold', 'gold', 'damage', 'https://arammayhem.com/augments/Vulnerability_mayhem_augment.webp'),
  ('急急小子', '获得移动速度，相当于你的@AbilityHasteToMSConversion*100@%技能急速', 'gold', 'gold', 'utility', 'https://arammayhem.com/augments/With_Haste_mayhem_augment.webp');

-- Silver (银色) — 62个
INSERT INTO runes (name, description, quality, tier, effect_type, icon_url) VALUES
  ('坚若磐石', '每当你定身或缚地一个敌人时，获得持续10秒的2-10(基于等级)护甲或者魔抗。至多至10 层', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Adamant_mayhem_augment.webp'),
  ('物理转魔法', '将额外攻击力转化为法术强度，并获得15%法术强度', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/ADAPt_mayhem_augment.webp'),
  ('大力', '获得@ADAmp*100@%攻击力', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Blunt_Force_mayhem_augment.webp'),
  ('霸符兄弟', '你获得余烬之冠和洞悉之冠。 余烬之冠：普攻会灼烧和减速敌方英雄。在非战斗状态下，治疗你的一部分最大生命值。 洞悉之冠：获得技能急速，并且每秒回复法力值和能量值', 'silver', 'silver', 'defense', 'https://arammayhem.com/augments/Buff_Buddies_mayhem_augment.webp'),
  ('砸开那颗蛋', '护盾过期后会爆炸，对周围敌人造成护盾值等量魔法伤害', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Crack_Open_That_Egg_mayhem_augment.webp'),
  ('由暴生急', '每拥有1%暴击率就会获得0.4技能急速', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Crit_&#x27;n_Cast_mayhem_augment.webp'),
  ('灵巧', '获得60%攻击速度', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Deft_mayhem_augment.webp'),
  ('俯冲轰炸', '在你阵亡时爆炸，对附近的敌人们造成目标@PercentMaxHPDamage*100@%最大生命值的真实伤害', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Dive_Bomber_mayhem_augment.webp'),
  ('唯快不破', '你每比目标多10移动速度，则对其多造成@BonusDamagePerMSDifference*1000@%额外伤害', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Don&#x27;t_Blink_mayhem_augment.webp'),
  ('侵蚀', '对敌人造成伤害时会施加一层持续3秒的5%护甲和魔法抗性击碎效果，至多在6层时击碎30%', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Erosion_mayhem_augment.webp'),
  ('魔法转物理', '将法术强度转化为额外攻击力，并获得15%攻击力', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/escAPADe_mayhem_augment.webp'),
  ('逃跑计划', '在降至35%生命值时，获得持续衰减的65%最大生命值护盾、持续衰减的150%移动速度和持续衰减的缩小效果。(75秒冷却时间)', 'silver', 'silver', 'defense', 'https://arammayhem.com/augments/Escape_Plan_mayhem_augment.webp'),
  ('火狐', 'Automatically cast Fox-Fire, gaining 40% [b]bonus[/b] movement speed that decays over 2 seconds and conjuring 3…', 'silver', 'silver', 'mobility', 'https://arammayhem.com/augments/FireFox_mayhem_augment.webp'),
  ('急救用具', '获得@HealShieldAmp*100@%治疗和护盾强度', 'silver', 'silver', 'defense', 'https://arammayhem.com/augments/First-Aid_Kit_mayhem_augment.webp'),
  ('闪闪现现', '获得第二个【闪现】召唤师技能和70召唤师技能急速', 'silver', 'silver', 'mobility', 'https://arammayhem.com/augments/Flash_2_mayhem_augment.webp'),
  ('闪光弹', 'Using Flash creates an explosion around the blink location that deals 70 to 240 (+ 70% AD) (+ 60% AP) magic damage…', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Flashbang_mayhem_augment.webp'),
  ('冰霜幽灵', '每@Cooldown@秒，自动施放@RootDuration@秒禁锢给附近的敌人们', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Frost_Wraith_mayhem_augment.webp'),
  ('渴血', '获得15%全能吸血', 'silver', 'silver', 'sustain', 'https://arammayhem.com/augments/Goredrink_mayhem_augment.webp'),
  ('恶趣味', '定身或缚地敌方英雄时回复10-150(基于等级)（+1.5%最大生命值）生命值', 'silver', 'silver', 'defense', 'https://arammayhem.com/augments/Guilty_Pleasure_mayhem_augment.webp'),
  ('帽上加帽', '头戴式装备和帽子提供15法术强度和8魔法抗性。 帽子饮品提供8法术强度和4魔法抗性', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Hat_on_a_Hat_mayhem_augment.webp'),
  ('重量级打击手', '你的攻击造成相当于你4%最大生命值的额外物理伤害', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Heavy_Hitter_mayhem_augment.webp'),
  ('海克斯科技龙魂', '周期性地使你的下一个伤害型技能或攻击触发一道闪电爆裂，连锁穿过敌人以造成伤害和减速', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Hextech_Soul_mayhem_augment.webp'),
  ('家园卫士', '获得100%移动速度，在受到伤害后失效3秒', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Homeguard_mayhem_augment.webp'),
  ('冰寒', '你的减速效果可使移动速度降低额外的100', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Ice_Cold_mayhem_augment.webp'),
  ('炼狱龙魂', '你获得炼狱龙魂，使用技能或攻击命中敌人时造成额外伤害', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Infernal_Soul_mayhem_augment.webp'),
  ('注魔', '攻击会消耗2.5%最大法力值，造成相当于3.5%最大法力值的魔法伤害，该伤害可以暴击', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Juiced_mayhem_augment.webp'),
  ('杀意翻涌', '朝着生命值低于40%的敌方英雄时获得100%移动速度', 'silver', 'silver', 'defense', 'https://arammayhem.com/augments/Kill_Secured_mayhem_augment.webp'),
  ('练腿日', '获得50移动速度和40%减速抗性', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Leg_Day_mayhem_augment.webp'),
  ('点亮他们！', '每第4次攻击造成额外44 – 320 (基于等级) (+ 140%额外AD) (+ 76% AP) 魔法伤害', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Light_&#x27;em_Up!_mayhem_augment.webp'),
  ('强力护盾', '当你获得护盾时，获得%i:miniAdaptiveForce%40-100(基于等级)适应之力，持续3秒。(5秒冷却时间)', 'silver', 'silver', 'defense', 'https://arammayhem.com/augments/Mighty_Shield_mayhem_augment.webp'),
  ('由心及物', '使你的最大生命值提升，数额相当于你一半的法力值', 'silver', 'silver', 'defense', 'https://arammayhem.com/augments/Mind_to_Matter_mayhem_augment.webp'),
  ('山脉龙魂', '你获得山脉龙魂，在脱离战斗之后获得一个持续一小段时间的护盾', 'silver', 'silver', 'defense', 'https://arammayhem.com/augments/MountainSoul_mayhem_augment.webp'),
  ('海洋龙魂', '获得【海洋龙魂】，在对敌方英雄造成伤害后提供高额的生命和法力回复', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Ocean_Soul_mayhem_augment.webp'),
  ('吵闹鬼', '获得【吵闹鬼】召唤师技能。 吵闹鬼会同时施放召唤师技能【屏障】和【幽灵疾步】', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Poltergeist_mayhem_augment.webp'),
  ('纯粹主义者 - 术师', '获得10%冷却减缩，你的所有攻速转换为技能急速每1%攻速转换为0.65技能急速', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Purist_-_Caster_mayhem_augment.webp'),
  ('退敌力场', '在你跌下@HealthThreshold2*100@%生命值时，附近的敌人们会被击退并对其施加持续1.5秒的90%减速', 'silver', 'silver', 'defense', 'https://arammayhem.com/augments/Repulsor_mayhem_augment.webp'),
  ('万用瞄准镜', '获得100攻击距离，如果你是远程英雄则降低至50攻击距离', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Scoped_Weapons_mayhem_augment.webp'),
  ('自我毁灭', '每25秒，会有一个炸弹附在你身上。在@BombDelay@秒后，它会爆炸，造成20%目标最大生命值的真实伤害并击飞附近的敌人们', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Self_Destruct_mayhem_augment.webp'),
  ('暗影疾奔', '在使用一个冲刺、跳跃、闪烁或传送类技能或离开潜行状态之后，获得持续3秒的100移动速度', 'silver', 'silver', 'mobility', 'https://arammayhem.com/augments/Shadow_Runner_mayhem_augment.webp'),
  ('扇巴掌', '每当你定身或缚地一个敌人时，获得一层可叠加的20 适应之力。阵亡时损失50%层数', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Slap_Around_mayhem_augment.webp'),
  ('天音爆', '在为你的友军提供增益效果、治疗效果或护盾效果时，会对其附近的敌人造成30 - 150(基于等级)真实伤害和持续2秒的30%减速', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Sonic_Boom_mayhem_augment.webp'),
  ('速度恶魔', '用技能伤害敌方英雄会获得350移动速度，在2秒内衰减', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Speed_Demon_mayhem_augment.webp'),
  ('转得我眩晕了', '将一个召唤师技能替换为骄行荡寇。 骄行荡寇发射一根钩爪，吸附在地形上，在此之后，你可以再次施放来绕着它摆荡。在摆荡状态下，自动攻击相距最近的那个敌人。在与一个敌方英雄碰撞或再次施放时结束摆荡', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Spin_Me_Right_Round_mayhem_augment.webp'),
  ('旋转至胜', '你的旋转类技能获得@SpinHaste@技能急速并且多造成@SpinDamageAmp*100@%伤害！', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Spin_To_Win_mayhem_augment.webp'),
  ('叠角龙', '在你获得一个技能的永久层数时，多获得75%！', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/StackosaurusRex_mayhem_augment.webp'),
  ('属性！', '获得3个属性锻造器', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Stats!_mayhem_augment.webp'),
  ('快中求稳', '在冲刺或闪烁后，获得持续2秒的65-290(基于等级)(+65% 额外AD)(+26% AP)护盾值。 (5秒冷却时间)', 'silver', 'silver', 'defense', 'https://arammayhem.com/augments/Swift_and_Safe_mayhem_augment.webp'),
  ('会心防御', '你可以使用你的暴击几率(最大50%几率)来进行会心防御，使你有一定几率来使所受伤害降低20%。获得25%暴击几率', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Tank_It_Or_Leave_It_mayhem_augment.webp'),
  ('残暴之力', '获得@AD@攻击力、@AbilityHaste@技能急速和@Lethality@穿甲', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/The_Brutalizer_mayhem_augment.webp'),
  ('折磨者', 'Immobilizing or grounding an enemy champion inflicts them with a Burn for 5 seconds, dealing magic damage equal…', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Tormentor_mayhem_augment.webp'),
  ('双生火焰', '技能会发射1-4个飞弹(基于暴击率)，每个飞弹造成10-30(基于等级)(+7%额外攻击力+7%法术强度)魔法伤害，获得15%暴击几率', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Twin_Fire_mayhem_augment.webp'),
  ('台风', '你的攻击会对一个额外目标发射一根弩箭，这个弩箭会造成削减过的伤害并施加命中', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Typhoon_mayhem_augment.webp'),
  ('终极不可阻挡', '在你使用你的终极技能后，你获得持续@UnstoppableDuration@秒的控制免疫。 (@Cooldown@秒冷却时间)', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Ultimate_Unstoppable_mayhem_augment.webp'),
  ('升级：收集者', '使用【收集者】的被动处决敌人时的处决阈值提升@ExecutionInc*100@%，并且提供额外@UpgradedGoldAmount@金币。 获得250金币', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Upgrade_Collector_mayhem_augment.webp'),
  ('升级：弯刀', '【幽魂弯刀】和【求生索】的冷却时间降低至@UpgradeCD@秒。主动效果激活时，获得@DamageAmp*100@%伤害增幅', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Upgrade_Cutlass_mayhem_augment.webp'),
  ('升级：献祭', '【璀璨回响】和【日炎圣盾】每当有目标受到【献祭】效果影响时，提供@GoldPerTick@ 金币 。获得250金币', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Upgrade_Immolate_mayhem_augment.webp'),
  ('升级：荆棘之甲', '脱离战斗20-5秒后，你的棘刺背心或者荆棘之甲会获得一个外壳，反弹50-250(+12%最大生命值)(+30%护甲)(+30%魔抗)伤害', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Upgrade_Thornmail_mayhem_augment.webp'),
  ('升级：中娅', '升级你的【探索者的护臂】、【沃格勒特的巫师帽】和【中娅沙漏】，使你能够在静滞效果期间移动，并在静滞期间获得50%额外移动速度。此外，【中娅沙漏】的静滞冷却时间降低至45秒', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Upgrade_Zhonya&#x27;s_mayhem_augment.webp'),
  ('负重爆气', '使用技能对敌方英雄造成伤害会为你提供持续6秒的爆气层数（最大：6）。 每层爆气可以使你的各个非终极技能的冷却时间转速加快2.5%，在6层时提升至5%', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Weighted_Popoffs_mayhem_augment.webp'),
  ('刃下生风', '从每1点固定护甲穿透和法术穿透中获得1.5移动速度。每拥有10%百分比护甲穿透和法术穿透，就获得@PercentPenConversion@移动速度', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Wind_Beneath_Blade_mayhem_augment.webp'),
  ('巫师式思考', '获得20-80(基于等级)法术强度', 'silver', 'silver', 'utility', 'https://arammayhem.com/augments/Witchful_Thinking_mayhem_augment.webp'),
  ('狂热者', 'Gain 35% (+ 5% per 100 AP) [b]bonus[/b] attack speed and 25% (+ 5% per 100 AP) critical strike chance. See win rate…', 'silver', 'silver', 'damage', 'https://arammayhem.com/augments/Zealot_mayhem_augment.webp');

-- ============================================================
-- FETTERS (9大羁绊)
-- ============================================================

INSERT INTO fetters (name, description) VALUES
  ('完全自动化', '完全自动化让海克斯大乱斗工厂真正成长的第一步。减少自动施法冷却时间。'),
  ('金币雨', '金币雨金钱主宰一切。击杀敌人后掉落金币，你和队友都可以拾取。'),
  ('叠角龙', '叠角龙获得层数时，额外获得更多层数。'),
  ('丧钟', '丧钟冲向死亡并使用强化符文造成真实伤害。减少死亡计时。'),
  ('神龙烈焰', '神龙烈焰飞弹很酷，更多飞弹更酷。烟火飞弹会额外弹跳至附近敌人并造成原始伤害的一部分。'),
  ('下雪天', '下雪天雪球嗖嗖嗖。为雪球强化符文获得技能急速和额外伤害。'),
  ('喂呜喂呜', '喂呜喂呜对生命值低于50%的友军获得额外效果。'),
  ('掷骰狂人', '掷骰狂人不出手必不中。小兵死亡时有几率掉落属性铁砧券。'),
  ('大法师', '大法师施放技能时，返还另一个随机技能的部分冷却时间。');

-- ============================================================
-- RUNE-FETTER MAPPINGS (符文→羁绊关联)
-- ============================================================

-- 完全自动化: 8个成员
DO $$
DECLARE
  v_fetter_id UUID;
  v_rune_id UUID;
BEGIN
  SELECT id INTO v_fetter_id FROM fetters WHERE name = '完全自动化';

  SELECT id INTO v_rune_id FROM runes WHERE name = '火狐';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '冰霜幽灵';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '自我毁灭';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '回力ok镖';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '咏叹奏鸣';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '神圣干预';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '量子计算';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '舞会女王';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

END $$;

-- 金币雨: 7个成员
DO $$
DECLARE
  v_fetter_id UUID;
  v_rune_id UUID;
BEGIN
  SELECT id INTO v_fetter_id FROM fetters WHERE name = '金币雨';

  SELECT id INTO v_rune_id FROM runes WHERE name = '升级：献祭';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '升级：收集者';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '有始有终';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '捐赠';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '红包';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '夺金';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '当心小蛋糕！';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

END $$;

-- 叠角龙: 7个成员
DO $$
DECLARE
  v_fetter_id UUID;
  v_rune_id UUID;
BEGIN
  SELECT id INTO v_fetter_id FROM fetters WHERE name = '叠角龙';

  SELECT id INTO v_rune_id FROM runes WHERE name = '任务：钢化你心';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '升级：狂妄';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '吞噬灵魂';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '超凡邪恶';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '物法皆修';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '踢踏舞';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '无限循环往复';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

END $$;

-- 丧钟: 4个成员
DO $$
DECLARE
  v_fetter_id UUID;
  v_rune_id UUID;
BEGIN
  SELECT id INTO v_fetter_id FROM fetters WHERE name = '丧钟';

  SELECT id INTO v_rune_id FROM runes WHERE name = '俯冲轰炸';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '自我毁灭';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '最终都市列车';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '小丑学院';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

END $$;

-- 神龙烈焰: 6个成员
DO $$
DECLARE
  v_fetter_id UUID;
  v_rune_id UUID;
BEGIN
  SELECT id INTO v_fetter_id FROM fetters WHERE name = '神龙烈焰';

  SELECT id INTO v_rune_id FROM runes WHERE name = '台风';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '点亮他们！';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '双生火焰';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '暴击飞弹';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '魔法飞弹';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '连拨击锤';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

END $$;

-- 下雪天: 5个成员
DO $$
DECLARE
  v_fetter_id UUID;
  v_rune_id UUID;
BEGIN
  SELECT id INTO v_fetter_id FROM fetters WHERE name = '下雪天';

  SELECT id INTO v_rune_id FROM runes WHERE name = '升级：雪球';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '雪球扭蛋机';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '弹球';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '史上最大雪球';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '神圣雪球';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

END $$;

-- 喂呜喂呜: 6个成员
DO $$
DECLARE
  v_fetter_id UUID;
  v_rune_id UUID;
BEGIN
  SELECT id INTO v_fetter_id FROM fetters WHERE name = '喂呜喂呜';

  SELECT id INTO v_rune_id FROM runes WHERE name = '急救用具';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '全心为你';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '会心治疗';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '咏叹奏鸣';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '风语者的祝福';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '小猫咪找妈妈';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

END $$;

-- 掷骰狂人: 6个成员
DO $$
DECLARE
  v_fetter_id UUID;
  v_rune_id UUID;
BEGIN
  SELECT id INTO v_fetter_id FROM fetters WHERE name = '掷骰狂人';

  SELECT id INTO v_rune_id FROM runes WHERE name = '质变：棱彩阶';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '质变：混沌';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '潘朵拉的盒子';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '属性！';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '属性叠属性！';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '属性叠属性叠属性！';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

END $$;

-- 大法师: 5个成员
DO $$
DECLARE
  v_fetter_id UUID;
  v_rune_id UUID;
BEGIN
  SELECT id INTO v_fetter_id FROM fetters WHERE name = '大法师';

  SELECT id INTO v_rune_id FROM runes WHERE name = '注魔';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '由心及物';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '霸符兄弟';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '海洋龙魂';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

  SELECT id INTO v_rune_id FROM runes WHERE name = '溢流';
  IF FOUND THEN INSERT INTO rune_fetters (rune_id, fetter_id) VALUES (v_rune_id, v_fetter_id) ON CONFLICT DO NOTHING; END IF;

END $$;

