// DeepSeek 翻译包装器 — 符文英文名 → 中文名+描述

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

interface TranslatedRune {
  name: string;
  description: string;
  effect_type: string;
  pros: string;
  cons: string;
  scenarios: string;
}

async function callDeepSeek(messages: Array<{ role: string; content: string }>): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("未配置 DEEPSEEK_API_KEY");

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: "deepseek-chat", messages, max_tokens: 3000, temperature: 0.2 }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`DeepSeek API 错误 ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

function extractJSON(text: string): any {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("无法从AI响应中提取JSON");
  return JSON.parse(match[0]);
}

/**
 * 批量翻译一批英文符文名为中文
 * 返回 Map<nameEn, TranslatedRune>
 */
export async function translateRunes(
  entries: Array<{ nameEn: string; tier: string }>
): Promise<Map<string, TranslatedRune>> {
  if (entries.length === 0) return new Map();

  const list = entries.map((e) => `- ${e.nameEn} [${e.tier === "chromatic" ? "彩色" : e.tier === "gold" ? "金色" : "银色"}]`).join("\n");

  const systemPrompt = `你是一个英雄联盟大乱斗（ARAM）海克斯符文翻译专家。
请将以下英文海克斯符文名称翻译成简体中文，并为每个符文生成详细的中文信息。
翻译时请参考游戏内实际用词，尽量与官方翻译保持一致。
如果无法确定官方译名，请根据符文效果进行意译。

输出格式为严格的JSON：
{
  "runes": {
    "ARAM_ExampleName": {
      "name": "中文符文名",
      "description": "符文效果的中文描述，1-2句话",
      "effect_type": "damage/defense/mobility/utility/sustain 之一",
      "pros": "优点，逗号分隔",
      "cons": "缺点，逗号分隔",
      "scenarios": "适用场景"
    }
  }
}

注意：
- effect_type 只能是 damage/defense/mobility/utility/sustain 其中之一
- 所有字段使用简体中文
- 不要翻译 ARAM_ 前缀的原始ID`;

  const content = await callDeepSeek([
    { role: "system", content: systemPrompt },
    { role: "user", content: `请翻译以下海克斯符文并生成详细信息：\n\n${list}` },
  ]);

  const parsed = extractJSON(content);
  const runes = parsed.runes || parsed;
  const result = new Map<string, TranslatedRune>();

  for (const entry of entries) {
    const translated = runes[entry.nameEn];
    if (translated) {
      result.set(entry.nameEn, {
        name: translated.name || entry.nameEn,
        description: translated.description || "",
        effect_type: ["damage", "defense", "mobility", "utility", "sustain"].includes(translated.effect_type)
          ? translated.effect_type : "utility",
        pros: translated.pros || "",
        cons: translated.cons || "",
        scenarios: translated.scenarios || "",
      });
    }
  }

  return result;
}

/**
 * 为生成推荐调用 DeepSeek
 */
export async function generateRecsFromAI(prompt: string): Promise<any> {
  const content = await callDeepSeek([
    {
      role: "system",
      content: "你是一个英雄联盟大乱斗（ARAM）海克斯符文推荐专家。只输出JSON，不输出其他内容。",
    },
    { role: "user", content: prompt },
  ]);

  return extractJSON(content);
}
