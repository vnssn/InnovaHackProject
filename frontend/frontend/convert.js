const fs = require('fs');
const path = require('path');

const filesToConvert = [
  { name: 'dashboard', htmlFile: 'dashboard.html', route: 'dashboard/page.tsx' },
  { name: 'transactions', htmlFile: 'transactions.html', route: 'transactions/page.tsx' },
  { name: 'financial-replay', htmlFile: 'replay.html', route: 'financial-replay/page.tsx' },
  { name: 'merchants', htmlFile: 'merchants.html', route: 'merchants/page.tsx' },
  { name: 'locations', htmlFile: 'locations.html', route: 'locations/page.tsx' },
  { name: 'budgets', htmlFile: 'budgets.html', route: 'budgets/page.tsx' },
  { name: 'goals', htmlFile: 'goals.html', route: 'goals/page.tsx' },
  { name: 'subscriptions', htmlFile: 'subscriptions.html', route: 'subscriptions/page.tsx' },
  { name: 'ai-assistant', htmlFile: 'ai.html', route: 'ai-assistant/page.tsx' },
];

function htmlToJsx(html) {
  let jsx = html;
  // Replace class= with className=
  jsx = jsx.replace(/class=/g, 'className=');
  // Replace inline styles (very basic, won't catch everything, but enough for this)
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
    const styleObj = {};
    styleString.split(';').forEach(rule => {
      if (!rule.trim()) return;
      const [key, value] = rule.split(':');
      if (key && value) {
        const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObj[camelKey] = value.trim();
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });
  // Replace SVG attributes
  jsx = jsx.replace(/viewbox=/g, 'viewBox=');
  jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
  jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
  jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  jsx = jsx.replace(/stroke-dasharray=/g, 'strokeDasharray=');
  jsx = jsx.replace(/stroke-dashoffset=/g, 'strokeDashoffset=');
  jsx = jsx.replace(/fill-opacity=/g, 'fillOpacity=');
  jsx = jsx.replace(/fill-rule=/g, 'fillRule=');
  jsx = jsx.replace(/clip-rule=/g, 'clipRule=');
  jsx = jsx.replace(/clip-path=/g, 'clipPath=');
  jsx = jsx.replace(/preserveaspectratio=/g, 'preserveAspectRatio=');
  jsx = jsx.replace(/lineargradient/g, 'linearGradient');
  jsx = jsx.replace(/stop-color/g, 'stopColor');
  jsx = jsx.replace(/stop-opacity/g, 'stopOpacity');
  jsx = jsx.replace(/fegaussianblur/g, 'feGaussianBlur');
  jsx = jsx.replace(/stddeviation=/g, 'stdDeviation=');
  jsx = jsx.replace(/femergenode/gi, 'feMergeNode');
  jsx = jsx.replace(/femerge/gi, 'feMerge');
  jsx = jsx.replace(/text-anchor=/g, 'textAnchor=');
  jsx = jsx.replace(/dominant-baseline=/g, 'dominantBaseline=');
  jsx = jsx.replace(/font-size=/g, 'fontSize=');
  jsx = jsx.replace(/font-weight=/g, 'fontWeight=');
  jsx = jsx.replace(/font-family=/g, 'fontFamily=');
  jsx = jsx.replace(/letter-spacing=/g, 'letterSpacing=');
  jsx = jsx.replace(/text-decoration=/g, 'textDecoration=');
  jsx = jsx.replace(/shape-rendering=/g, 'shapeRendering=');
  jsx = jsx.replace(/color-interpolation-filters=/g, 'colorInterpolationFilters=');
  jsx = jsx.replace(/flood-color=/g, 'floodColor=');
  jsx = jsx.replace(/flood-opacity=/g, 'floodOpacity=');
  jsx = jsx.replace(/lighting-color=/g, 'lightingColor=');
  jsx = jsx.replace(/marker-end=/g, 'markerEnd=');
  jsx = jsx.replace(/marker-mid=/g, 'markerMid=');
  jsx = jsx.replace(/marker-start=/g, 'markerStart=');
  jsx = jsx.replace(/paint-order=/g, 'paintOrder=');
  jsx = jsx.replace(/x-height=/g, 'xHeight=');
  jsx = jsx.replace(/vector-effect=/g, 'vectorEffect=');
  jsx = jsx.replace(/xlink:href=/g, 'xlinkHref=');
  jsx = jsx.replace(/xmlns:xlink=/g, 'xmlnsXlink=');
  jsx = jsx.replace(/xml:space=/g, 'xmlSpace=');
  jsx = jsx.replace(/tabindex=/g, 'tabIndex=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  jsx = jsx.replace(/cellpadding=/g, 'cellPadding=');
  jsx = jsx.replace(/cellspacing=/g, 'cellSpacing=');
  jsx = jsx.replace(/colspan=/g, 'colSpan=');
  jsx = jsx.replace(/rowspan=/g, 'rowSpan=');
  jsx = jsx.replace(/maxlength=/g, 'maxLength=');
  jsx = jsx.replace(/minlength=/g, 'minLength=');
  jsx = jsx.replace(/autocomplete=/g, 'autoComplete=');
  jsx = jsx.replace(/autofocus/g, 'autoFocus');
  jsx = jsx.replace(/enctype=/g, 'encType=');
  jsx = jsx.replace(/crossorigin=/g, 'crossOrigin=');
  jsx = jsx.replace(/accesskey=/g, 'accessKey=');
  
  // Close unclosed tags like <input>, <img/>
  jsx = jsx.replace(/<input([^>]*?[^\/])>/g, '<input$1/>');
  jsx = jsx.replace(/<img([^>]*?[^\/])>/g, '<img$1/>');
  jsx = jsx.replace(/<br([^>]*?[^\/])>/g, '<br$1/>');
  jsx = jsx.replace(/<hr([^>]*?[^\/])>/g, '<hr$1/>');

  // Remove comment tags that might break JSX
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');
  
  // Remove script and style tags
  jsx = jsx.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  jsx = jsx.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Replace readonly and rows
  jsx = jsx.replace(/readonly=""/g, 'readOnly');
  jsx = jsx.replace(/readonly/g, 'readOnly');
  jsx = jsx.replace(/rows="(\d+)"/g, 'rows={$1}');
  
  // Fix React style custom properties (e.g. -TwStrokeDashoffset -> --tw-stroke-dashoffset)
  jsx = jsx.replace(/"-TwStrokeDashoffset"/g, '"--tw-stroke-dashoffset"');
  
  // Cast style objects to React.CSSProperties to avoid TS errors on custom CSS variables
  jsx = jsx.replace(/style=\{\{([^}]+)\}\}/g, 'style={{$1} as React.CSSProperties}');
  
  // Remove onclick attributes since we're converting to React
  jsx = jsx.replace(/onclick="[^"]*"/gi, '');
  
  // Fix boolean attributes
  jsx = jsx.replace(/disabled=""/g, 'disabled');
  jsx = jsx.replace(/disabled="disabled"/g, 'disabled');
  jsx = jsx.replace(/checked=""/g, 'defaultChecked');
  jsx = jsx.replace(/checked="checked"/g, 'defaultChecked');
  jsx = jsx.replace(/selected=""/g, 'defaultValue');
  jsx = jsx.replace(/selected="selected"/g, 'defaultValue');

  return jsx;
}

filesToConvert.forEach(item => {
  const htmlPath = path.join(__dirname, item.htmlFile);
  if (!fs.existsSync(htmlPath)) {
    console.log(`Skipping ${item.htmlFile}, not found.`);
    return;
  }
  
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  // Extract main content using greedy match to get the last </main>
  const mainMatch = htmlContent.match(/<main[^>]*>([\s\S]*)<\/main>/);
  if (!mainMatch) {
    console.log(`Could not extract <main> from ${item.htmlFile}`);
    return;
  }
  
  let innerHtml = mainMatch[1];
  let jsxContent = htmlToJsx(innerHtml);
  
  const componentName = item.name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  
  const fileContent = `"use client";\n\nexport default function ${componentName}Page() {\n  return (\n    <>\n      ${jsxContent}\n    </>\n  );\n}\n`;
  
  const outPath = path.join(__dirname, 'src', 'app', '(dashboard)', item.route);
  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  fs.writeFileSync(outPath, fileContent);
  console.log(`Created ${outPath}`);
});
