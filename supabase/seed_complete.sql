-- ============================================================
-- 补齐18个缺失英雄
-- 来源: arammayhem.com
-- ============================================================

INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('炽炎雏龙', '炽炎雏龙', '射手', 'AD', '海克斯大乱斗B级英雄，胜率47.46%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('铁血狼母', '铁血狼母', '战士/刺客', 'AD', '海克斯大乱斗C级英雄，胜率49.89%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('双界灵兔', '双界灵兔', '刺客/法师', 'AP', '海克斯大乱斗A级英雄，胜率51.40%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('万花通灵', '万花通灵', '法师', 'AP', '海克斯大乱斗C级英雄，胜率46.63%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('不落魔锋', '不落魔锋', '战士/刺客', 'AD', '海克斯大乱斗B级英雄，胜率52.88%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('复仇之矛', '复仇之矛', '射手', 'AD', '海克斯大乱斗C级英雄，胜率52.81%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('铸星龙王', '铸星龙王', '法师', 'AP', '海克斯大乱斗S级英雄，胜率51.86%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('狂厄蔷薇', '狂厄蔷薇', '战士/刺客', 'AD', '海克斯大乱斗B级英雄，胜率51.72%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('德玛西亚皇子', '德玛西亚皇子', '坦克/战士', 'Tank', '海克斯大乱斗B级英雄，胜率48.03%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('含羞蓓蕾', '含羞蓓蕾', '法师', 'AP', '海克斯大乱斗?级英雄，胜率58.78%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('虚空先知', '虚空先知', '法师', 'AP', '海克斯大乱斗S级英雄，胜率53.60%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('流光镜影', '流光镜影', '辅助/法师', 'Support', '海克斯大乱斗B级英雄，胜率48.18%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('百裂冥犬', '百裂冥犬', '战士/刺客', 'AD', '海克斯大乱斗C级英雄，胜率47.30%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('不破之誓', '不破之誓', '战士/刺客', 'AD', '海克斯大乱斗A级英雄，胜率52.15%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('虚空女皇', '虚空女皇', '战士/刺客', 'AD', '海克斯大乱斗C级英雄，胜率45.85%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('异画师', '异画师', '法师', 'AP', '海克斯大乱斗A级英雄，胜率54.12%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('铁铠冥魂', '铁铠冥魂', '坦克/战士', 'Tank', '海克斯大乱斗C级英雄，胜率47.26%') ON CONFLICT (name) DO NOTHING;
INSERT INTO heroes (name, title, role, attack_type, description) VALUES ('迅捷斥候', '迅捷斥候', '射手', 'AD', '海克斯大乱斗B级英雄，胜率48.89%') ON CONFLICT (name) DO NOTHING;
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

-- PLAYSTYLES & RECOMMENDATIONS (arammayhem.com combos, no phase)
TRUNCATE hero_playstyles CASCADE;
TRUNCATE hero_rune_recommendations CASCADE;

INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='萨科'), '裁决使+小丑学院+回归基本功流', '裁决使、小丑学院、回归基本功、量子计算、唯快不破');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='萨科'), '吸血习性+仆从大师+一板一眼流', '吸血习性、仆从大师、一板一眼、魄罗爆破手');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='萨科'), (SELECT id FROM runes WHERE name='裁决使'), (SELECT id FROM hero_playstyles WHERE name='裁决使+小丑学院+回归基本功流' AND hero_id=(SELECT id FROM heroes WHERE name='萨科')), null, 95, '击杀刷新全部基础技能，可无痛收割后排，但需要注意对于在Q持续时间内，对于普攻可秒杀的敌人需要先释放其他技能，否则Q冷却时间不刷新', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='萨科'), (SELECT id FROM runes WHERE name='小丑学院'), (SELECT id FROM hero_playstyles WHERE name='裁决使+小丑学院+回归基本功流' AND hero_id=(SELECT id FROM heroes WHERE name='萨科')), null, 95, '小丑最强海克斯，增加机动性的同时，附带的背刺伤害可以与本身的背刺伤害叠加，造成超高爆发，双Q基本可以一刀秒杀后排，死亡时还能造成巨量真实伤害，不管是前期拿人头还是后期打前排都非常实用', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='萨科'), (SELECT id FROM runes WHERE name='回归基本功'), (SELECT id FROM hero_playstyles WHERE name='裁决使+小丑学院+回归基本功流' AND hero_id=(SELECT id FROM heroes WHERE name='萨科')), null, 80, '提升可观的伤害和冷却缩减，但丢失一定保命措施，可通过夜狩，裁决使，罪恶快感，逃跑计划等海克斯来弥补', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='萨科'), (SELECT id FROM runes WHERE name='量子计算'), (SELECT id FROM hero_playstyles WHERE name='裁决使+小丑学院+回归基本功流' AND hero_id=(SELECT id FROM heroes WHERE name='萨科')), null, 80, '通过Q技能可最大化量子计算伤害，在前期可以帮助队伍打出相当大的优势，也可以弥补后期打不动肉的问题', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='萨科'), (SELECT id FROM runes WHERE name='唯快不破'), (SELECT id FROM hero_playstyles WHERE name='裁决使+小丑学院+回归基本功流' AND hero_id=(SELECT id FROM heroes WHERE name='萨科')), null, 80, '在E技能未使用的情况下，普攻可以对敌方造成减速，Q➕背刺的第一刀同样可以触发，提升相当可观的伤害，还可以发配暗影疾奔，刃下生风等海克斯形成组合', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='萨科'), (SELECT id FROM runes WHERE name='吸血习性'), (SELECT id FROM hero_playstyles WHERE name='吸血习性+仆从大师+一板一眼流' AND hero_id=(SELECT id FROM heroes WHERE name='萨科')), null, 80, '…', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='萨科'), (SELECT id FROM runes WHERE name='仆从大师'), (SELECT id FROM hero_playstyles WHERE name='吸血习性+仆从大师+一板一眼流' AND hero_id=(SELECT id FROM heroes WHERE name='萨科')), null, 65, '开R后分身巨大，一眼分辨', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='萨科'), (SELECT id FROM runes WHERE name='一板一眼'), (SELECT id FROM hero_playstyles WHERE name='吸血习性+仆从大师+一板一眼流' AND hero_id=(SELECT id FROM heroes WHERE name='萨科')), null, 50, '小丑本身没有攻速加成技能以及适配的攻速装备，增加的攻击力有限，同时使普攻前摇时间变长，使手感变得非常难受', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='萨科'), (SELECT id FROM runes WHERE name='魄罗爆破手'), (SELECT id FROM hero_playstyles WHERE name='吸血习性+仆从大师+一板一眼流' AND hero_id=(SELECT id FROM heroes WHERE name='萨科')), null, 50, '潜行英雄不适合魄罗爆破手：魄罗会暴露你的位置。', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='瑞兹'), '物理转魔法+由心及物+歌利亚巨人流', '物理转魔法、由心及物、歌利亚巨人、科学狂人');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='瑞兹'), '任务：沃格勒特的巫师帽+溢流+坦克引擎流', '任务：沃格勒特的巫师帽、溢流、坦克引擎、终极刷新');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑞兹'), (SELECT id FROM runes WHERE name='物理转魔法'), (SELECT id FROM hero_playstyles WHERE name='物理转魔法+由心及物+歌利亚巨人流' AND hero_id=(SELECT id FROM heroes WHERE name='瑞兹')), null, 95, '登神长阶', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑞兹'), (SELECT id FROM runes WHERE name='由心及物'), (SELECT id FROM hero_playstyles WHERE name='物理转魔法+由心及物+歌利亚巨人流' AND hero_id=(SELECT id FROM heroes WHERE name='瑞兹')), null, 95, '登神长阶', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑞兹'), (SELECT id FROM runes WHERE name='歌利亚巨人'), (SELECT id FROM hero_playstyles WHERE name='物理转魔法+由心及物+歌利亚巨人流' AND hero_id=(SELECT id FROM heroes WHERE name='瑞兹')), null, 95, '登神长阶', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑞兹'), (SELECT id FROM runes WHERE name='科学狂人'), (SELECT id FROM hero_playstyles WHERE name='物理转魔法+由心及物+歌利亚巨人流' AND hero_id=(SELECT id FROM heroes WHERE name='瑞兹')), null, 95, '登神长阶（变大）', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑞兹'), (SELECT id FROM runes WHERE name='任务：沃格勒特的巫师帽'), (SELECT id FROM hero_playstyles WHERE name='任务：沃格勒特的巫师帽+溢流+坦克引擎流' AND hero_id=(SELECT id FROM heroes WHERE name='瑞兹')), null, 95, '登神的另一种方案', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑞兹'), (SELECT id FROM runes WHERE name='溢流'), (SELECT id FROM hero_playstyles WHERE name='任务：沃格勒特的巫师帽+溢流+坦克引擎流' AND hero_id=(SELECT id FROM heroes WHERE name='瑞兹')), null, 95, '瑞兹溢流伤害懂的都懂', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑞兹'), (SELECT id FROM runes WHERE name='坦克引擎'), (SELECT id FROM hero_playstyles WHERE name='任务：沃格勒特的巫师帽+溢流+坦克引擎流' AND hero_id=(SELECT id FROM heroes WHERE name='瑞兹')), null, 80, '登神长阶（平替）', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑞兹'), (SELECT id FROM runes WHERE name='终极刷新'), (SELECT id FROM hero_playstyles WHERE name='任务：沃格勒特的巫师帽+溢流+坦克引擎流' AND hero_id=(SELECT id FROM heroes WHERE name='瑞兹')), null, 50, '连放两个R能够瞬间传送', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='盖伦'), '一板一眼+利刃华尔兹+吸血习性流', '一板一眼、利刃华尔兹、吸血习性');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='盖伦'), '灵巧+闪电打击+珠光护手流', '灵巧、闪电打击、珠光护手');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='盖伦'), (SELECT id FROM runes WHERE name='一板一眼'), (SELECT id FROM hero_playstyles WHERE name='一板一眼+利刃华尔兹+吸血习性流' AND hero_id=(SELECT id FROM heroes WHERE name='盖伦')), null, 95, '锁攻速，但E圈数不受影响', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='盖伦'), (SELECT id FROM runes WHERE name='利刃华尔兹'), (SELECT id FROM hero_playstyles WHERE name='一板一眼+利刃华尔兹+吸血习性流' AND hero_id=(SELECT id FROM heroes WHERE name='盖伦')), null, 80, '开E时可使用利刃华尔兹', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='盖伦'), (SELECT id FROM runes WHERE name='吸血习性'), (SELECT id FROM hero_playstyles WHERE name='一板一眼+利刃华尔兹+吸血习性流' AND hero_id=(SELECT id FROM heroes WHERE name='盖伦')), null, 50, '被动不再回血，慎选！', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='盖伦'), (SELECT id FROM runes WHERE name='灵巧'), (SELECT id FROM hero_playstyles WHERE name='灵巧+闪电打击+珠光护手流' AND hero_id=(SELECT id FROM heroes WHERE name='盖伦')), null, 50, 'E圈数不受该符文影响', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='盖伦'), (SELECT id FROM runes WHERE name='闪电打击'), (SELECT id FROM hero_playstyles WHERE name='灵巧+闪电打击+珠光护手流' AND hero_id=(SELECT id FROM heroes WHERE name='盖伦')), null, 50, 'E圈数不受该符文影响', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='盖伦'), (SELECT id FROM runes WHERE name='珠光护手'), (SELECT id FROM hero_playstyles WHERE name='灵巧+闪电打击+珠光护手流' AND hero_id=(SELECT id FROM heroes WHERE name='盖伦')), null, 50, 'e技能不会触发暴击', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='卡特琳娜'), '一板一眼+易损+虚幻武器流', '一板一眼、易损、虚幻武器');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='卡特琳娜'), '物法皆修+灵巧+闪电打击流', '物法皆修、灵巧、闪电打击');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卡特琳娜'), (SELECT id FROM runes WHERE name='一板一眼'), (SELECT id FROM hero_playstyles WHERE name='一板一眼+易损+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='卡特琳娜')), null, 95, '锁攻速不影响R的攻速加成', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卡特琳娜'), (SELECT id FROM runes WHERE name='易损'), (SELECT id FROM hero_playstyles WHERE name='一板一眼+易损+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='卡特琳娜')), null, 95, 'R可吃易损', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卡特琳娜'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='一板一眼+易损+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='卡特琳娜')), null, 95, 'R正常只吃25/30/35%的特效伤害，拿到之后变50/60/70%', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卡特琳娜'), (SELECT id FROM runes WHERE name='物法皆修'), (SELECT id FROM hero_playstyles WHERE name='物法皆修+灵巧+闪电打击流' AND hero_id=(SELECT id FROM heroes WHERE name='卡特琳娜')), null, 80, 'R每下都可叠加物法皆修，有法转物就是神', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卡特琳娜'), (SELECT id FROM runes WHERE name='灵巧'), (SELECT id FROM hero_playstyles WHERE name='物法皆修+灵巧+闪电打击流' AND hero_id=(SELECT id FROM heroes WHERE name='卡特琳娜')), null, 80, '灵巧提供的攻速正常影响R', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卡特琳娜'), (SELECT id FROM runes WHERE name='闪电打击'), (SELECT id FROM hero_playstyles WHERE name='物法皆修+灵巧+闪电打击流' AND hero_id=(SELECT id FROM heroes WHERE name='卡特琳娜')), null, 50, '闪电打击提供的攻速不影响R', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='凯尔'), '虚幻武器+魔法飞弹+神射法师流', '虚幻武器、魔法飞弹、神射法师');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='凯尔'), '炼狱导管+亮出你的剑流', '炼狱导管、亮出你的剑');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='凯尔'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+魔法飞弹+神射法师流' AND hero_id=(SELECT id FROM heroes WHERE name='凯尔')), null, 95, '平A焰浪可触发虚幻武器', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='凯尔'), (SELECT id FROM runes WHERE name='魔法飞弹'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+魔法飞弹+神射法师流' AND hero_id=(SELECT id FROM heroes WHERE name='凯尔')), null, 95, '被动焰浪也会触发魔法飞弹，十六级后化身大肉克星。', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='凯尔'), (SELECT id FROM runes WHERE name='神射法师'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+魔法飞弹+神射法师流' AND hero_id=(SELECT id FROM heroes WHERE name='凯尔')), null, 80, '神射法师对 AP 普攻型凯尔收益稳定，持续输出明显提升。', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='凯尔'), (SELECT id FROM runes WHERE name='炼狱导管'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+亮出你的剑流' AND hero_id=(SELECT id FROM heroes WHERE name='凯尔')), null, 65, '平A焰浪可触发炼狱导管', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='凯尔'), (SELECT id FROM runes WHERE name='亮出你的剑'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+亮出你的剑流' AND hero_id=(SELECT id FROM heroes WHERE name='凯尔')), null, 50, '选完亮剑E也会变成近战距离', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='莎弥拉'), '利刃华尔兹+小丑学院+亮出你的剑流', '利刃华尔兹、小丑学院、亮出你的剑');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='莎弥拉'), '虚幻武器+易损流', '虚幻武器、易损');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='莎弥拉'), (SELECT id FROM runes WHERE name='利刃华尔兹'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹+小丑学院+亮出你的剑流' AND hero_id=(SELECT id FROM heroes WHERE name='莎弥拉')), null, 95, '大招期间可施放利刃华尔兹', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='莎弥拉'), (SELECT id FROM runes WHERE name='小丑学院'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹+小丑学院+亮出你的剑流' AND hero_id=(SELECT id FROM heroes WHERE name='莎弥拉')), null, 95, '开大隐身可打满伤害', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='莎弥拉'), (SELECT id FROM runes WHERE name='亮出你的剑'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹+小丑学院+亮出你的剑流' AND hero_id=(SELECT id FROM heroes WHERE name='莎弥拉')), null, 95, '强度爆炸 不缺伤害早出饮血和死亡之舞增加容错', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='莎弥拉'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+易损流' AND hero_id=(SELECT id FROM heroes WHERE name='莎弥拉')), null, 95, 'qea直接满被动', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='莎弥拉'), (SELECT id FROM runes WHERE name='易损'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+易损流' AND hero_id=(SELECT id FROM heroes WHERE name='莎弥拉')), null, 50, 'R不触发易损', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='阿兹尔'), '魔法飞弹+神射法师流', '魔法飞弹、神射法师');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='阿兹尔'), '仆从大师+最万用的瞄准镜流', '仆从大师、最万用的瞄准镜');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='阿兹尔'), (SELECT id FROM runes WHERE name='魔法飞弹'), (SELECT id FROM hero_playstyles WHERE name='魔法飞弹+神射法师流' AND hero_id=(SELECT id FROM heroes WHERE name='阿兹尔')), null, 95, 'W每次戳刺，被动塔攻击均可触发', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='阿兹尔'), (SELECT id FROM runes WHERE name='神射法师'), (SELECT id FROM hero_playstyles WHERE name='魔法飞弹+神射法师流' AND hero_id=(SELECT id FROM heroes WHERE name='阿兹尔')), null, 95, '沙兵可附带50%额外伤害，物理+魔法伤害爆炸', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='阿兹尔'), (SELECT id FROM runes WHERE name='仆从大师'), (SELECT id FROM hero_playstyles WHERE name='仆从大师+最万用的瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='阿兹尔')), null, 50, '只增加W体型，不增加伤害', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='阿兹尔'), (SELECT id FROM runes WHERE name='最万用的瞄准镜'), (SELECT id FROM hero_playstyles WHERE name='仆从大师+最万用的瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='阿兹尔')), null, 50, '不增加沙兵的攻击距离、操控距离', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='费德提克'), '利刃华尔兹+小丑学院流', '利刃华尔兹、小丑学院');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='费德提克'), '升级：中娅+点亮他们！流', '升级：中娅、点亮他们！');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='费德提克'), (SELECT id FROM runes WHERE name='利刃华尔兹'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹+小丑学院流' AND hero_id=(SELECT id FROM heroes WHERE name='费德提克')), null, 95, '大招进去烫', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='费德提克'), (SELECT id FROM runes WHERE name='小丑学院'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹+小丑学院流' AND hero_id=(SELECT id FROM heroes WHERE name='费德提克')), null, 80, 'R落地后隐身烫', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='费德提克'), (SELECT id FROM runes WHERE name='升级：中娅'), (SELECT id FROM hero_playstyles WHERE name='升级：中娅+点亮他们！流' AND hero_id=(SELECT id FROM heroes WHERE name='费德提克')), null, 80, '大招期间可中亚移动', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='费德提克'), (SELECT id FROM runes WHERE name='点亮他们！'), (SELECT id FROM hero_playstyles WHERE name='升级：中娅+点亮他们！流' AND hero_id=(SELECT id FROM heroes WHERE name='费德提克')), null, 50, '由于自然回血也会触发该符文，会持续处于战斗状态，无法触发恐惧', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='卡尔萨斯'), '小丑学院+终极刷新流', '小丑学院、终极刷新');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='卡尔萨斯'), '无限循环往复+尤里卡流', '无限循环往复、尤里卡');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卡尔萨斯'), (SELECT id FROM runes WHERE name='小丑学院'), (SELECT id FROM hero_playstyles WHERE name='小丑学院+终极刷新流' AND hero_id=(SELECT id FROM heroes WHERE name='卡尔萨斯')), null, 95, '可以开e再开小丑学院过去烧对方，阵亡后的恐惧盒子还可以把人多困在e里', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卡尔萨斯'), (SELECT id FROM runes WHERE name='终极刷新'), (SELECT id FROM hero_playstyles WHERE name='小丑学院+终极刷新流' AND hero_id=(SELECT id FROM heroes WHERE name='卡尔萨斯')), null, 95, '卡尔萨斯拿到终极刷新后团战压制力极强，几乎每波都能稳定双大。', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卡尔萨斯'), (SELECT id FROM runes WHERE name='无限循环往复'), (SELECT id FROM hero_playstyles WHERE name='无限循环往复+尤里卡流' AND hero_id=(SELECT id FROM heroes WHERE name='卡尔萨斯')), null, 95, '无限循环往复让卡尔萨斯大招循环更离谱，持续压低全队血线。', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卡尔萨斯'), (SELECT id FROM runes WHERE name='尤里卡'), (SELECT id FROM hero_playstyles WHERE name='无限循环往复+尤里卡流' AND hero_id=(SELECT id FROM heroes WHERE name='卡尔萨斯')), null, 80, '尤里卡同样能大幅提升卡尔萨斯大招频率，滚雪球能力很强。', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='塞纳'), '双刀流+叠角龙流', '双刀流、叠角龙');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='塞纳'), '虚幻武器+亮出你的剑流', '虚幻武器、亮出你的剑');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='塞纳'), (SELECT id FROM runes WHERE name='双刀流'), (SELECT id FROM hero_playstyles WHERE name='双刀流+叠角龙流' AND hero_id=(SELECT id FROM heroes WHERE name='塞纳')), null, 95, 'A一下即可叠一层被动', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='塞纳'), (SELECT id FROM runes WHERE name='叠角龙'), (SELECT id FROM hero_playstyles WHERE name='双刀流+叠角龙流' AND hero_id=(SELECT id FROM heroes WHERE name='塞纳')), null, 95, '有则必选，被动飞速提升。', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='塞纳'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+亮出你的剑流' AND hero_id=(SELECT id FROM heroes WHERE name='塞纳')), null, 80, 'Q，W命中敌人即可提取灵魂', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='塞纳'), (SELECT id FROM runes WHERE name='亮出你的剑'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+亮出你的剑流' AND hero_id=(SELECT id FROM heroes WHERE name='塞纳')), null, 80, '随着被动的提升，攻击距离逐渐增长。', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='瑟提'), '小丑学院+珠光护手流', '小丑学院、珠光护手');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='瑟提'), '回归基本功+量子计算流', '回归基本功、量子计算');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑟提'), (SELECT id FROM runes WHERE name='小丑学院'), (SELECT id FROM hero_playstyles WHERE name='小丑学院+珠光护手流' AND hero_id=(SELECT id FROM heroes WHERE name='瑟提')), null, 95, '隐身进场一拳一个脆皮', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑟提'), (SELECT id FROM runes WHERE name='珠光护手'), (SELECT id FROM hero_playstyles WHERE name='小丑学院+珠光护手流' AND hero_id=(SELECT id FROM heroes WHERE name='瑟提')), null, 95, '穿甲大招流腕豪必备，对面肉坦就是你最强的武器。', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑟提'), (SELECT id FROM runes WHERE name='回归基本功'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+量子计算流' AND hero_id=(SELECT id FROM heroes WHERE name='瑟提')), null, 95, '钢局必拿，增幅恐怖', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑟提'), (SELECT id FROM runes WHERE name='量子计算'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+量子计算流' AND hero_id=(SELECT id FROM heroes WHERE name='瑟提')), null, 80, '大招期间触发量子计算可使该目标吃到4倍内圈伤害', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='塞拉斯'), '全凭身法+神射法师流', '全凭身法、神射法师');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='塞拉斯'), '终极唤醒+最终形态流', '终极唤醒、最终形态');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='塞拉斯'), (SELECT id FROM runes WHERE name='全凭身法'), (SELECT id FROM hero_playstyles WHERE name='全凭身法+神射法师流' AND hero_id=(SELECT id FROM heroes WHERE name='塞拉斯')), null, 95, 'WE可吃加成，若能偷到一个位移类大招再选符文，R后续也可吃到加成', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='塞拉斯'), (SELECT id FROM runes WHERE name='神射法师'), (SELECT id FROM hero_playstyles WHERE name='全凭身法+神射法师流' AND hero_id=(SELECT id FROM heroes WHERE name='塞拉斯')), null, 95, '在被动范围内的单位越多，主目标受到的额外伤害越高', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='塞拉斯'), (SELECT id FROM runes WHERE name='终极唤醒'), (SELECT id FROM hero_playstyles WHERE name='终极唤醒+最终形态流' AND hero_id=(SELECT id FROM heroes WHERE name='塞拉斯')), null, 95, 'R偷可触发，再施放偷来的R可再次触发', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='塞拉斯'), (SELECT id FROM runes WHERE name='最终形态'), (SELECT id FROM hero_playstyles WHERE name='终极唤醒+最终形态流' AND hero_id=(SELECT id FROM heroes WHERE name='塞拉斯')), null, 80, '同理', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='图奇'), '精怪魔法+神射法师流', '精怪魔法、神射法师');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='图奇'), '炼狱导管+虚幻武器流', '炼狱导管、虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='图奇'), (SELECT id FROM runes WHERE name='精怪魔法'), (SELECT id FROM hero_playstyles WHERE name='精怪魔法+神射法师流' AND hero_id=(SELECT id FROM heroes WHERE name='图奇')), null, 95, '开大a人也会变羊，还手都不行', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='图奇'), (SELECT id FROM runes WHERE name='神射法师'), (SELECT id FROM hero_playstyles WHERE name='精怪魔法+神射法师流' AND hero_id=(SELECT id FROM heroes WHERE name='图奇')), null, 80, 'AP 老鼠拿神射法师很稳，持续输出与收割能力同步提升。', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='图奇'), (SELECT id FROM runes WHERE name='炼狱导管'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='图奇')), null, 50, '仅有E可叠，被动不施加层数', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='图奇'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='图奇')), null, 50, '被动不触发虚幻武器，E不会叠加被动，勿选', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='薇恩'), '双刀流+连拨击锤流', '双刀流、连拨击锤');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='薇恩'), '接二连三+虚幻武器流', '接二连三、虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='薇恩'), (SELECT id FROM runes WHERE name='双刀流'), (SELECT id FROM hero_playstyles WHERE name='双刀流+连拨击锤流' AND hero_id=(SELECT id FROM heroes WHERE name='薇恩')), null, 95, '快速三环', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='薇恩'), (SELECT id FROM runes WHERE name='连拨击锤'), (SELECT id FROM hero_playstyles WHERE name='双刀流+连拨击锤流' AND hero_id=(SELECT id FROM heroes WHERE name='薇恩')), null, 95, '每一发弩箭都可以触发W和攻击特效', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='薇恩'), (SELECT id FROM runes WHERE name='接二连三'), (SELECT id FROM hero_playstyles WHERE name='接二连三+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='薇恩')), null, 95, '触发可叠加W', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='薇恩'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='接二连三+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='薇恩')), null, 65, 'QE可叠加W，出黄昏与黎明后单Q即可打出三环', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='布隆'), '连拨击锤+利刃华尔兹+台风流', '连拨击锤、利刃华尔兹、台风');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='布隆'), (SELECT id FROM runes WHERE name='连拨击锤'), (SELECT id FROM hero_playstyles WHERE name='连拨击锤+利刃华尔兹+台风流' AND hero_id=(SELECT id FROM heroes WHERE name='布隆')), null, 80, 'A一下直接满被动眩晕', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='布隆'), (SELECT id FROM runes WHERE name='利刃华尔兹'), (SELECT id FROM hero_playstyles WHERE name='连拨击锤+利刃华尔兹+台风流' AND hero_id=(SELECT id FROM heroes WHERE name='布隆')), null, 80, '每一下都能叠一次被动，搭配台风或者飓风可以同时打出多个被动，相当于团控', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='布隆'), (SELECT id FROM runes WHERE name='台风'), (SELECT id FROM hero_playstyles WHERE name='连拨击锤+利刃华尔兹+台风流' AND hero_id=(SELECT id FROM heroes WHERE name='布隆')), null, 65, 'A兵给英雄叠被动', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='德莱厄斯'), '台风+连拨击锤+利刃华尔兹流', '台风、连拨击锤、利刃华尔兹');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='德莱厄斯'), (SELECT id FROM runes WHERE name='台风'), (SELECT id FROM hero_playstyles WHERE name='台风+连拨击锤+利刃华尔兹流' AND hero_id=(SELECT id FROM heroes WHERE name='德莱厄斯')), null, 65, '台风可以给敌方英雄叠加出血', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='德莱厄斯'), (SELECT id FROM runes WHERE name='连拨击锤'), (SELECT id FROM hero_playstyles WHERE name='台风+连拨击锤+利刃华尔兹流' AND hero_id=(SELECT id FROM heroes WHERE name='德莱厄斯')), null, 50, '无法叠加出血效果', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='德莱厄斯'), (SELECT id FROM runes WHERE name='利刃华尔兹'), (SELECT id FROM hero_playstyles WHERE name='台风+连拨击锤+利刃华尔兹流' AND hero_id=(SELECT id FROM heroes WHERE name='德莱厄斯')), null, 50, '无法叠加出血效果', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='蒙多'), '重量级打击手+吸血习性+蛋白粉奶昔流', '重量级打击手、吸血习性、蛋白粉奶昔');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='蒙多'), (SELECT id FROM runes WHERE name='重量级打击手'), (SELECT id FROM hero_playstyles WHERE name='重量级打击手+吸血习性+蛋白粉奶昔流' AND hero_id=(SELECT id FROM heroes WHERE name='蒙多')), null, 80, '一巴掌一个小朋友，但大招的回复无法暴击', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='蒙多'), (SELECT id FROM runes WHERE name='吸血习性'), (SELECT id FROM hero_playstyles WHERE name='重量级打击手+吸血习性+蛋白粉奶昔流' AND hero_id=(SELECT id FROM heroes WHERE name='蒙多')), null, 50, '选了之后大招不回血', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='蒙多'), (SELECT id FROM runes WHERE name='蛋白粉奶昔'), (SELECT id FROM hero_playstyles WHERE name='重量级打击手+吸血习性+蛋白粉奶昔流' AND hero_id=(SELECT id FROM heroes WHERE name='蒙多')), null, 50, '大招吃不到蛋白粉', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='菲兹'), '炼狱导管+全凭身法+连拨击锤流', '炼狱导管、全凭身法、连拨击锤');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='菲兹'), (SELECT id FROM runes WHERE name='炼狱导管'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+全凭身法+连拨击锤流' AND hero_id=(SELECT id FROM heroes WHERE name='菲兹')), null, 95, 'W被动灼烧可叠加多层炼狱导管', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='菲兹'), (SELECT id FROM runes WHERE name='全凭身法'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+全凭身法+连拨击锤流' AND hero_id=(SELECT id FROM heroes WHERE name='菲兹')), null, 95, 'Q和E都可以减CD', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='菲兹'), (SELECT id FROM runes WHERE name='连拨击锤'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+全凭身法+连拨击锤流' AND hero_id=(SELECT id FROM heroes WHERE name='菲兹')), null, 95, '连拨击锤目前会全额触发W主动的额外伤害，且小鱼人非常容易变换方向进行平A', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='普朗克'), '回归基本功+唯快不破+虚幻武器流', '回归基本功、唯快不破、虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='普朗克'), (SELECT id FROM runes WHERE name='回归基本功'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+唯快不破+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='普朗克')), null, 95, '每一个连桶增加35%伤害，指数增长怕不怕', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='普朗克'), (SELECT id FROM runes WHERE name='唯快不破'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+唯快不破+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='普朗克')), null, 95, '桶的移速为0，直接增幅33%+伤害', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='普朗克'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+唯快不破+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='普朗克')), null, 80, '全自动火刀，熟练度不够的可以玩玩', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='格雷福斯'), '回归基本功+一板一眼+亮出你的剑流', '回归基本功、一板一眼、亮出你的剑');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='格雷福斯'), (SELECT id FROM runes WHERE name='回归基本功'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+一板一眼+亮出你的剑流' AND hero_id=(SELECT id FROM heroes WHERE name='格雷福斯')), null, 95, '男枪普通攻击可吃到回归基本功加成', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='格雷福斯'), (SELECT id FROM runes WHERE name='一板一眼'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+一板一眼+亮出你的剑流' AND hero_id=(SELECT id FROM heroes WHERE name='格雷福斯')), null, 95, 'A得又快伤害又高', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='格雷福斯'), (SELECT id FROM runes WHERE name='亮出你的剑'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+一板一眼+亮出你的剑流' AND hero_id=(SELECT id FROM heroes WHERE name='格雷福斯')), null, 95, '拿到就是爽局，一枪一个小朋友', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='赫卡里姆'), '终极唤醒+虚幻武器+古式佳酿流', '终极唤醒、虚幻武器、古式佳酿');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='赫卡里姆'), (SELECT id FROM runes WHERE name='终极唤醒'), (SELECT id FROM hero_playstyles WHERE name='终极唤醒+虚幻武器+古式佳酿流' AND hero_id=(SELECT id FROM heroes WHERE name='赫卡里姆')), null, 95, '开大=无敌', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='赫卡里姆'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='终极唤醒+虚幻武器+古式佳酿流' AND hero_id=(SELECT id FROM heroes WHERE name='赫卡里姆')), null, 95, '搭配秘书冲拳无限Q', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='赫卡里姆'), (SELECT id FROM runes WHERE name='古式佳酿'), (SELECT id FROM hero_playstyles WHERE name='终极唤醒+虚幻武器+古式佳酿流' AND hero_id=(SELECT id FROM heroes WHERE name='赫卡里姆')), null, 95, '技能cd起来无限回血无敌', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='俄洛伊'), '利刃华尔兹+虚幻武器+玻璃大炮流', '利刃华尔兹、虚幻武器、玻璃大炮');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='俄洛伊'), (SELECT id FROM runes WHERE name='利刃华尔兹'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹+虚幻武器+玻璃大炮流' AND hero_id=(SELECT id FROM heroes WHERE name='俄洛伊')), null, 95, '开启W后再开始利刃华尔兹，可触发8次w触手攻击特效', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='俄洛伊'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹+虚幻武器+玻璃大炮流' AND hero_id=(SELECT id FROM heroes WHERE name='俄洛伊')), null, 80, '开启W用QR砸到人或拉出魂，W持续期间触手会无限打人', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='俄洛伊'), (SELECT id FROM runes WHERE name='玻璃大炮'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹+虚幻武器+玻璃大炮流' AND hero_id=(SELECT id FROM heroes WHERE name='俄洛伊')), null, 80, '拉出灵魂后，攻击灵魂会使本体受到两次增伤效果', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='莫甘娜'), '裁决使+老练狙神+炼狱导管流', '裁决使、老练狙神、炼狱导管');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='莫甘娜'), (SELECT id FROM runes WHERE name='裁决使'), (SELECT id FROM hero_playstyles WHERE name='裁决使+老练狙神+炼狱导管流' AND hero_id=(SELECT id FROM heroes WHERE name='莫甘娜')), null, 95, '出必拿，死一个控一个！用了才知道。', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='莫甘娜'), (SELECT id FROM runes WHERE name='老练狙神'), (SELECT id FROM hero_playstyles WHERE name='裁决使+老练狙神+炼狱导管流' AND hero_id=(SELECT id FROM heroes WHERE name='莫甘娜')), null, 80, '敌方在范围外踩中W即可减少CD', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='莫甘娜'), (SELECT id FROM runes WHERE name='炼狱导管'), (SELECT id FROM hero_playstyles WHERE name='裁决使+老练狙神+炼狱导管流' AND hero_id=(SELECT id FROM heroes WHERE name='莫甘娜')), null, 80, '控到一群或者放w技能极速很快', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='雷克塞'), '最万用的瞄准镜+更万用的瞄准镜+万用瞄准镜流', '最万用的瞄准镜、更万用的瞄准镜、万用瞄准镜');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='雷克塞'), (SELECT id FROM runes WHERE name='最万用的瞄准镜'), (SELECT id FROM hero_playstyles WHERE name='最万用的瞄准镜+更万用的瞄准镜+万用瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='雷克塞')), null, 65, '右键点人可超远击飞', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='雷克塞'), (SELECT id FROM runes WHERE name='更万用的瞄准镜'), (SELECT id FROM hero_playstyles WHERE name='最万用的瞄准镜+更万用的瞄准镜+万用瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='雷克塞')), null, 65, '右键点人可超远击飞', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='雷克塞'), (SELECT id FROM runes WHERE name='万用瞄准镜'), (SELECT id FROM hero_playstyles WHERE name='最万用的瞄准镜+更万用的瞄准镜+万用瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='雷克塞')), null, 65, '右键点人可超远击飞', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='雷恩加尔'), '最万用的瞄准镜+更万用的瞄准镜+万用瞄准镜流', '最万用的瞄准镜、更万用的瞄准镜、万用瞄准镜');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='雷恩加尔'), (SELECT id FROM runes WHERE name='最万用的瞄准镜'), (SELECT id FROM hero_playstyles WHERE name='最万用的瞄准镜+更万用的瞄准镜+万用瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='雷恩加尔')), null, 95, '可增加被动跳跃距离', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='雷恩加尔'), (SELECT id FROM runes WHERE name='更万用的瞄准镜'), (SELECT id FROM hero_playstyles WHERE name='最万用的瞄准镜+更万用的瞄准镜+万用瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='雷恩加尔')), null, 95, '可增加被动跳跃距离', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='雷恩加尔'), (SELECT id FROM runes WHERE name='万用瞄准镜'), (SELECT id FROM hero_playstyles WHERE name='最万用的瞄准镜+更万用的瞄准镜+万用瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='雷恩加尔')), null, 95, '可增加被动跳跃距离', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='希维尔'), '老练狙神+易损+虚幻武器流', '老练狙神、易损、虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='希维尔'), (SELECT id FROM runes WHERE name='老练狙神'), (SELECT id FROM hero_playstyles WHERE name='老练狙神+易损+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='希维尔')), null, 80, 'W弹射可以触发老练狙神', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='希维尔'), (SELECT id FROM runes WHERE name='易损'), (SELECT id FROM hero_playstyles WHERE name='老练狙神+易损+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='希维尔')), null, 50, 'W不触发易损', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='希维尔'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='老练狙神+易损+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='希维尔')), null, 50, '只有q能触发，w弹射不触发特效', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='乌迪尔'), '珠光护手+虚幻武器+最万用的瞄准镜流', '珠光护手、虚幻武器、最万用的瞄准镜');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='乌迪尔'), (SELECT id FROM runes WHERE name='珠光护手'), (SELECT id FROM hero_playstyles WHERE name='珠光护手+虚幻武器+最万用的瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='乌迪尔')), null, 95, 'q r可触发', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='乌迪尔'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='珠光护手+虚幻武器+最万用的瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='乌迪尔')), null, 80, '自动触发R下两次普通附带的额外伤害', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='乌迪尔'), (SELECT id FROM runes WHERE name='最万用的瞄准镜'), (SELECT id FROM hero_playstyles WHERE name='珠光护手+虚幻武器+最万用的瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='乌迪尔')), null, 80, '主Q ad 挠挠挠', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='弗拉基米尔'), '炼狱导管+面包和果酱+循环往复流', '炼狱导管、面包和果酱、循环往复');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='弗拉基米尔'), (SELECT id FROM runes WHERE name='炼狱导管'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+面包和果酱+循环往复流' AND hero_id=(SELECT id FROM heroes WHERE name='弗拉基米尔')), null, 95, '化身鞋底战神的必备条件', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='弗拉基米尔'), (SELECT id FROM runes WHERE name='面包和果酱'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+面包和果酱+循环往复流' AND hero_id=(SELECT id FROM heroes WHERE name='弗拉基米尔')), null, 80, '配合炼狱导管使w达到160cd就可无限w', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='弗拉基米尔'), (SELECT id FROM runes WHERE name='循环往复'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+面包和果酱+循环往复流' AND hero_id=(SELECT id FROM heroes WHERE name='弗拉基米尔')), null, 80, '配合炼狱导管使w达到160cd可无限w', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='泽丽'), '精怪魔法+升级：无尽之刃+一板一眼流', '精怪魔法、升级：无尽之刃、一板一眼');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='泽丽'), (SELECT id FROM runes WHERE name='精怪魔法'), (SELECT id FROM hero_playstyles WHERE name='精怪魔法+升级：无尽之刃+一板一眼流' AND hero_id=(SELECT id FROM heroes WHERE name='泽丽')), null, 80, '开R后的Q连锁闪电也可触发变羊', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='泽丽'), (SELECT id FROM runes WHERE name='升级：无尽之刃'), (SELECT id FROM hero_playstyles WHERE name='精怪魔法+升级：无尽之刃+一板一眼流' AND hero_id=(SELECT id FROM heroes WHERE name='泽丽')), null, 80, '暴击q每段攻击都能触发额外伤害，物超所值', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='泽丽'), (SELECT id FROM runes WHERE name='一板一眼'), (SELECT id FROM hero_playstyles WHERE name='精怪魔法+升级：无尽之刃+一板一眼流' AND hero_id=(SELECT id FROM heroes WHERE name='泽丽')), null, 50, '26.1版本后会锁攻速了，慎选！', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='巴德'), '轨道镭射+虚幻武器流', '轨道镭射、虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='巴德'), (SELECT id FROM runes WHERE name='轨道镭射'), (SELECT id FROM hero_playstyles WHERE name='轨道镭射+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='巴德')), null, 95, '大招后接轨道，救赎，谁用谁知道', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='巴德'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='轨道镭射+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='巴德')), null, 50, 'Q不附带被动', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='布兰德'), '炼狱导管+魔法飞弹流', '炼狱导管、魔法飞弹');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='布兰德'), (SELECT id FROM runes WHERE name='炼狱导管'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+魔法飞弹流' AND hero_id=(SELECT id FROM heroes WHERE name='布兰德')), null, 95, '火男唯一真神符文，单技能即可叠加四层', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='布兰德'), (SELECT id FROM runes WHERE name='魔法飞弹'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+魔法飞弹流' AND hero_id=(SELECT id FROM heroes WHERE name='布兰德')), null, 95, '被动可触发，即首次技能命中触发两次魔法飞弹', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='库奇'), '珠光护手+易损流', '珠光护手、易损');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='库奇'), (SELECT id FROM runes WHERE name='珠光护手'), (SELECT id FROM hero_playstyles WHERE name='珠光护手+易损流' AND hero_id=(SELECT id FROM heroes WHERE name='库奇')), null, 95, '全技能可暴击，伤害爆炸!', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='库奇'), (SELECT id FROM runes WHERE name='易损'), (SELECT id FROM hero_playstyles WHERE name='珠光护手+易损流' AND hero_id=(SELECT id FROM heroes WHERE name='库奇')), null, 80, 'W和E可吃到易损加成', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='黛安娜'), '会心治疗+虚幻武器流', '会心治疗、虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='黛安娜'), (SELECT id FROM runes WHERE name='会心治疗'), (SELECT id FROM hero_playstyles WHERE name='会心治疗+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='黛安娜')), null, 95, '肉装皎月开W你就玩吧', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='黛安娜'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='会心治疗+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='黛安娜')), null, 80, '技能自动打被动，但被动不会造成AOE伤害', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='艾克'), '连拨击锤+虚幻武器流', '连拨击锤、虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='艾克'), (SELECT id FROM runes WHERE name='连拨击锤'), (SELECT id FROM hero_playstyles WHERE name='连拨击锤+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='艾克')), null, 95, '谁玩谁知道，全额触发W被动，露头就秒', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='艾克'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='连拨击锤+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='艾克')), null, 95, '虚幻武器搭配黄昏与黎明，单技能触发三环及W被动', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='杰斯'), '一板一眼+纯粹主义者 - 术师流', '一板一眼、纯粹主义者 - 术师');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='杰斯'), (SELECT id FROM runes WHERE name='一板一眼'), (SELECT id FROM hero_playstyles WHERE name='一板一眼+纯粹主义者 - 术师流' AND hero_id=(SELECT id FROM heroes WHERE name='杰斯')), null, 95, '杰斯开炮形态W可增加360攻击力', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='杰斯'), (SELECT id FROM runes WHERE name='纯粹主义者 - 术师'), (SELECT id FROM hero_playstyles WHERE name='一板一眼+纯粹主义者 - 术师流' AND hero_id=(SELECT id FROM heroes WHERE name='杰斯')), null, 95, '开 w 获得 300 技能极速', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='凯隐'), '全凭身法+量子计算流', '全凭身法、量子计算');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='凯隐'), (SELECT id FROM runes WHERE name='全凭身法'), (SELECT id FROM hero_playstyles WHERE name='全凭身法+量子计算流' AND hero_id=(SELECT id FROM heroes WHERE name='凯隐')), null, 95, 'QER均可吃到加成', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='凯隐'), (SELECT id FROM runes WHERE name='量子计算'), (SELECT id FROM hero_playstyles WHERE name='全凭身法+量子计算流' AND hero_id=(SELECT id FROM heroes WHERE name='凯隐')), null, 80, '大招期间触发量子计算可使该目标吃到4倍内圈伤害', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='千珏'), '回归基本功+叠角龙流', '回归基本功、叠角龙');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='千珏'), (SELECT id FROM runes WHERE name='回归基本功'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+叠角龙流' AND hero_id=(SELECT id FROM heroes WHERE name='千珏')), null, 95, '普通攻击可吃到回归基本功加成', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='千珏'), (SELECT id FROM runes WHERE name='叠角龙'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+叠角龙流' AND hero_id=(SELECT id FROM heroes WHERE name='千珏')), null, 95, '被动1层变2层', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='乐芙兰'), '全凭身法+量子计算流', '全凭身法、量子计算');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='乐芙兰'), (SELECT id FROM runes WHERE name='全凭身法'), (SELECT id FROM hero_playstyles WHERE name='全凭身法+量子计算流' AND hero_id=(SELECT id FROM heroes WHERE name='乐芙兰')), null, 80, '选符文时R若为W的复制，则也可获得加成', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='乐芙兰'), (SELECT id FROM runes WHERE name='量子计算'), (SELECT id FROM hero_playstyles WHERE name='全凭身法+量子计算流' AND hero_id=(SELECT id FROM heroes WHERE name='乐芙兰')), null, 80, '量子计算触发时，W过去释放。', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='卢锡安'), '易损+珠光护手流', '易损、珠光护手');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卢锡安'), (SELECT id FROM runes WHERE name='易损'), (SELECT id FROM hero_playstyles WHERE name='易损+珠光护手流' AND hero_id=(SELECT id FROM heroes WHERE name='卢锡安')), null, 95, '大招可吃到易损加成，伤害爆炸', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卢锡安'), (SELECT id FROM runes WHERE name='珠光护手'), (SELECT id FROM hero_playstyles WHERE name='易损+珠光护手流' AND hero_id=(SELECT id FROM heroes WHERE name='卢锡安')), null, 95, '和易损可以叠加伤害，大招碰到对面就是死。', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='易'), '秘术冲拳+死亡之环流', '秘术冲拳、死亡之环');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='易'), (SELECT id FROM runes WHERE name='秘术冲拳'), (SELECT id FROM hero_playstyles WHERE name='秘术冲拳+死亡之环流' AND hero_id=(SELECT id FROM heroes WHERE name='易')), null, 95, '拿到就是爽局，Q技能附带特效，几段伤害都可以触发秘术冲拳。', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='易'), (SELECT id FROM runes WHERE name='死亡之环'), (SELECT id FROM hero_playstyles WHERE name='秘术冲拳+死亡之环流' AND hero_id=(SELECT id FROM heroes WHERE name='易')), null, 65, '念经流，搭配治疗效果海克斯', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='厄运小姐'), '老练狙神+任务：沃格勒特的巫师帽流', '老练狙神、任务：沃格勒特的巫师帽');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='厄运小姐'), (SELECT id FROM runes WHERE name='老练狙神'), (SELECT id FROM hero_playstyles WHERE name='老练狙神+任务：沃格勒特的巫师帽流' AND hero_id=(SELECT id FROM heroes WHERE name='厄运小姐')), null, 95, '海斗赏金AP强度高于AD', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='厄运小姐'), (SELECT id FROM runes WHERE name='任务：沃格勒特的巫师帽'), (SELECT id FROM hero_playstyles WHERE name='老练狙神+任务：沃格勒特的巫师帽流' AND hero_id=(SELECT id FROM heroes WHERE name='厄运小姐')), null, 95, 'AP 女枪搭配任务巫师帽很猛。高法强下 E 的减速和基础伤害都非常夸张。', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='努努和威朗普'), '死亡之环+溢流流', '死亡之环、溢流');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='努努和威朗普'), (SELECT id FROM runes WHERE name='死亡之环'), (SELECT id FROM hero_playstyles WHERE name='死亡之环+溢流流' AND hero_id=(SELECT id FROM heroes WHERE name='努努和威朗普')), null, 95, 'Q可造成巨额伤害，但不要出时光', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='努努和威朗普'), (SELECT id FROM runes WHERE name='溢流'), (SELECT id FROM hero_playstyles WHERE name='死亡之环+溢流流' AND hero_id=(SELECT id FROM heroes WHERE name='努努和威朗普')), null, 50, 'E会多次耗蓝，慎选', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='潘森'), '回归基本功+任务：钢化你心流', '回归基本功、任务：钢化你心');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='潘森'), (SELECT id FROM runes WHERE name='回归基本功'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+任务：钢化你心流' AND hero_id=(SELECT id FROM heroes WHERE name='潘森')), null, 95, 'R被动增加的物穿仍然生效', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='潘森'), (SELECT id FROM runes WHERE name='任务：钢化你心'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+任务：钢化你心流' AND hero_id=(SELECT id FROM heroes WHERE name='潘森')), null, 80, '配合坦克引擎叠加血量，最后补出大帽和峡谷制造者，一个W100%最大生命值，瞬秒大肉', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='奎因'), '量子计算+狂徒豪气流', '量子计算、狂徒豪气');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='奎因'), (SELECT id FROM runes WHERE name='量子计算'), (SELECT id FROM hero_playstyles WHERE name='量子计算+狂徒豪气流' AND hero_id=(SELECT id FROM heroes WHERE name='奎因')), null, 95, '穿甲奎因配量子计算可进场打AOE后借位移脱离，爆发与容错都很高。', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='奎因'), (SELECT id FROM runes WHERE name='狂徒豪气'), (SELECT id FROM hero_playstyles WHERE name='量子计算+狂徒豪气流' AND hero_id=(SELECT id FROM heroes WHERE name='奎因')), null, 80, '奎因 E 目前可瞬间叠满狂徒豪气（+60 双抗），疑似机制异常。', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='芮尔'), '残忍+巨像的勇气流', '残忍、巨像的勇气');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='芮尔'), (SELECT id FROM runes WHERE name='残忍'), (SELECT id FROM hero_playstyles WHERE name='残忍+巨像的勇气流' AND hero_id=(SELECT id FROM heroes WHERE name='芮尔')), null, 95, '瑞尔AOE控制极多，且能聚集，一个控制可以让一个英雄吃到多个残忍伤害', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='芮尔'), (SELECT id FROM runes WHERE name='巨像的勇气'), (SELECT id FROM hero_playstyles WHERE name='残忍+巨像的勇气流' AND hero_id=(SELECT id FROM heroes WHERE name='芮尔')), null, 95, '巨像护盾可叠加，团战轻松几千护盾', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='烈娜塔'), '扇巴掌+残忍流', '扇巴掌、残忍');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='烈娜塔'), (SELECT id FROM runes WHERE name='扇巴掌'), (SELECT id FROM hero_playstyles WHERE name='扇巴掌+残忍流' AND hero_id=(SELECT id FROM heroes WHERE name='烈娜塔')), null, 95, 'Q一个人至少叠2层，摔到队友身上，最多一个Q叠6层，如果配合残忍则无敌', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='烈娜塔'), (SELECT id FROM runes WHERE name='残忍'), (SELECT id FROM hero_playstyles WHERE name='扇巴掌+残忍流' AND hero_id=(SELECT id FROM heroes WHERE name='烈娜塔')), null, 95, 'Q能触发多段残忍，大招也能触发残忍', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='兰博'), '虚幻武器+易损流', '虚幻武器、易损');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='兰博'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+易损流' AND hero_id=(SELECT id FROM heroes WHERE name='兰博')), null, 95, '红温时QE可附带被动伤害', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='兰博'), (SELECT id FROM runes WHERE name='易损'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+易损流' AND hero_id=(SELECT id FROM heroes WHERE name='兰博')), null, 95, '易损珠光影炎乘算八倍伤害', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='萨勒芬妮'), '扇巴掌+山脉龙魂流', '扇巴掌、山脉龙魂');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='萨勒芬妮'), (SELECT id FROM runes WHERE name='扇巴掌'), (SELECT id FROM hero_playstyles WHERE name='扇巴掌+山脉龙魂流' AND hero_id=(SELECT id FROM heroes WHERE name='萨勒芬妮')), null, 95, 'E速叠扇巴掌', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='萨勒芬妮'), (SELECT id FROM runes WHERE name='山脉龙魂'), (SELECT id FROM hero_playstyles WHERE name='扇巴掌+山脉龙魂流' AND hero_id=(SELECT id FROM heroes WHERE name='萨勒芬妮')), null, 65, '有盾时W可直接触发回血', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='斯维因'), '扇巴掌+残忍流', '扇巴掌、残忍');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='斯维因'), (SELECT id FROM runes WHERE name='扇巴掌'), (SELECT id FROM hero_playstyles WHERE name='扇巴掌+残忍流' AND hero_id=(SELECT id FROM heroes WHERE name='斯维因')), null, 95, 'E禁锢叠一层，拉拽再叠一层', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='斯维因'), (SELECT id FROM runes WHERE name='残忍'), (SELECT id FROM hero_playstyles WHERE name='扇巴掌+残忍流' AND hero_id=(SELECT id FROM heroes WHERE name='斯维因')), null, 80, '同理，触发两次残忍', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='辛德拉'), '裁决使+残忍流', '裁决使、残忍');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='辛德拉'), (SELECT id FROM runes WHERE name='裁决使'), (SELECT id FROM hero_playstyles WHERE name='裁决使+残忍流' AND hero_id=(SELECT id FROM heroes WHERE name='辛德拉')), null, 95, '裁决使现在可刷新升级后的Q技能', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='辛德拉'), (SELECT id FROM runes WHERE name='残忍'), (SELECT id FROM hero_playstyles WHERE name='裁决使+残忍流' AND hero_id=(SELECT id FROM heroes WHERE name='辛德拉')), null, 95, '配合E技能大范围控制触发残忍，且能触发两次，非常恶心', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='崔丝塔娜'), '亮出你的剑+连拨击锤流', '亮出你的剑、连拨击锤');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='崔丝塔娜'), (SELECT id FROM runes WHERE name='亮出你的剑'), (SELECT id FROM hero_playstyles WHERE name='亮出你的剑+连拨击锤流' AND hero_id=(SELECT id FROM heroes WHERE name='崔丝塔娜')), null, 95, '被动增加的攻击距离仍然有效', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='崔丝塔娜'), (SELECT id FROM runes WHERE name='连拨击锤'), (SELECT id FROM hero_playstyles WHERE name='亮出你的剑+连拨击锤流' AND hero_id=(SELECT id FROM heroes WHERE name='崔丝塔娜')), null, 95, 'E技能平A一次触发。', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='厄加特'), '一板一眼+利刃华尔兹流', '一板一眼、利刃华尔兹');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='厄加特'), (SELECT id FROM runes WHERE name='一板一眼'), (SELECT id FROM hero_playstyles WHERE name='一板一眼+利刃华尔兹流' AND hero_id=(SELECT id FROM heroes WHERE name='厄加特')), null, 95, '锁攻速不影响W', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='厄加特'), (SELECT id FROM runes WHERE name='利刃华尔兹'), (SELECT id FROM hero_playstyles WHERE name='一板一眼+利刃华尔兹流' AND hero_id=(SELECT id FROM heroes WHERE name='厄加特')), null, 95, '一键四被动，伤害爆炸', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='维迦'), '尤里卡+轨道镭射流', '尤里卡、轨道镭射');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='维迦'), (SELECT id FROM runes WHERE name='尤里卡'), (SELECT id FROM hero_playstyles WHERE name='尤里卡+轨道镭射流' AND hero_id=(SELECT id FROM heroes WHERE name='维迦')), null, 95, '配合被动，高法强高CD', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='维迦'), (SELECT id FROM runes WHERE name='轨道镭射'), (SELECT id FROM hero_playstyles WHERE name='尤里卡+轨道镭射流' AND hero_id=(SELECT id FROM heroes WHERE name='维迦')), null, 80, '配合E技能很容易命中', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='亚索'), '快中求稳+暗影疾奔流', '快中求稳、暗影疾奔');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='亚索'), (SELECT id FROM runes WHERE name='快中求稳'), (SELECT id FROM hero_playstyles WHERE name='快中求稳+暗影疾奔流' AND hero_id=(SELECT id FROM heroes WHERE name='亚索')), null, 95, '配合暴击书，一玩一个不吱声', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='亚索'), (SELECT id FROM runes WHERE name='暗影疾奔'), (SELECT id FROM hero_playstyles WHERE name='快中求稳+暗影疾奔流' AND hero_id=(SELECT id FROM heroes WHERE name='亚索')), null, 65, '移速越快E得越快', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='劫'), '虚幻武器+裁决使流', '虚幻武器、裁决使');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='劫'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+裁决使流' AND hero_id=(SELECT id FROM heroes WHERE name='劫')), null, 80, '技能可触发被动，搭配九头蛇梦回神话版本', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='劫'), (SELECT id FROM runes WHERE name='裁决使'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+裁决使流' AND hero_id=(SELECT id FROM heroes WHERE name='劫')), null, 50, '触发裁决使仅刷新技能CD不恢复能量，常有触发裁决使后，没有足够能量释放技能。', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='佐伊'), '史上最大雪球+升级：雪球流', '史上最大雪球、升级：雪球');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='佐伊'), (SELECT id FROM runes WHERE name='史上最大雪球'), (SELECT id FROM hero_playstyles WHERE name='史上最大雪球+升级：雪球流' AND hero_id=(SELECT id FROM heroes WHERE name='佐伊')), null, 80, '佐伊专武，捡到的雪球也是超大雪球', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='佐伊'), (SELECT id FROM runes WHERE name='升级：雪球'), (SELECT id FROM hero_playstyles WHERE name='史上最大雪球+升级：雪球流' AND hero_id=(SELECT id FROM heroes WHERE name='佐伊')), null, 80, '同理，捡到的雪球也可以下雪', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='亚托克斯'), '扇巴掌流', '扇巴掌');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='亚托克斯'), (SELECT id FROM runes WHERE name='扇巴掌'), (SELECT id FROM hero_playstyles WHERE name='扇巴掌流' AND hero_id=(SELECT id FROM heroes WHERE name='亚托克斯')), null, 80, 'Q外圈可叠', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='阿卡丽'), '最万用的瞄准镜流', '最万用的瞄准镜');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='阿卡丽'), (SELECT id FROM runes WHERE name='最万用的瞄准镜'), (SELECT id FROM hero_playstyles WHERE name='最万用的瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='阿卡丽')), null, 65, '被动会将该加成也变为双倍', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='阿克尚'), '双刀流流', '双刀流');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='阿克尚'), (SELECT id FROM runes WHERE name='双刀流'), (SELECT id FROM hero_playstyles WHERE name='双刀流流' AND hero_id=(SELECT id FROM heroes WHERE name='阿克尚')), null, 95, 'A一下就是A四下', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='阿利斯塔'), '裁决使流', '裁决使');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='阿利斯塔'), (SELECT id FROM runes WHERE name='裁决使'), (SELECT id FROM hero_playstyles WHERE name='裁决使流' AND hero_id=(SELECT id FROM heroes WHERE name='阿利斯塔')), null, 95, '一波团战一直控，超强！', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='阿木木'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='阿木木'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='阿木木')), null, 95, '虚幻武器开W叠刚，配合装备极速更厉害。', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='安妮'), '杀戮时间到了流', '杀戮时间到了');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='安妮'), (SELECT id FROM runes WHERE name='杀戮时间到了'), (SELECT id FROM hero_playstyles WHERE name='杀戮时间到了流' AND hero_id=(SELECT id FROM heroes WHERE name='安妮')), null, 80, '用R给熊下达移动指令也会触发杀戮时间', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='厄斐琉斯'), '回归基本功流', '回归基本功');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='厄斐琉斯'), (SELECT id FROM runes WHERE name='回归基本功'), (SELECT id FROM hero_playstyles WHERE name='回归基本功流' AND hero_id=(SELECT id FROM heroes WHERE name='厄斐琉斯')), null, 95, '普通攻击可吃到回归基本功加成', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='布里茨'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='布里茨'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='布里茨')), null, 65, '开E再Q会让人原地起飞，R被动可连续电三次', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='凯特琳'), '接二连三流', '接二连三');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='凯特琳'), (SELECT id FROM runes WHERE name='接二连三'), (SELECT id FROM hero_playstyles WHERE name='接二连三流' AND hero_id=(SELECT id FROM heroes WHERE name='凯特琳')), null, 50, '女警极少有攻击特效，慎选', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='德莱文'), '旋转至胜流', '旋转至胜');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='德莱文'), (SELECT id FROM runes WHERE name='旋转至胜'), (SELECT id FROM hero_playstyles WHERE name='旋转至胜流' AND hero_id=(SELECT id FROM heroes WHERE name='德莱文')), null, 95, 'QER均可吃到旋转至胜加成', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='伊莉丝'), '全凭身法流', '全凭身法');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='伊莉丝'), (SELECT id FROM runes WHERE name='全凭身法'), (SELECT id FROM hero_playstyles WHERE name='全凭身法流' AND hero_id=(SELECT id FROM heroes WHERE name='伊莉丝')), null, 95, '蜘蛛形态死亡后QE会再获得175急速，死亡三次即可叠满500急速，人形态技能也有收益。使用潘多拉变为其他符文后该技能急速仍然存在！', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='伊芙琳'), '面包和黄油流', '面包和黄油');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='伊芙琳'), (SELECT id FROM runes WHERE name='面包和黄油'), (SELECT id FROM hero_playstyles WHERE name='面包和黄油流' AND hero_id=(SELECT id FROM heroes WHERE name='伊芙琳')), null, 95, '无限Q全场鞭，纯爽', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='伊泽瑞尔'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='伊泽瑞尔'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='伊泽瑞尔')), null, 95, 'Q可触发两次攻击特效', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='菲奥娜'), '利刃华尔兹流', '利刃华尔兹');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='菲奥娜'), (SELECT id FROM runes WHERE name='利刃华尔兹'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹流' AND hero_id=(SELECT id FROM heroes WHERE name='菲奥娜')), null, 65, '一键四破（前提是没有其他单位）', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='加里奥'), '裁决使流', '裁决使');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='加里奥'), (SELECT id FROM runes WHERE name='裁决使'), (SELECT id FROM hero_playstyles WHERE name='裁决使流' AND hero_id=(SELECT id FROM heroes WHERE name='加里奥')), null, 65, 'W在蓄力期间或释放时击杀敌人不会刷新W', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='纳尔'), '连拨击锤流', '连拨击锤');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='纳尔'), (SELECT id FROM runes WHERE name='连拨击锤'), (SELECT id FROM hero_playstyles WHERE name='连拨击锤流' AND hero_id=(SELECT id FROM heroes WHERE name='纳尔')), null, 80, 'AP纳尔一A秒人', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='古拉加斯'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='古拉加斯'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='古拉加斯')), null, 95, 'W可被技能触发', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='格温'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='格温'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='格温')), null, 95, '普攻和Q技能多触发一次伤害，再出黎明与黄昏的话，伤害巨额提升', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='黑默丁格'), '杀戮时间到了流', '杀戮时间到了');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='黑默丁格'), (SELECT id FROM runes WHERE name='杀戮时间到了'), (SELECT id FROM hero_playstyles WHERE name='杀戮时间到了流' AND hero_id=(SELECT id FROM heroes WHERE name='黑默丁格')), null, 50, '开关R均可触发，但由于现在仅能累积自己的伤害，慎选', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='迦娜'), '老练狙神流', '老练狙神');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='迦娜'), (SELECT id FROM runes WHERE name='老练狙神'), (SELECT id FROM hero_playstyles WHERE name='老练狙神流' AND hero_id=(SELECT id FROM heroes WHERE name='迦娜')), null, 80, '频繁击飞堪比老练女枪', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='贾克斯'), '升级：耀光流', '升级：耀光');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='贾克斯'), (SELECT id FROM runes WHERE name='升级：耀光'), (SELECT id FROM hero_playstyles WHERE name='升级：耀光流' AND hero_id=(SELECT id FROM heroes WHERE name='贾克斯')), null, 95, '有升级耀光记得出黄昏与黎明，可双倍触发升级耀光伤害及回血，其他英雄同理', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='烬'), '回归基本功流', '回归基本功');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='烬'), (SELECT id FROM runes WHERE name='回归基本功'), (SELECT id FROM hero_playstyles WHERE name='回归基本功流' AND hero_id=(SELECT id FROM heroes WHERE name='烬')), null, 95, '普通攻击可吃到回归基本功加成', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='卡莎'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='卡莎'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='卡莎')), null, 95, '虚幻武器搭配黄昏与黎明，升级W后一次即可打出电浆', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='凯南'), '小丑学院流', '小丑学院');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='凯南'), (SELECT id FROM runes WHERE name='小丑学院'), (SELECT id FROM hero_playstyles WHERE name='小丑学院流' AND hero_id=(SELECT id FROM heroes WHERE name='凯南')), null, 80, '大招隐身电', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='奎桑提'), '精怪魔法流', '精怪魔法');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='奎桑提'), (SELECT id FROM runes WHERE name='精怪魔法'), (SELECT id FROM hero_playstyles WHERE name='精怪魔法流' AND hero_id=(SELECT id FROM heroes WHERE name='奎桑提')), null, 80, '开R后普攻即可变羊', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='蕾欧娜'), '炼狱导管流', '炼狱导管');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='蕾欧娜'), (SELECT id FROM runes WHERE name='炼狱导管'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管流' AND hero_id=(SELECT id FROM heroes WHERE name='蕾欧娜')), null, 95, '无限控制', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='丽桑卓'), '唯快不破流', '唯快不破');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='丽桑卓'), (SELECT id FROM runes WHERE name='唯快不破'), (SELECT id FROM hero_playstyles WHERE name='唯快不破流' AND hero_id=(SELECT id FROM heroes WHERE name='丽桑卓')), null, 95, '被动、Q、R均附带减速，稳定吃到增伤', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='拉克丝'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='拉克丝'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='拉克丝')), null, 95, '技能直接触发被动', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='墨菲特'), '终极刷新流', '终极刷新');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='墨菲特'), (SELECT id FROM runes WHERE name='终极刷新'), (SELECT id FROM hero_playstyles WHERE name='终极刷新流' AND hero_id=(SELECT id FROM heroes WHERE name='墨菲特')), null, 95, '双核弹', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='茂凯'), '死亡之环流', '死亡之环');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='茂凯'), (SELECT id FROM runes WHERE name='死亡之环'), (SELECT id FROM hero_playstyles WHERE name='死亡之环流' AND hero_id=(SELECT id FROM heroes WHERE name='茂凯')), null, 95, '大树的真神符文，A一下一管血', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='孙悟空'), '利刃华尔兹流', '利刃华尔兹');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='孙悟空'), (SELECT id FROM runes WHERE name='利刃华尔兹'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹流' AND hero_id=(SELECT id FROM heroes WHERE name='孙悟空')), null, 95, '华尔兹大招流猴子，控一片！', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='诺提勒斯'), '巨像的勇气流', '巨像的勇气');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='诺提勒斯'), (SELECT id FROM runes WHERE name='巨像的勇气'), (SELECT id FROM hero_playstyles WHERE name='巨像的勇气流' AND hero_id=(SELECT id FROM heroes WHERE name='诺提勒斯')), null, 95, '搭配残忍不敢想', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='奥恩'), '精怪魔法流', '精怪魔法');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='奥恩'), (SELECT id FROM runes WHERE name='精怪魔法'), (SELECT id FROM hero_playstyles WHERE name='精怪魔法流' AND hero_id=(SELECT id FROM heroes WHERE name='奥恩')), null, 95, '有精怪魔法后大招第一段可触发多次易损，伤害极高', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='派克'), '全凭身法流', '全凭身法');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='派克'), (SELECT id FROM runes WHERE name='全凭身法'), (SELECT id FROM hero_playstyles WHERE name='全凭身法流' AND hero_id=(SELECT id FROM heroes WHERE name='派克')), null, 50, 'R无法吃到加成', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='拉莫斯'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='拉莫斯'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='拉莫斯')), null, 80, '开W的反弹伤害可触发攻击特效', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='锐雯'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='锐雯'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='锐雯')), null, 50, '技能不触发被动', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='瑟庄妮'), '连拨击锤流', '连拨击锤');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='瑟庄妮'), (SELECT id FROM runes WHERE name='连拨击锤'), (SELECT id FROM hero_playstyles WHERE name='连拨击锤流' AND hero_id=(SELECT id FROM heroes WHERE name='瑟庄妮')), null, 50, '瞬叠被动', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='希瓦娜'), '神射法师流', '神射法师');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='希瓦娜'), (SELECT id FROM runes WHERE name='神射法师'), (SELECT id FROM hero_playstyles WHERE name='神射法师流' AND hero_id=(SELECT id FROM heroes WHERE name='希瓦娜')), null, 50, 'Q无法触发神射法师，慎选', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='辛吉德'), '炼狱导管流', '炼狱导管');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='辛吉德'), (SELECT id FROM runes WHERE name='炼狱导管'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管流' AND hero_id=(SELECT id FROM heroes WHERE name='辛吉德')), null, 95, 'Q可叠加多层炼狱导管', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='赛恩'), '连拨击锤流', '连拨击锤');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='赛恩'), (SELECT id FROM runes WHERE name='连拨击锤'), (SELECT id FROM hero_playstyles WHERE name='连拨击锤流' AND hero_id=(SELECT id FROM heroes WHERE name='赛恩')), null, 80, '塞恩僵尸可以触发伤害还可以', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='斯卡纳'), '利刃华尔兹流', '利刃华尔兹');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='斯卡纳'), (SELECT id FROM runes WHERE name='利刃华尔兹'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹流' AND hero_id=(SELECT id FROM heroes WHERE name='斯卡纳')), null, 65, '开R后使用会带着人瞬移', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='塔姆'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='塔姆'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='塔姆')), null, 50, '出黄昏与黎明后单Q即可叠出三层被动', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='泰隆'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='泰隆'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='泰隆')), null, 80, '全自动打被动，但是大招打到人会解除隐身，有利有弊', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='锤石'), '残忍流', '残忍');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='锤石'), (SELECT id FROM runes WHERE name='残忍'), (SELECT id FROM hero_playstyles WHERE name='残忍流' AND hero_id=(SELECT id FROM heroes WHERE name='锤石')), null, 50, 'Q会将人拖拽出残忍范围', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='特朗德尔'), '老练狙神流', '老练狙神');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='特朗德尔'), (SELECT id FROM runes WHERE name='老练狙神'), (SELECT id FROM hero_playstyles WHERE name='老练狙神流' AND hero_id=(SELECT id FROM heroes WHERE name='特朗德尔')), null, 50, '柱子顶到可减少CD', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='泰达米尔'), '物法皆修流', '物法皆修');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='泰达米尔'), (SELECT id FROM runes WHERE name='物法皆修'), (SELECT id FROM hero_playstyles WHERE name='物法皆修流' AND hero_id=(SELECT id FROM heroes WHERE name='泰达米尔')), null, 80, 'q技能法强加成回血，羊刀加烁刃然后纯肉 叠起来一q回满非常变态', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='崔斯特'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='崔斯特'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='崔斯特')), null, 50, 'W选牌后无法被Q触发', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='蔚'), '利刃华尔兹流', '利刃华尔兹');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='蔚'), (SELECT id FROM runes WHERE name='利刃华尔兹'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹流' AND hero_id=(SELECT id FROM heroes WHERE name='蔚')), null, 95, '大招+华尔兹每个人都给我起飞🛫', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='佛耶戈'), '珠光护手流', '珠光护手');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='佛耶戈'), (SELECT id FROM runes WHERE name='珠光护手'), (SELECT id FROM hero_playstyles WHERE name='珠光护手流' AND hero_id=(SELECT id FROM heroes WHERE name='佛耶戈')), null, 95, 'Q和R本身无法暴击，但暴击率会百分比加成伤害，配合珠光护手伤害爆炸', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='维克托'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='维克托'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='维克托')), null, 50, '技能无法触发Q二段', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='赵信'), '物法皆修流', '物法皆修');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='赵信'), (SELECT id FROM runes WHERE name='物法皆修'), (SELECT id FROM hero_playstyles WHERE name='物法皆修流' AND hero_id=(SELECT id FROM heroes WHERE name='赵信')), null, 80, '一个羊刀出纯肉。被动是法强加成回血', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='永恩'), '会心治疗流', '会心治疗');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='永恩'), (SELECT id FROM runes WHERE name='会心治疗'), (SELECT id FROM hero_playstyles WHERE name='会心治疗流' AND hero_id=(SELECT id FROM heroes WHERE name='永恩')), null, 95, '搭配暴击书，自带的暴击率提升和高频的技能释放轻松满暴，每个技能都能提供护盾，再被强化，还能加强回血量', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='约里克'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='约里克'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='约里克')), null, 95, '小鬼每次攻击都可触发虚幻武器', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='悠米'), '死亡之环流', '死亡之环');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='悠米'), (SELECT id FROM runes WHERE name='死亡之环'), (SELECT id FROM hero_playstyles WHERE name='死亡之环流' AND hero_id=(SELECT id FROM heroes WHERE name='悠米')), null, 80, '挂在队友身上，用狂徒打输出', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='扎克'), '死亡之环流', '死亡之环');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='扎克'), (SELECT id FROM runes WHERE name='死亡之环'), (SELECT id FROM hero_playstyles WHERE name='死亡之环流' AND hero_id=(SELECT id FROM heroes WHERE name='扎克')), null, 95, '扎克回血频率极高', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='婕拉'), '虚幻武器流', '虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='婕拉'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='婕拉')), null, 95, '婕拉植物可触发虚幻武器，整体强度非常高。', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='炽炎雏龙'), '珠光护手+最万用的瞄准镜+更万用的瞄准镜流', '珠光护手、最万用的瞄准镜、更万用的瞄准镜');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='炽炎雏龙'), '万用瞄准镜+亮出你的剑流', '万用瞄准镜、亮出你的剑');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='炽炎雏龙'), (SELECT id FROM runes WHERE name='珠光护手'), (SELECT id FROM hero_playstyles WHERE name='珠光护手+最万用的瞄准镜+更万用的瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='炽炎雏龙')), null, 95, 'Q本身不暴击，但是暴击会百分比加成伤害，叠加珠光护手伤害爆炸', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='炽炎雏龙'), (SELECT id FROM runes WHERE name='最万用的瞄准镜'), (SELECT id FROM hero_playstyles WHERE name='珠光护手+最万用的瞄准镜+更万用的瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='炽炎雏龙')), null, 95, '可增加Q距离', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='炽炎雏龙'), (SELECT id FROM runes WHERE name='更万用的瞄准镜'), (SELECT id FROM hero_playstyles WHERE name='珠光护手+最万用的瞄准镜+更万用的瞄准镜流' AND hero_id=(SELECT id FROM heroes WHERE name='炽炎雏龙')), null, 95, '可增加Q距离', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='炽炎雏龙'), (SELECT id FROM runes WHERE name='万用瞄准镜'), (SELECT id FROM hero_playstyles WHERE name='万用瞄准镜+亮出你的剑流' AND hero_id=(SELECT id FROM heroes WHERE name='炽炎雏龙')), null, 95, '可增加Q距离', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='炽炎雏龙'), (SELECT id FROM runes WHERE name='亮出你的剑'), (SELECT id FROM hero_playstyles WHERE name='万用瞄准镜+亮出你的剑流' AND hero_id=(SELECT id FROM heroes WHERE name='炽炎雏龙')), null, 50, 'Q也变近战距离，慎选！', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='铁血狼母'), '回归基本功+古式佳酿流', '回归基本功、古式佳酿');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='铁血狼母'), '虚幻武器+全凭身法流', '虚幻武器、全凭身法');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='铁血狼母'), (SELECT id FROM runes WHERE name='回归基本功'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+古式佳酿流' AND hero_id=(SELECT id FROM heroes WHERE name='铁血狼母')), null, 95, 'R被动增加的物穿仍然生效', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='铁血狼母'), (SELECT id FROM runes WHERE name='古式佳酿'), (SELECT id FROM hero_playstyles WHERE name='回归基本功+古式佳酿流' AND hero_id=(SELECT id FROM heroes WHERE name='铁血狼母')), null, 95, 'Q触发三次回血，其他技能触发两次回血', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='铁血狼母'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+全凭身法流' AND hero_id=(SELECT id FROM heroes WHERE name='铁血狼母')), null, 50, '技能附带的被动不再回复能量，千万别拿', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='铁血狼母'), (SELECT id FROM runes WHERE name='全凭身法'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+全凭身法流' AND hero_id=(SELECT id FROM heroes WHERE name='铁血狼母')), null, 50, '只有R能吃到加成，勿拿', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='双界灵兔'), '虚幻武器+全凭身法流', '虚幻武器、全凭身法');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='双界灵兔'), '轨道镭射+升级：雪球流', '轨道镭射、升级：雪球');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='双界灵兔'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+全凭身法流' AND hero_id=(SELECT id FROM heroes WHERE name='双界灵兔')), null, 95, 'QE打中直接叠加六层，即触发两次被动', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='双界灵兔'), (SELECT id FROM runes WHERE name='全凭身法'), (SELECT id FROM hero_playstyles WHERE name='虚幻武器+全凭身法流' AND hero_id=(SELECT id FROM heroes WHERE name='双界灵兔')), null, 95, 'WER均可吃到全凭身法加成', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='双界灵兔'), (SELECT id FROM runes WHERE name='轨道镭射'), (SELECT id FROM hero_playstyles WHERE name='轨道镭射+升级：雪球流' AND hero_id=(SELECT id FROM heroes WHERE name='双界灵兔')), null, 65, '轨道镭射后续伤害每次都可叠加被动', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='双界灵兔'), (SELECT id FROM runes WHERE name='升级：雪球'), (SELECT id FROM hero_playstyles WHERE name='轨道镭射+升级：雪球流' AND hero_id=(SELECT id FROM heroes WHERE name='双界灵兔')), null, 65, '升级雪球在26.2版本已修复多次叠加被动的问题，不过符文强度不错', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='万花通灵'), '踢踏舞+物法皆修流', '踢踏舞、物法皆修');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='万花通灵'), '有始有终+魄罗爆破手流', '有始有终、魄罗爆破手');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='万花通灵'), (SELECT id FROM runes WHERE name='踢踏舞'), (SELECT id FROM hero_playstyles WHERE name='踢踏舞+物法皆修流' AND hero_id=(SELECT id FROM heroes WHERE name='万花通灵')), null, 65, '在屠夫之桥中变为小兵攻击能量之花，花不掉血，可以一直叠加层数', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='万花通灵'), (SELECT id FROM runes WHERE name='物法皆修'), (SELECT id FROM hero_playstyles WHERE name='踢踏舞+物法皆修流' AND hero_id=(SELECT id FROM heroes WHERE name='万花通灵')), null, 65, '在屠夫之桥中变为小兵攻击能量之花，花不掉血，可以一直叠加层数', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='万花通灵'), (SELECT id FROM runes WHERE name='有始有终'), (SELECT id FROM hero_playstyles WHERE name='有始有终+魄罗爆破手流' AND hero_id=(SELECT id FROM heroes WHERE name='万花通灵')), null, 50, '变小兵或别的东西身上会带先攻的球，一眼真假', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='万花通灵'), (SELECT id FROM runes WHERE name='魄罗爆破手'), (SELECT id FROM hero_playstyles WHERE name='有始有终+魄罗爆破手流' AND hero_id=(SELECT id FROM heroes WHERE name='万花通灵')), null, 50, '变身英雄同样会被魄罗暴露，妮蔻不推荐点魄罗爆破手。', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='不落魔锋'), '利刃华尔兹+连拨击锤流', '利刃华尔兹、连拨击锤');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='不落魔锋'), '轨道镭射+升级：雪球流', '轨道镭射、升级：雪球');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='不落魔锋'), (SELECT id FROM runes WHERE name='利刃华尔兹'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹+连拨击锤流' AND hero_id=(SELECT id FROM heroes WHERE name='不落魔锋')), null, 95, '快速叠被动', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='不落魔锋'), (SELECT id FROM runes WHERE name='连拨击锤'), (SELECT id FROM hero_playstyles WHERE name='利刃华尔兹+连拨击锤流' AND hero_id=(SELECT id FROM heroes WHERE name='不落魔锋')), null, 80, '能快速叠满被动层数', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='不落魔锋'), (SELECT id FROM runes WHERE name='轨道镭射'), (SELECT id FROM hero_playstyles WHERE name='轨道镭射+升级：雪球流' AND hero_id=(SELECT id FROM heroes WHERE name='不落魔锋')), null, 80, '后续伤害（）地面灼烧 可叠被动，速度特快 1-2s叠满', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='不落魔锋'), (SELECT id FROM runes WHERE name='升级：雪球'), (SELECT id FROM hero_playstyles WHERE name='轨道镭射+升级：雪球流' AND hero_id=(SELECT id FROM heroes WHERE name='不落魔锋')), null, 50, '升级雪球在26.2版本后不再叠加被动层数', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='复仇之矛'), '全凭身法+连拨击锤+暗影疾奔流', '全凭身法、连拨击锤、暗影疾奔');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='复仇之矛'), (SELECT id FROM runes WHERE name='全凭身法'), (SELECT id FROM hero_playstyles WHERE name='全凭身法+连拨击锤+暗影疾奔流' AND hero_id=(SELECT id FROM heroes WHERE name='复仇之矛')), null, 95, '全凭身法会给滑板鞋增加大量攻速', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='复仇之矛'), (SELECT id FROM runes WHERE name='连拨击锤'), (SELECT id FROM hero_playstyles WHERE name='全凭身法+连拨击锤+暗影疾奔流' AND hero_id=(SELECT id FROM heroes WHERE name='复仇之矛')), null, 95, '一下平a叠五层矛，快速斩杀', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='复仇之矛'), (SELECT id FROM runes WHERE name='暗影疾奔'), (SELECT id FROM hero_playstyles WHERE name='全凭身法+连拨击锤+暗影疾奔流' AND hero_id=(SELECT id FROM heroes WHERE name='复仇之矛')), null, 80, '移速堪比踢踏舞', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='铸星龙王'), '冰寒+叠角龙流', '冰寒、叠角龙');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='铸星龙王'), (SELECT id FROM runes WHERE name='冰寒'), (SELECT id FROM hero_playstyles WHERE name='冰寒+叠角龙流' AND hero_id=(SELECT id FROM heroes WHERE name='铸星龙王')), null, 95, 'E是拖拽效果，可与减速叠加，搭配冰杖基本走不动', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='铸星龙王'), (SELECT id FROM runes WHERE name='叠角龙'), (SELECT id FROM hero_playstyles WHERE name='冰寒+叠角龙流' AND hero_id=(SELECT id FROM heroes WHERE name='铸星龙王')), null, 95, '光速叠层', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='狂厄蔷薇'), '全凭身法+裁决使流', '全凭身法、裁决使');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='狂厄蔷薇'), (SELECT id FROM runes WHERE name='全凭身法'), (SELECT id FROM hero_playstyles WHERE name='全凭身法+裁决使流' AND hero_id=(SELECT id FROM heroes WHERE name='狂厄蔷薇')), null, 95, 'QWR均可吃到全凭身法加成', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='狂厄蔷薇'), (SELECT id FROM runes WHERE name='裁决使'), (SELECT id FROM hero_playstyles WHERE name='全凭身法+裁决使流' AND hero_id=(SELECT id FROM heroes WHERE name='狂厄蔷薇')), null, 95, 'W状态中击杀可刷新W', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='德玛西亚皇子'), '俯冲轰炸+小丑学院流', '俯冲轰炸、小丑学院');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='德玛西亚皇子'), (SELECT id FROM runes WHERE name='俯冲轰炸'), (SELECT id FROM hero_playstyles WHERE name='俯冲轰炸+小丑学院流' AND hero_id=(SELECT id FROM heroes WHERE name='德玛西亚皇子')), null, 95, '自爆就完了', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='德玛西亚皇子'), (SELECT id FROM runes WHERE name='小丑学院'), (SELECT id FROM hero_playstyles WHERE name='俯冲轰炸+小丑学院流' AND hero_id=(SELECT id FROM heroes WHERE name='德玛西亚皇子')), null, 80, '中东皇子——小丑学院加俯冲爆炸加自我毁灭加轨道镭射', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='含羞蓓蕾'), '炼狱导管+旋转至胜流', '炼狱导管、旋转至胜');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='含羞蓓蕾'), (SELECT id FROM runes WHERE name='炼狱导管'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+旋转至胜流' AND hero_id=(SELECT id FROM heroes WHERE name='含羞蓓蕾')), null, 95, '被动可叠加多层炼狱导管', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='含羞蓓蕾'), (SELECT id FROM runes WHERE name='旋转至胜'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+旋转至胜流' AND hero_id=(SELECT id FROM heroes WHERE name='含羞蓓蕾')), null, 95, 'QWE均为旋转技能', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='虚空先知'), '炼狱导管+虚幻武器流', '炼狱导管、虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='虚空先知'), (SELECT id FROM runes WHERE name='炼狱导管'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='虚空先知')), null, 95, 'E可叠加多层炼狱导管', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='虚空先知'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='虚空先知')), null, 80, '配合物转法，出攻击特效装备，强力输出', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='流光镜影'), '老练狙神+炼狱导管流', '老练狙神、炼狱导管');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='流光镜影'), (SELECT id FROM runes WHERE name='老练狙神'), (SELECT id FROM hero_playstyles WHERE name='老练狙神+炼狱导管流' AND hero_id=(SELECT id FROM heroes WHERE name='流光镜影')), null, 95, 'QW命中好了无限放，尤其是W，无限控', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='流光镜影'), (SELECT id FROM runes WHERE name='炼狱导管'), (SELECT id FROM hero_playstyles WHERE name='老练狙神+炼狱导管流' AND hero_id=(SELECT id FROM heroes WHERE name='流光镜影')), null, 50, 'QE命中仅一层炼狱导管', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='百裂冥犬'), '炼狱导管+虚幻武器流', '炼狱导管、虚幻武器');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='百裂冥犬'), (SELECT id FROM runes WHERE name='炼狱导管'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='百裂冥犬')), null, 95, 'Q流血和小狗每次攻击都会叠加炼狱导管，Q中后基本无CD', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='百裂冥犬'), (SELECT id FROM runes WHERE name='虚幻武器'), (SELECT id FROM hero_playstyles WHERE name='炼狱导管+虚幻武器流' AND hero_id=(SELECT id FROM heroes WHERE name='百裂冥犬')), null, 95, 'Q流血和小狗每次攻击都可触发一次虚幻武器，建议配合破败使用', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='不破之誓'), '物法皆修+踢踏舞流', '物法皆修、踢踏舞');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='不破之誓'), (SELECT id FROM runes WHERE name='物法皆修'), (SELECT id FROM hero_playstyles WHERE name='物法皆修+踢踏舞流' AND hero_id=(SELECT id FROM heroes WHERE name='不破之誓')), null, 95, '开启Q后平A可叠加多层物法皆修', '');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='不破之誓'), (SELECT id FROM runes WHERE name='踢踏舞'), (SELECT id FROM hero_playstyles WHERE name='物法皆修+踢踏舞流' AND hero_id=(SELECT id FROM heroes WHERE name='不破之誓')), null, 95, '开启Q后平A可叠加多层踢踏舞', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='虚空女皇'), '秘术冲拳流', '秘术冲拳');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='虚空女皇'), (SELECT id FROM runes WHERE name='秘术冲拳'), (SELECT id FROM hero_playstyles WHERE name='秘术冲拳流' AND hero_id=(SELECT id FROM heroes WHERE name='虚空女皇')), null, 95, 'Q命中时可以直接刷新WE', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='异画师'), '残忍流', '残忍');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='异画师'), (SELECT id FROM runes WHERE name='残忍'), (SELECT id FROM hero_playstyles WHERE name='残忍流' AND hero_id=(SELECT id FROM heroes WHERE name='异画师')), null, 80, 'EE拉到多个可使一个英雄吃到多次残忍伤害', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='铁铠冥魂'), '蛋白粉奶昔流', '蛋白粉奶昔');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='铁铠冥魂'), (SELECT id FROM runes WHERE name='蛋白粉奶昔'), (SELECT id FROM hero_playstyles WHERE name='蛋白粉奶昔流' AND hero_id=(SELECT id FROM heroes WHERE name='铁铠冥魂')), null, 95, 'W回血量基于护盾量，可吃到两次蛋白粉加成，配合死亡之环秒人', '');
INSERT INTO hero_playstyles (hero_id, name, description) VALUES ((SELECT id FROM heroes WHERE name='迅捷斥候'), '神射法师流', '神射法师');
INSERT INTO hero_rune_recommendations (hero_id, rune_id, playstyle_id, phase, priority_score, reason, build_synergy) VALUES ((SELECT id FROM heroes WHERE name='迅捷斥候'), (SELECT id FROM runes WHERE name='神射法师'), (SELECT id FROM hero_playstyles WHERE name='神射法师流' AND hero_id=(SELECT id FROM heroes WHERE name='迅捷斥候')), null, 80, 'AP 提莫点神射法师性价比高，普攻与持续消耗都更扎实。', '');
