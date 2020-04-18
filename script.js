document.querySelector('.btn-submit')
	.addEventListener('click', Highlighter)

document.querySelector('img.btn-copy')
	.addEventListener('click', copy)

function Highlighter() {
	let textarea = document.getElementById("codeText").value

	const syntaxColor = (text, regex, color) =>
		text.replace(regex, `<span style="color: ${color}">$1</span>`)


	// Strings...
	textarea = syntaxColor(
		textarea,
		/(\".+?\"|\'.+?\'|\`.+?\`)/gi,
		'#F3E214'
	)

	// Reserved Words
	textarea = syntaxColor(
		textarea,
		/\b(function|return|const|let|var|if|else|break|continue|case|try|catch|throw|delete|for|typeof|do|while|new|void|debugger|finally|switch|this)\b/gi,
		'#E257BF'
	)

	// Arrow function

	textarea = syntaxColor(
		textarea,
		/(.+(?==>))/g,
		'#2C2'
	)

	// Arrow function params
	textarea = syntaxColor(
		textarea,
		/(\(.+\).+=>)/g,
		'#EC922C'
	)

	// comment
	textarea = syntaxColor(
		textarea,
		/(\/\/.+|\/\*[\s\S]\*\/)/gi,
		'#4AD'
	)

	// operadores
	textarea = syntaxColor(
		textarea,
		/[^style</span>//](==|=>|\=|\+|\-|\*|\/|&&|\|\|)/g,
		'#E257BF'
	)

	// functions
	textarea = syntaxColor(
		textarea,
		/(\w+(?=\())/gi,
		'#2C2'
	)

	// Params

	textarea = syntaxColor(
		textarea,
		/((?<=\().+(?=\)))/gi,
		'#EC922C'
	)

	const pre = document.createElement('pre')
	pre.innerHTML = `<code>${textarea}</code>`
	pre.classList = 'code'

	const container = document.querySelector('div.container-code')
	container.innerHTML = ''
	container.appendChild(pre)

	document.querySelector('img.btn-copy').style.display = 'block'
}

function copyText(text) {
	const textarea = document.createElement('textarea')
	textarea.value = text

	document.body.appendChild(textarea)

	textarea.select()
	document.execCommand('copy')

	document.body.removeChild(textarea)

	return true
}

function copy() {
	const code = document.querySelector('pre.code').innerHTML

	if (copyText(`<pre> ${code} </pre>`)) {
		const div = document.createElement('div')
		div.innerHTML = 'Copiado!!!'
		div.className = 'copied'

		document.body.appendChild(div)

		setTimeout(() => {
			document.body.removeChild(div)
		}, 2000)
	}
}
