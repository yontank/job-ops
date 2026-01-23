import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { PIPELINE_SOURCES_STORAGE_KEY } from "./constants";
import { usePipelineSources } from "./usePipelineSources";

describe("usePipelineSources", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("filters stored sources to enabled sources", () => {
    localStorage.setItem(PIPELINE_SOURCES_STORAGE_KEY, JSON.stringify(["gradcracker", "ukvisajobs"]));

    const enabledSources = ["gradcracker"] as const;

    const { result } = renderHook(() => usePipelineSources(enabledSources));

    expect(result.current.pipelineSources).toEqual(["gradcracker"]);
  });

  it("falls back to the first enabled source", () => {
    localStorage.setItem(PIPELINE_SOURCES_STORAGE_KEY, JSON.stringify(["ukvisajobs"]));

    const enabledSources = ["gradcracker", "linkedin"] as const;

    const { result } = renderHook(() => usePipelineSources(enabledSources));

    expect(result.current.pipelineSources).toEqual(["gradcracker"]);
  });

  it("ignores toggles for disabled sources", () => {
    localStorage.setItem(PIPELINE_SOURCES_STORAGE_KEY, JSON.stringify(["gradcracker"]));

    const enabledSources = ["gradcracker"] as const;

    const { result } = renderHook(() => usePipelineSources(enabledSources));

    act(() => {
      result.current.toggleSource("ukvisajobs", true);
    });

    expect(result.current.pipelineSources).toEqual(["gradcracker"]);
  });
});
