const {JSDOM} = require('jsdom')
const createDOMPurify = require('dompurify')

const window = new JSDOM("").window
const DOMPurify = createDOMPurify(window)

const sanitizeHTML = (html) => {
    return DOMPurify.sanitize(html)
}

module.exports =sanitizeHTML