/**
 * UK Visa Sponsors search page.
 * Allows searching the government's list of licensed visa sponsors.
 */

import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileSpreadsheet,
  Loader2,
  MapPin,
  Search,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as api from "../api";
import type {
  VisaSponsor,
  VisaSponsorSearchResult,
  VisaSponsorStatusResponse,
} from "../../shared/types";

const formatDateTime = (dateStr?: string | null) => {
  if (!dateStr) return "Never";
  try {
    const parsed = new Date(dateStr);
    if (Number.isNaN(parsed.getTime())) return dateStr;
    const date = parsed.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const time = parsed.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} ${time}`;
  } catch {
    return dateStr;
  }
};

/**
 * Get score styling based on match quality
 */
const getScoreTokens = (score: number) => {
  if (score >= 90)
    return {
      badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
      bar: "bg-emerald-500/80",
    };
  if (score >= 70)
    return {
      badge: "border-amber-500/30 bg-amber-500/10 text-amber-200",
      bar: "bg-amber-500/80",
    };
  if (score >= 50)
    return {
      badge: "border-orange-500/30 bg-orange-500/10 text-orange-200",
      bar: "bg-orange-500/80",
    };
  return {
    badge: "border-rose-500/30 bg-rose-500/10 text-rose-200",
    bar: "bg-rose-500/80",
  };
};

const ScoreMeter: React.FC<{ score: number }> = ({ score }) => {
  const tokens = getScoreTokens(score);
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <div className="h-1.5 w-12 rounded-full bg-muted/40">
        <div
          className={cn("h-1.5 rounded-full", tokens.bar)}
          style={{ width: `${Math.max(4, Math.min(100, score))}%` }}
        />
      </div>
      <span className="tabular-nums text-foreground">{score}%</span>
    </div>
  );
};

export const VisaSponsorsPage: React.FC = () => {
  // State
  const [status, setStatus] = useState<VisaSponsorStatusResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<VisaSponsorSearchResult[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [orgDetails, setOrgDetails] = useState<VisaSponsor[]>([]);

  // Loading states
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Fetch status on mount
  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const data = await api.getVisaSponsorStatus();
      setStatus(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch status";
      toast.error(message);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  // Search with debounce
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await api.searchVisaSponsors({
        query: query.trim(),
        limit: 100,
        minScore: 20,
      });
      setResults(response.results);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Search failed";
      toast.error(message);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  // Auto-select first result
  useEffect(() => {
    if (results.length === 0) {
      setSelectedOrg(null);
      setOrgDetails([]);
      return;
    }
    if (!selectedOrg || !results.some((r) => r.sponsor.organisationName === selectedOrg)) {
      const firstOrg = results[0].sponsor.organisationName;
      setSelectedOrg(firstOrg);
      fetchOrgDetails(firstOrg);
    }
  }, [results]);

  // Fetch organization details
  const fetchOrgDetails = async (orgName: string) => {
    setIsLoadingDetails(true);
    setSelectedOrg(orgName);
    try {
      const details = await api.getVisaSponsorOrganization(orgName);
      setOrgDetails(details);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch details";
      toast.error(message);
      setOrgDetails([]);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Trigger manual update
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const result = await api.updateVisaSponsorList();
      setStatus(result.status);
      toast.success(result.message);
      // Re-run search if there was a query
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast.error(message);
    } finally {
      setIsUpdating(false);
    }
  };

  const selectedResult = useMemo(
    () => results.find((r) => r.sponsor.organisationName === selectedOrg) ?? null,
    [results, selectedOrg]
  );

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-muted/30">
              <Shield className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Visa Sponsors</div>
              <div className="text-xs text-muted-foreground">UK Register Search</div>
            </div>
            {(isUpdating || status?.isUpdating) && (
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                Updating
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Status info */}
            {status && (
              <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground mr-2">
                <span className="flex items-center gap-1.5">
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  {status.totalSponsors.toLocaleString()} sponsors
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDateTime(status.lastUpdated)}
                </span>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={handleUpdate}
              disabled={isUpdating || status?.isUpdating}
              aria-label="Update sponsor list"
            >
              {isUpdating || status?.isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>

            <Button asChild variant="ghost" size="icon" aria-label="Back to Orchestrator">
              <Link to="/">
                <Sparkles className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Search and results */}
        <div className="flex w-[420px] flex-col border-r">
          {/* Search input */}
          <div className="border-b p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for a company name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {isSearching && (
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                Searching...
              </div>
            )}
          </div>

          {/* Results list */}
          <div className="flex-1 overflow-y-auto">
            {/* No data state */}
            {!isLoadingStatus && status?.totalSponsors === 0 && (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <AlertCircle className="h-10 w-10 text-amber-400 mb-4" />
                <div className="text-sm font-medium text-foreground mb-1">
                  No sponsor data available
                </div>
                <p className="text-xs text-muted-foreground mb-4 max-w-xs">
                  The visa sponsor list hasn't been downloaded yet.
                </p>
                <Button size="sm" onClick={handleUpdate} disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download List
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Empty search state */}
            {status && status.totalSponsors > 0 && !searchQuery && (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Search className="h-10 w-10 text-muted-foreground/50 mb-4" />
                <div className="text-sm font-medium text-foreground mb-1">
                  Search for a company
                </div>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Enter a company name to check if they're on the UK visa sponsor register.
                </p>
              </div>
            )}

            {/* No results state */}
            {searchQuery && !isSearching && results.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <AlertCircle className="h-10 w-10 text-muted-foreground/50 mb-4" />
                <div className="text-sm font-medium text-foreground mb-1">
                  No matches found
                </div>
                <p className="text-xs text-muted-foreground max-w-xs">
                  No sponsors match "{searchQuery}". Try a different spelling.
                </p>
              </div>
            )}

            {/* Results */}
            {results.length > 0 && (
              <div className="divide-y divide-border/50">
                {results.map((result, index) => (
                  <button
                    key={`${result.sponsor.organisationName}-${index}`}
                    onClick={() => fetchOrgDetails(result.sponsor.organisationName)}
                    className={cn(
                      "w-full px-4 py-3 text-left transition-colors",
                      selectedOrg === result.sponsor.organisationName
                        ? "bg-muted/50"
                        : "hover:bg-muted/30"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="text-sm font-medium text-foreground truncate">
                            {result.sponsor.organisationName}
                          </span>
                        </div>
                        {(result.sponsor.townCity || result.sponsor.county) && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {[result.sponsor.townCity, result.sponsor.county]
                              .filter(Boolean)
                              .join(", ")}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <ScoreMeter score={result.score} />
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results count footer */}
          {results.length > 0 && (
            <div className="border-t px-4 py-2 text-xs text-muted-foreground">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* Right panel - Details */}
        <div className="flex-1 overflow-y-auto">
          {!selectedOrg ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <Building2 className="h-10 w-10 text-muted-foreground/50 mb-4" />
              <div className="text-sm font-medium text-foreground mb-1">
                Select a company
              </div>
              <p className="text-xs text-muted-foreground">
                Click on a search result to view details.
              </p>
            </div>
          ) : isLoadingDetails ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-200">
                    <CheckCircle2 className="h-3 w-3" />
                    Licensed Sponsor
                  </span>
                  {selectedResult && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                        getScoreTokens(selectedResult.score).badge
                      )}
                    >
                      {selectedResult.score}% Match
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  {selectedOrg}
                </h2>
              </div>

              {/* Location */}
              {orgDetails.length > 0 && (orgDetails[0].townCity || orgDetails[0].county) && (
                <div className="mb-6">
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
                    Location
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {[orgDetails[0].townCity, orgDetails[0].county]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                </div>
              )}

              {/* Licence types / routes */}
              <div className="mb-6">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
                  Licensed Routes ({orgDetails.length})
                </div>
                <div className="space-y-2">
                  {orgDetails.map((entry, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border/60 bg-muted/20 p-4"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {entry.route}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Type & Rating:</span>{" "}
                        {entry.typeRating}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info box */}
              <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-4 text-sm">
                <div className="font-medium text-sky-200 mb-1">
                  What does this mean?
                </div>
                <p className="text-xs text-sky-300/80">
                  This organisation is licensed by the UK Home Office to sponsor workers
                  on the routes listed above. An "A rating" means they're fully compliant
                  with their sponsor duties.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
