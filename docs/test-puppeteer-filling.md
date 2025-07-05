# Test Puppeteer Form Filling

## Quick Test on Google Search

### 1. Navigate to Google
```json
mcp_puppeteer_puppeteer_navigate:
{
  "url": "https://www.google.com"
}
```

### 2. Test Standard Fill (might fail on some sites)
```json
mcp_puppeteer_puppeteer_fill:
{
  "selector": "textarea[name='q']",
  "value": "test search"
}
```

### 3. If that fails, use Robust Fill
```javascript
mcp_puppeteer_puppeteer_evaluate:
(async()=>{const fill=async(s,v)=>{let e=null;for(let i=0;i<30;i++){e=document.querySelector(s);if(e&&!e.disabled)break;await new Promise(r=>setTimeout(r,100));}if(!e)return`Not found: ${s}`;e.click();e.focus();e.value='';for(const c of v){e.value+=c;e.dispatchEvent(new Event('input',{bubbles:true}));}const n=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set;n.call(e,v);['input','change','blur'].forEach(ev=>e.dispatchEvent(new Event(ev,{bubbles:true})));return`Filled ${s}`;};return await fill('textarea[name="q"]','puppeteer robust filling test');})();
```

### 4. Submit the Search
```javascript
mcp_puppeteer_puppeteer_evaluate:
document.querySelector('textarea[name="q"]').form.submit();
"Submitted!"
```

### 5. Take Screenshot to Verify
```json
mcp_puppeteer_puppeteer_screenshot:
{
  "name": "google-search-result",
  "width": 1280,
  "height": 720
}
```

## For Your Specific Form

Replace the selectors and values:

```javascript
// Diagnose first
mcp_puppeteer_puppeteer_evaluate:
Array.from(document.querySelectorAll('input, textarea, select')).map(e => ({
    id: e.id,
    name: e.name,
    type: e.type,
    placeholder: e.placeholder,
    value: e.value.substring(0, 20),
    className: e.className.substring(0, 50)
}))

// Then fill robustly
mcp_puppeteer_puppeteer_evaluate:
(async()=>{
    const fill=async(s,v)=>{
        // ... (same robust fill function)
    };
    
    // Fill multiple fields
    await fill('#api-key-input', 'your-actual-api-key');
    await fill('#model-select', 'gpt-4');
    
    return "All filled!";
})();
``` 