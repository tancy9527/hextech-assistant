// 数据源状态
import { fetchAramMayhemData } from "@/lib/agent/arammayhem";
import { fetchHexHeroes } from "@/lib/agent/hexdata";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const [amData, hexHeroes] = await Promise.all([
      fetchAramMayhemData(),
      fetchHexHeroes(),
    ]);
    return Response.json({
      community: { name: "arammayhem.com", patch: amData.patch, count: amData.augments.length },
      data_station: { name: "hexdata.com.cn", patch: hexHeroes[0]?.patch || "16.11", count: hexHeroes.length },
    });
  } catch {
    return Response.json({ community: null, data_station: null, error: "数据源获取失败" });
  }
}
