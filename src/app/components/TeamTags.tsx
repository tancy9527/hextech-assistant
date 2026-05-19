"use client";

import { TEAM_TAGS } from "@/types";

interface TeamTagsProps {
  activeTags: string[];
  onToggle: (tag: string) => void;
}

export default function TeamTags({ activeTags, onToggle }: TeamTagsProps) {
  return (
    <div className="mb-4">
      <p className="text-[12px] text-sage-500 mb-2">敌方阵容情况（可选）</p>
      <div className="flex flex-wrap gap-2">
        {TEAM_TAGS.map((tag) => {
          const isActive = activeTags.includes(tag.key);
          return (
            <button
              key={tag.key}
              onClick={() => onToggle(tag.key)}
              className={`btn-tag ${
                isActive ? "btn-tag-active" : "btn-tag-inactive"
              }`}
            >
              <span className="mr-1">{tag.icon}</span>
              {tag.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
