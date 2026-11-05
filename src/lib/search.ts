import MiniSearch from "minisearch";
import { CatalogueService, getAllServices } from "./catalogue";
import { getSynonymsForService, matchServiceByDirectSynonym } from "./search-synonyms";

export interface SearchResultItem {
  service: CatalogueService;
  score: number;
}

interface SearchDocument {
  id: string;
  titleEn: string;
  titleHi: string;
  goalEn: string;
  goalHi: string;
  summaryEn: string;
  summaryHi: string;
  category: string;
  ecosystem: string;
  provider: string;
  synonyms: string;
}

let searchIndex: MiniSearch<SearchDocument> | null = null;
let servicesMap: Map<string, CatalogueService> = new Map();

function getSearchIndex(): MiniSearch<SearchDocument> {
  if (searchIndex) {
    return searchIndex;
  }

  const services = getAllServices();
  servicesMap = new Map(services.map((s) => [s.id, s]));

  searchIndex = new MiniSearch<SearchDocument>({
    fields: [
      "titleEn",
      "titleHi",
      "goalEn",
      "goalHi",
      "synonyms",
      "category",
      "provider",
      "summaryEn",
      "summaryHi",
    ],
    storeFields: ["id"],
    searchOptions: {
      boost: {
        titleEn: 5,
        titleHi: 5,
        goalEn: 3,
        goalHi: 3,
        synonyms: 4,
        category: 2,
        provider: 2,
        summaryEn: 1,
        summaryHi: 1,
      },
      prefix: true,
      fuzzy: 0.25,
    },
  });

  const docs: SearchDocument[] = services.map((s) => ({
    id: s.id,
    titleEn: s.title.en,
    titleHi: s.title.hi || "",
    goalEn: s.goal.en,
    goalHi: s.goal.hi || "",
    summaryEn: s.summary.en,
    summaryHi: s.summary.hi || "",
    category: s.category,
    ecosystem: s.ecosystem,
    provider: s.provider.name,
    synonyms: getSynonymsForService(s.id).join(" "),
  }));

  searchIndex.addAll(docs);
  return searchIndex;
}

/**
 * Executes an in-memory search query against the catalogue.
 * Evaluates MiniSearch ranking, field boosts, and explicit intent/synonym matches.
 */
export function searchServices(query: string): SearchResultItem[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  const index = getSearchIndex();
  const directSynonymIds = matchServiceByDirectSynonym(trimmed);

  // Search MiniSearch with prefix and fuzzy options
  const rawResults = index.search(trimmed, {
    prefix: true,
    fuzzy: (term) => (term.length > 3 ? 0.25 : false),
  });

  const scoredMap = new Map<string, number>();

  // Boost any directly matched synonyms/intents
  for (const id of directSynonymIds) {
    scoredMap.set(id, 100);
  }

  // Integrate MiniSearch scores
  for (const r of rawResults) {
    const existing = scoredMap.get(r.id) || 0;
    scoredMap.set(r.id, existing + r.score);
  }

  // If query consists of multiple words, also check individual words for fallback
  if (rawResults.length === 0 && directSynonymIds.length === 0 && trimmed.includes(" ")) {
    const tokens = trimmed.split(/\s+/).filter((t) => t.length > 2);
    for (const t of tokens) {
      const tokenSynonyms = matchServiceByDirectSynonym(t);
      for (const id of tokenSynonyms) {
        const cur = scoredMap.get(id) || 0;
        scoredMap.set(id, cur + 20);
      }
      const tokenResults = index.search(t, { prefix: true, fuzzy: 0.2 });
      for (const r of tokenResults) {
        const cur = scoredMap.get(r.id) || 0;
        scoredMap.set(r.id, cur + r.score * 0.5);
      }
    }
  }

  const results: SearchResultItem[] = [];
  for (const [id, score] of scoredMap.entries()) {
    const service = servicesMap.get(id);
    if (service) {
      results.push({ service, score });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);
  return results;
}
