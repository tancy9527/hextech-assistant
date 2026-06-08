var fs = require('fs');
var path = require('path');
var file = path.join(__dirname, '..', 'src', 'app', 'admin', 'components', 'AgentTab.tsx');
var code = fs.readFileSync(file, 'utf8');

var cards = [
'',
'      {/* ======== 卡片4：装备池同步 ======== */}',
'      <div className="bg-white/60 rounded-xl border border-sage-200/50 overflow-hidden">',
'        <div className="p-3">',
'          <div className="flex items-center gap-2 mb-2">',
'            <span className="size-7 rounded-lg bg-cyan-100 flex items-center justify-center text-sm">🗡️</span>',
'            <h3 className="text-[13px] font-bold text-sage-700">装备池同步</h3>',
'          </div>',
'          <p className="text-[10px] text-sage-500 mb-2">从CDragon获取装备基础数据（名称、图标、描述、价格）到本地equipment表。</p>',
'          <div className="flex gap-2">',
'            <button onClick={async () => {',
'              try {',
'                const res = await fetch("/api/admin/agent/sync-equipment", { method: "POST", headers: h, body: JSON.stringify({ dryRun: true }) });',
'                const data = await res.json();',
'                setConfirmModal({ title: "装备池同步预览", summary: `新增 ${data.created} | 更新 ${data.updated} | 总计 ${data.total}`, details: [], warnings: ["仅同步基础数据，不影响推荐配置"], onConfirm: async () => { setConfirmModal(null); const r = await fetch("/api/admin/agent/sync-equipment", { method: "POST", headers: h, body: JSON.stringify({ dryRun: false }) }); const d = await r.json(); setRuneMsg(d.success ? `装备同步完成！新增${d.created} 更新${d.updated}` : "失败"); }});',
'              } catch(e) { setRuneMsg(e.message); }',
'            }} className="text-[11px] px-4 py-2 rounded-lg bg-white/80 text-sage-600 font-medium hover:bg-white border border-sage-200/50">预览</button>',
'            <button onClick={async () => {',
'              const res = await fetch("/api/admin/agent/sync-equipment", { method: "POST", headers: h, body: JSON.stringify({ dryRun: false }) });',
'              const data = await res.json();',
'              setRuneMsg(data.success ? `装备同步完成！新增${data.created} 更新${data.updated}` : "失败");',
'            }} className="text-[11px] px-4 py-2 rounded-lg bg-gold-300 text-gold-700 font-bold hover:bg-gold-400">执行同步</button>',
'          </div>',
'        </div>',
'      </div>',
'',
'      {/* ======== 卡片5：装备推荐同步 ======== */}',
'      <div className="bg-white/60 rounded-xl border border-sage-200/50 overflow-hidden">',
'        <div className="p-3">',
'          <div className="flex items-center gap-2 mb-2">',
'            <span className="size-7 rounded-lg bg-teal-100 flex items-center justify-center text-sm">⚔️</span>',
'            <h3 className="text-[13px] font-bold text-sage-700">装备推荐同步</h3>',
'          </div>',
'          <p className="text-[10px] text-sage-500 mb-2">从hexdata获取172个英雄的装备推荐（出门装+核心装），同步到通用流派。</p>',
'          <div className="flex gap-2">',
'            <button onClick={async () => {',
'              try {',
'                const res = await fetch("/api/admin/agent/sync-equipment-recs", { method: "POST", headers: h, body: JSON.stringify({ dryRun: true }) });',
'                const data = await res.json();',
'                setConfirmModal({ title: "装备推荐同步预览", summary: `将同步 ${data.synced} 个英雄的装备推荐`, details: [], warnings: ["覆盖已有装备推荐，不影响符文推荐"], onConfirm: async () => { setConfirmModal(null); const r = await fetch("/api/admin/agent/sync-equipment-recs", { method: "POST", headers: h, body: JSON.stringify({ dryRun: false }) }); const d = await r.json(); setRuneMsg(d.success ? `装备推荐同步完成！${d.synced}个英雄` : "失败"); }});',
'              } catch(e) { setRuneMsg(e.message); }',
'            }} className="text-[11px] px-4 py-2 rounded-lg bg-white/80 text-sage-600 font-medium hover:bg-white border border-sage-200/50">预览</button>',
'            <button onClick={async () => {',
'              const res = await fetch("/api/admin/agent/sync-equipment-recs", { method: "POST", headers: h, body: JSON.stringify({ dryRun: false }) });',
'              const data = await res.json();',
'              setRuneMsg(data.success ? `装备推荐同步完成！${data.synced}个英雄` : "失败");',
'            }} className="text-[11px] px-4 py-2 rounded-lg bg-gold-300 text-gold-700 font-bold hover:bg-gold-400">执行同步</button>',
'          </div>',
'        </div>',
'      </div>',
].join('\n');

code = code.replace(
  '      {/* ======== AI比对结果弹窗 ======== */}',
  cards + '\n\n      {/* ======== AI比对结果弹窗 ======== */}'
);

fs.writeFileSync(file, code);
console.log('Patched');
