// list of stop words with length > 3
// See also https://en.wikipedia.org/wiki/Stop_word
const stopwords = [
	"about", "above", "after", "again", "among", "because", "been", "before", "being", "below", "between", "both", "cannot",
	"code", "could", "does", "doing", "down", "during", "each", "every", "false", "first", "following", "from", "further",
	"have", "having", "here", "hers", "self", "ever", "http", "important", "itself", "little", "might", "more", "most",
	"self", "never", "nodejs", "hing", "only", "other", "ought", "s ourselves", "over", "page", "path", "post", "return",
	"same", "should", "since", "something", "sometimes", "till", "such", "text", "that", "their", "theirs", "them",
	"selves", "then", "there", "these", "they", "they", "this", "those", "through", "true", "under", "until", "using",
	"very", "were", "what", "when", "where", "which", "while", "with", "without", "would", "xmlns", "your", "yourself",
	"yourselves",
];

// This is a just a very basic set of stemmer rules for English.
// See http://snowball.tartarus.org/algorithms/english/stemmer.html for a good stemmer definition
// See https://github.com/kristopolous/Porter2-Stemmer for a good stemmer implementation

const stemRules = [
	["[.,!?]", " "],
	["[`´\"]", "'"],
	["\\b\\d+\\b", " "],
	["\\b\\w{1,3}\\b", " "],
	["\\s+", " "],

	["n't\\b", ""],
	["'d\\b", ""],
	["'s\\b", ""],
	["'ll\\b", ""],
	["'m\\b", ""],
	["'ve\\b", ""]
];

function uniqueWords(txt) {
	const segmenter = new Intl.Segmenter("en", { granularity: "word" });

	// apply the stemmer rules on the full document
	for (const x of stemRules) {
		txt = txt.replace(new RegExp(x[0], "g"), x[1]);
	}

	const segs = segmenter.segment(txt);
	const words = new Set();

	// collect unique words not on stoplist
	for (const s of segs) {
		if (s.isWordLike) {
			const w = s.segment.toLowerCase();
			if (!stopwords.includes(w)) words.add(w);
		}
	}
	return ([...words].sort().join(","));
}



export default class SearchIndex {

	data() {
		return {
			permalink: "/search-index.json",
			eleventyExcludeFromCollections: true,
			layout: false,
			// … other front matter keys
		};
	}

	render(data) {
		const out = [];

		for (const page of data.collections.posts) {
			// debugger; // console.log(page);

			const e = {
				title: page.data.title,
				loc: page.url,
				lastmod: page.date.toISOString(),
				description: page.data.description,
				words: uniqueWords(page.rawInput + ' ' + page.data.description)
			};


			out.push(e);
		}
		// return JSON.stringify(d, null, 1);
		return JSON.stringify(out);
	}
}

