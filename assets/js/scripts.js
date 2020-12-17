window.addEventListener('DOMContentLoaded', function () {
	if (document.querySelector('.home-grid') != null && window.netlifyIdentity) {
		window.netlifyIdentity.on('init', user => {
			if (!user) {
				window.netlifyIdentity.on('login', () => {
					document.location.href = '/admin/'
				})
			}
		})
	}
	function checkTheme() {
		var selectedTheme = localStorage.getItem('theme')
		if (selectedTheme != null) {
			document.body.className = selectedTheme + '-theme'
		} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.body.className = 'dark-theme'
		} else {
			document.body.className = 'light-theme'
		}
	}
	checkTheme()
	document.querySelector('.theme-toggle').addEventListener('click', function () {
		if (document.body.className == 'light-theme') {
			document.body.className = 'dark-theme'
			localStorage.setItem('theme', 'dark')
		} else {
			document.body.className = 'light-theme'
			localStorage.setItem('theme', 'light')
		}
	})
	window.matchMedia('(prefers-color-scheme: dark)').addListener(checkTheme)
	document.querySelector('.social-a').addEventListener('click', function () {
		this.nextElementSibling.style.left = (window.innerWidth - 200) + 'px'
	})
	var fab = document.querySelector('.scroll-button')
	window.addEventListener('scroll', function () {
		if (document.querySelector('#top').getBoundingClientRect().top < 0) {
			fab.style.transform = 'scale(1)'
		} else {
			fab.style.transform = 'scale(0)'
		}
	})
	var commentContainer = document.querySelector('#comment-container')
	if (commentContainer != null) {
		new Gitalk({
			language: 'en',
			id: location.pathname,
			repo: 'Broken-Hearts',
			owner: 'Hrishikesh-K',
			admin: ['Hrishikesh-K'],
			clientID: '336ddc7cca44b2fb0851',
			body: 'Comments for URL: ' + location.href,
			clientSecret: '19ed62d2c6690cd4c1203dbdbc5847f949272fdc',
			flipMoveOptions: {
				staggerDelayBy: 0,
				leaveAnimation: 'fade',
				enterAnimation: 'fade',
				appearAnimation: 'fade'
			}
		}).render(commentContainer)
	}
	var searchForm = document.querySelector('.search-form')
	if (searchForm != null) {
		var pagesIndex
		var searchIndex
		var maxSumLength = 100
		var sentenceRegex = /\b\.\s/gm
		var wordRegex = /\b(\w*)[\W|\s|\b]?/gm
		var errorP = document.querySelector('.errorP')
		var queryP = document.querySelector('.queryP')
		var searchInput = document.querySelector('.search-input')
		var searchButton = document.querySelector('.search-button')
		async function initSearchIndex() {
			var response = await fetch('/index.json')
			pagesIndex = await response.json()
			searchIndex = lunr(function () {
				this.ref('href')
				this.field('title')
				this.field('content')
				pagesIndex.forEach((page) => this.add(page))
			})
			var params = new URLSearchParams(location.search)
			if (params.has('q')) {
				searchInput.value = params.get('q')
				searchButton.dispatchEvent(new Event('click'))
			}
		}
		function handleSearchQuery() {
			var query = searchInput.value.trim()
			history.replaceState('', '', './?q=' + query)
			if (!query) {
				clearSearchResults()
				queryP.style.marginBottom = '0px'
				searchForm.style.marginBottom = '20px'
				errorP.innerHTML = 'Please enter some text to search'
				return
			}
			var results = searchSite(query)
			if (!results.length) {
				clearSearchResults()
				queryP.style.marginBottom = '0px'
				searchForm.style.marginBottom = '20px'
				errorP.innerHTML = 'No results found for "' + query + '"'
				return
			}
			renderSearchResults(query, results)
		}
		function searchSite(query) {
			var originalQuery = query
			query = getLunrSearchQuery(query)
			var results = getSearchResults(query)
			return results.length ? results : query !== originalQuery ? getSearchResults(originalQuery) : []
		}
		function getSearchResults(query) {
			return searchIndex.search(query).flatMap((hit) => {
				if (hit.ref == 'undefined') return []
				var pageMatch = pagesIndex.filter((page) => page.href === hit.ref)[0]
				pageMatch.score = hit.score
				return [pageMatch]
			})
		}
		function getLunrSearchQuery(query) {
			var searchTerms = query.split(' ')
			if (searchTerms.length === 1) {
				return query
			}
			query = ''
			for (var term of searchTerms) {
				query += `+ ${term} `
			}
			return query.trim()
		}
		function renderSearchResults(query, results) {
			errorP.innerHTML = ''
			searchForm.style.marginBottom = '20px'
			updateSearchResults(query, results)
		}
		function clearSearchResults() {
			queryP.innerHTML = ''
			searchForm.style.marginBottom = '0px'
			var results = document.querySelector('.search-results ul')
			while (results.firstChild) {
				results.removeChild(results.firstChild)
			}
		}
		function updateSearchResults(query, results) {
			document.querySelector('.results-container').innerHTML = results.map(hit =>
				`<div class = "uk-padding-small search-card" data-score = "${hit.score.toFixed(2)}">
						<a class = "uk-link-reset" href = "${hit.href}">
							<h3>
								${hit.title}
							</h3>
							<p>
								${createSearchResultBlurb(query, hit.content)}
							</p>
						</a>
					</div>
					<hr class = "uk-divider-icon">`).join('')
			var searchResultListItems = document.querySelectorAll('.search-results ul div.search-card')
			var searchResultsCount = searchResultListItems.length + (searchResultListItems.length > 1 ? ' results' : ' result')
			queryP.style.marginBottom = '20px'
			queryP.innerHTML = searchResultsCount + ' for ' + '"' + query + '" (sorted by relevance):'
		}
		function createSearchResultBlurb(query, pageContent) {
			var searchQueryRegex = new RegExp(createQueryStringRegex(query), 'gmi')
			var searchQueryHits = Array.from(pageContent.matchAll(searchQueryRegex), (m) => m.index)
			var sentenceBoundaries = Array.from(pageContent.matchAll(sentenceRegex), (m) => m.index)
			var searchResultText = ''
			var lastEndOfSentence = 0
			for (var hitLocation of searchQueryHits) {
				if (hitLocation > lastEndOfSentence) {
					for (var i = 0; i < sentenceBoundaries.length; i++) {
						if (sentenceBoundaries[i] > hitLocation) {
							var startOfSentence = i > 0 ? sentenceBoundaries[i - 1] + 1 : 0
							var endOfSentence = sentenceBoundaries[i]
							lastEndOfSentence = endOfSentence
							parsedSentence = pageContent.slice(startOfSentence, endOfSentence).trim()
							searchResultText += `${parsedSentence} ... `
							break
						}
					}
				}
				var searchResultWords = tokenize(searchResultText)
				var pageBreakers = searchResultWords.filter((word) => word.length > 50)
				if (pageBreakers.length > 0) {
					searchResultText = fixPageBreakers(searchResultText, pageBreakers)
				}
				if (searchResultWords.length >= maxSumLength) {
					break
				}
			}
			return ellipsize(searchResultText, maxSumLength).replace(searchQueryRegex, '<mark class = "mark">$&</mark>')
		}
		function createQueryStringRegex(query) {
			var searchTerms = query.split(' ')
			if (searchTerms.length == 1) {
				return query
			}
			query = ''
			for (var term of searchTerms) {
				query += `${term}|`
			}
			query = query.slice(0, -1)
			return `(${query})`
		}
		function tokenize(input) {
			var wordMatches = Array.from(input.matchAll(wordRegex), (m) => m)
			return wordMatches.map((m) => ({
				word: m[0],
				start: m.index,
				end: m.index + m[0].length,
				length: m[0].length,
			}))
		}
		function fixPageBreakers(input, largeWords) {
			largeWords.forEach((word) => {
				var chunked = chunkify(word.word, 20)
				input = input.replace(word.word, chunked)
			})
			return input
		}
		function chunkify(input, chunkSize) {
			var output = ''
			var totalChunks = (input.length / chunkSize) | 0
			var lastChunkIsUneven = input.length % chunkSize > 0
			if (lastChunkIsUneven) {
				totalChunks += 1
			}
			for (var i = 0; i < totalChunks; i++) {
				var start = i * chunkSize
				var end = start + chunkSize
				if (lastChunkIsUneven && i === totalChunks - 1) {
					end = input.length
				}
				output += input.slice(start, end) + ' '
			}
			return output
		}
		function ellipsize(input, maxLength) {
			var words = tokenize(input)
			if (words.length <= maxLength) {
				return input
			}
			return input.slice(0, words[maxLength].end) + '...'
		}
		function handleKeydown(event) {
			if (event.key === 'Enter') {
				event.preventDefault()
				handleSearchQuery()
			}
		}
		initSearchIndex()
		searchInput.addEventListener('keydown', handleKeydown)
		searchInput.addEventListener('input', handleSearchQuery)
		searchButton.addEventListener('click', handleSearchQuery)
	}
})