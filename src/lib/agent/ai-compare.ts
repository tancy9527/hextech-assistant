// AI 符文比对 — 用 DeepSeek 对比官方和社区数据，找出名不同但描述相同的符文

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

async function callDeepSeek(messages: Array<{ role: string; content: string }>): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("未配置 DEEPSEEK_API_KEY");

  const res = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: "deepseek-chat", messages, max_tokens: 4000, temperature: 0.1 }),
  });
  if (!res.ok) throw new Error(`DeepSeek API ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

function extractJSON(text: string): any {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("无法解析AI响应");
  return JSON.parse(match[0]);
}

export interface AiCompareInput {
  id: string;
  officialName: string;   // CDragon中文名（来自rune-overrides）
  communityName: string;  // arammayhem中文名
  officialDesc: string;   // CDragon描述（如果有）
  communityDesc: string;  // arammayhem描述
  dbName: string;         // 数据库中已有名
  dbDesc: string;         // 数据库中已有描述
}

export interface AiCompareResult {
  id: string;
  verdict: "same" | "different" | "uncertain";  // 是否同一符文
  recommendedName: string;    // AI推荐使用的名称
  recommendedDesc: string;    // AI推荐使用的描述
  reason: string;             // 判断理由（中文）
  confidence: number;         // 0-100
}

/**
 * 批量比对符文，找出名不同但描述相似的
 */
export async function aiCompareRunes(
  items: AiCompareInput[]
): Promise<AiCompareResult[]> {
  if (items.length === 0) return [];

  // 构建对比列表
  const itemsText = items.map((item, i) =>
    `[${i}] ID: ${item.id}
  官方(CDragon)名: ${item.officialName || "无"}
  社区(arammayhem)名: ${item.communityName || "无"}
  官方描述: ${item.officialDesc || "无描述"}
  社区描述: ${item.communityDesc || "无描述"}
  数据库名: ${item.dbName || "无"}`
  ).join("\n\n");

  const systemPrompt = `你是英雄联盟海克斯大乱斗(ARAM)符文专家。请比对官方数据源(CDragon)和社区数据源(arammayhem)的符文信息。

判断规则：
1. 如果两个来源的描述核心效果相同 → 判定为"same"（同一符文），推荐使用社区中文名
2. 如果描述效果完全不同 → 判定为"different"（不同符文）
3. 如果无法确定 → 判定为"uncertain"
4. 优先级：社区中文名 > 官方翻译名 > 英文直译
5. recommendedName 填入推荐名称，recommendedDesc 填入推荐描述
6. confidence 为信心指数 0-100

输出JSON格式：
{
  "results": [
    {
      "index": 0,
      "verdict": "same",
      "recommendedName": "推荐的中文名",
      "recommendedDesc": "推荐的描述",
      "reason": "判断理由",
      "confidence": 85
    }
  ]
}`;

  const content = await callDeepSeek([
    { role: "system", content: systemPrompt },
    { role: "user", content: `请比对以下符文：\n\n${itemsText}` },
  ]);

  const parsed = extractJSON(content);
  const aiResults: AiCompareResult[] = [];

  for (const r of (parsed.results || [])) {
    const idx = r.index;
    if (idx >= 0 && idx < items.length) {
      aiResults.push({
        id: items[idx].id,
        verdict: r.verdict || "uncertain",
        recommendedName: r.recommendedName || items[idx].communityName || items[idx].officialName,
        recommendedDesc: r.recommendedDesc || items[idx].communityDesc || items[idx].officialDesc,
        reason: r.reason || "",
        confidence: r.confidence || 50,
      });
    }
  }

  return aiResults;
}
