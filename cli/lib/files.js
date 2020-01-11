const fs = require("fs-extra");
const path = require("path");

const cheerio = require("cheerio");
const entities = new (require("html-entities").XmlEntities)();
const htmlBeautify = require('js-beautify').html;

const { workNg } = require("./dirs");

const indexHtml = [workNg, "src", "index.html"].join(path.sep);

const getManifest = () => {
    return JSON.parse(fs.readFileSync("manifest.json", "utf8"));;
}

const updateIndexHtmlFile = file => {
    // const html = fs.readFileSync(file, "utf8");
    // fs.writeFileSync(file, updateIndexHtml(html, getManifest()));
}

const updateIndexHtml = (html, manifest) => {
    const $ = cheerio.load(html, { decodeEntities: false, normalizeWhitespace: true });
    let $head = $("head");
    if ($head.length === 0) $head = $("<head>");
    $head.find("meta[http-equiv='Content-Security-Policy']").remove();
    $(`<meta http-equiv="Content-Security-Policy" content="${getCsp(manifest.urls)}">`).prependTo($head);
    if (process.env.NODE_ENV === "production") {
        $head.find("title").remove();
        const $title = $("<title>");
        $title.text(manifest.title);
        $title.prependTo($head);
        // TODO: Beacon
    }
    return htmlBeautify($.html(), { "preserve_newlines": false });
}

const getCsp = (urls = []) => {
    const csp = { 
        "base-uri": "'self'",
        "object-src": "'none'",
        "default-src": "'self' data:",
        "style-src": "'unsafe-inline' 'self'",
        "script-src": "'unsafe-inline' 'self'"
    }
    if (process.env.NODE_ENV !== "production") {
        csp["script-src"] = `'unsafe-eval' ${csp["script-src"]}`;
    }
    if (urls.length > 0) {
        const whitelist = entities.encodeNonUTF(urls.join(" "));
        ["default", "style", "script"].forEach(x => csp[`${x}-src`] += ` ${whitelist}`);
    }
    let arr = [];
    for (const directive in csp) {
        arr.push(`${directive} ${csp[directive]}`);
    }
    return arr.join("; ");
}

module.exports = { indexHtml, updateIndexHtmlFile }
