// Patch AgentTab: add AI compare button + modal
var fs = require('fs');
var path = require('path');
var file = path.join(__dirname, '..', 'src', 'app', 'admin', 'components', 'AgentTab.tsx');
var code = fs.readFileSync(file, 'utf8');

// 1. Insert AI button before collapse button
code = code.replace(
  "            <button onClick={() => setRuneCollapsed(!runeCollapsed)}",
  `            {communityResult && dataStationResult && (
              <button onClick={async () => { setAiCompareLoading(true); const r = await fetch("/api/admin/agent/ai-compare", { headers: h }); setAiCompare(await r.json()); setAiCompareLoading(false); }}
                disabled={aiCompareLoading} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 font-medium hover:bg-purple-200">
                🤖 AI比对
              </button>
            )}
            <button onClick={() => setRuneCollapsed(!runeCollapsed)}`
);

// 2. Insert AI modal before progress modal
var modal = [
'',
'      {/* ======== AI比对结果弹窗 ======== */}',
'      {aiCompare?.success && (',
'        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setAiCompare(null)}>',
'          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>',
'            <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b flex-shrink-0">',
'              <h3 className="text-[16px] font-bold text-sage-700">🤖 AI双源比对结果</h3>',
'              <button onClick={() => setAiCompare(null)} className="size-7 rounded-full bg-sage-100 text-sage-500 text-[16px] font-bold">&times;</button>',
'            </div>',
'            <div className="px-5 py-2 border-b flex-shrink-0 text-[11px] text-sage-500">',
'              🌐社区 {aiCompare.community_count} 符文 | 📊数据站 {aiCompare.data_station_count} 符文 | 同名异述{aiCompare.cat1_count} | 异名似述{aiCompare.cat2_count} | 独有{aiCompare.cat3_count}',
'            </div>',
'            <div className="overflow-y-auto flex-1 px-5 py-3 space-y-3">',
'              {aiCompare.cat1?.length > 0 && (',
'                <div>',
'                  <h4 className="text-[12px] font-bold text-sage-600 mb-1">📋 类别1：同名异述 ({aiCompare.cat1.length}项)</h4>',
'                  <div className="space-y-1 max-h-40 overflow-y-auto bg-sage-50 rounded-lg p-2">',
'                    {aiCompare.cat1.slice(0,20).map((item, i) => (',
'                      <div key={i} className="text-[10px] bg-white/50 rounded p-1.5">',
'                        <b className="text-sage-700">{item.community_name}</b>',
'                        {item.tier_diff && <span className="ml-1 text-gold-600">[{item.community_tier}≠{item.data_station_tier}]</span>}',
'                        {item.desc_diff && <span className="ml-1 text-blue-500">描述不同</span>}',
'                        <div className="text-sage-400 mt-0.5 truncate">社区: {item.community_desc}</div>',
'                        <div className="text-sage-400 truncate">数据站: {item.data_station_desc}</div>',
'                      </div>',
'                    ))}',
'                  </div>',
'                </div>',
'              )}',
'              {aiCompare.cat2?.length > 0 && (',
'                <div>',
'                  <h4 className="text-[12px] font-bold text-purple-600 mb-1">🤖 类别2：异名似述 ({aiCompare.cat2.length}项)</h4>',
'                  <div className="space-y-1 max-h-40 overflow-y-auto bg-purple-50 rounded-lg p-2">',
'                    {aiCompare.cat2.slice(0,20).map((item, i) => (',
'                      <div key={i} className="text-[10px] bg-white/50 rounded p-1.5">',
'                        <b className="text-purple-700">{item.community_name} ↔ {item.data_station_name}</b>',
'                        <span className="ml-1 text-purple-500">({item.similarity}%相似)</span>',
'                        <div className="text-sage-400 mt-0.5 truncate">社区: {item.community_desc}</div>',
'                        <div className="text-sage-400 truncate">数据站: {item.data_station_desc}</div>',
'                      </div>',
'                    ))}',
'                  </div>',
'                </div>',
'              )}',
'              {aiCompare.cat3?.length > 0 && (',
'                <div>',
'                  <h4 className="text-[12px] font-bold text-amber-600 mb-1">⚠️ 类别3：独有符文 ({aiCompare.cat3.length}项)</h4>',
'                  <div className="space-y-1 max-h-40 overflow-y-auto bg-amber-50 rounded-lg p-2">',
'                    {aiCompare.cat3.slice(0,20).map((item, i) => (',
'                      <div key={i} className="text-[10px] bg-white/50 rounded p-1.5">',
'                        <b className="text-amber-700">{item.name}</b>',
'                        <span className="ml-1 text-amber-500">[{item.source==="community"?"社区独有":"数据站独有"}]</span>',
'                        <div className="text-sage-400 mt-0.5 truncate">{item.desc}</div>',
'                      </div>',
'                    ))}',
'                  </div>',
'                </div>',
'              )}',
'            </div>',
'            <div className="px-5 pb-5 pt-3 flex-shrink-0 border-t">',
'              <button onClick={() => setAiCompare(null)} className="w-full py-2.5 rounded-xl bg-sage-100 text-sage-600 font-medium text-[14px]">关闭</button>',
'            </div>',
'          </div>',
'        </div>',
'      )}',
].join('\n');

code = code.replace(
  '      {/* ======== 进度条弹窗 ======== */}',
  modal + '\n\n      {/* ======== 进度条弹窗 ======== */}'
);

fs.writeFileSync(file, code);
console.log('Patched successfully');
