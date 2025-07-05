# Puppeteer Robust Form Filling Guide

## The Problem
Standard `mcp_puppeteer_puppeteer_fill` often fails because:
- React/Vue/Angular forms need special event handling
- Elements load dynamically
- Forms have validation that blocks simple value setting
- Input masking or formatting interferes

## Copy-Paste Solutions

### Solution 1: Universal Form Filler (Works 90% of the time)
Use this with `mcp_puppeteer_puppeteer_evaluate`:

```javascript
(async () => {
    const fillInput = async (selector, value) => {
        // Wait for element
        let el = null;
        for (let i = 0; i < 30; i++) {
            el = document.querySelector(selector);
            if (el && !el.disabled) break;
            await new Promise(r => setTimeout(r, 100));
        }
        
        if (!el) return `Element not found: ${selector}`;
        
        // Method 1: Click and clear
        el.click();
        el.focus();
        el.select();
        
        // Method 2: Set value multiple ways
        el.value = '';
        
        // Method 3: Type character by character
        for (const char of value) {
            el.value += char;
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }
        
        // Method 4: Force React update
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(el, value);
        
        // Trigger all possible events
        ['input', 'change', 'blur'].forEach(event => {
            el.dispatchEvent(new Event(event, { bubbles: true }));
        });
        
        return `Filled ${selector} with ${value.substring(0, 10)}...`;
    };
    
    // Fill your form - CHANGE THESE SELECTORS AND VALUES
    await fillInput('#api-key', 'your-api-key-here');
    await fillInput('#model-select', 'gpt-4');
    
    return "Form filled!";
})();
```

### Solution 2: When Nothing Else Works (Nuclear Option)
```javascript
// Paste entire value at once using execCommand
const nuclearFill = (selector, value) => {
    const el = document.querySelector(selector);
    if (!el) return "Not found";
    
    el.focus();
    el.select();
    document.execCommand('selectAll');
    document.execCommand('delete');
    document.execCommand('insertText', false, value);
    
    return "Nuclear filled!";
};

nuclearFill('#stubborn-input', 'your-value');
```

### Solution 3: Debug First, Then Fill
```javascript
// First, understand why it's not working
(() => {
    const selector = '#your-input-selector';  // CHANGE THIS
    const el = document.querySelector(selector);
    
    if (!el) return "Element not found!";
    
    // Check what's blocking us
    const diagnosis = {
        found: true,
        value: el.value,
        disabled: el.disabled,
        readonly: el.readOnly,
        type: el.type,
        visible: el.offsetParent !== null,
        framework: el._reactProps ? 'React' : el.__vue__ ? 'Vue' : 'Unknown',
        eventListeners: Object.keys(el).filter(k => k.startsWith('on'))
    };
    
    console.log(diagnosis);
    return diagnosis;
})();
```

### Solution 4: For Dropdowns/Selects
```javascript
// For select elements that won't cooperate
const selectOption = (selectSelector, optionValue) => {
    const select = document.querySelector(selectSelector);
    if (!select) return "Select not found";
    
    // Method 1: Direct value set
    select.value = optionValue;
    
    // Method 2: Click the option
    const option = select.querySelector(`option[value="${optionValue}"]`);
    if (option) {
        option.selected = true;
    }
    
    // Trigger change
    select.dispatchEvent(new Event('change', { bubbles: true }));
    
    return `Selected: ${optionValue}`;
};

selectOption('#model-dropdown', 'gpt-4-turbo');
```

### Solution 5: Wait and Retry Pattern
```javascript
// Keep trying until it works
(async () => {
    const tryFill = async (selector, value, maxAttempts = 10) => {
        for (let i = 0; i < maxAttempts; i++) {
            try {
                const el = document.querySelector(selector);
                if (el && el.value === value) {
                    return `Success on attempt ${i + 1}`;
                }
                
                if (el) {
                    el.click();
                    el.focus();
                    el.value = value;
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }
                
                await new Promise(r => setTimeout(r, 500));
            } catch (e) {
                console.log(`Attempt ${i + 1} failed:`, e.message);
            }
        }
        return "Failed after all attempts";
    };
    
    return await tryFill('#api-key-input', 'sk-your-key-here');
})();
```

## Quick Diagnostic Commands

### See All Form Inputs
```javascript
Array.from(document.querySelectorAll('input, select, textarea')).map(el => ({
    selector: el.id || el.name || el.className,
    type: el.type,
    value: el.value,
    visible: el.offsetParent !== null
}))
```

### Find Input by Placeholder
```javascript
document.querySelector('input[placeholder*="API"]') || 
document.querySelector('input[placeholder*="key"]') ||
document.querySelector('input[placeholder*="Key"]')
```

### Check if Page Uses React/Vue
```javascript
{
    react: !!document.querySelector('[data-reactroot]') || !!window.React,
    vue: !!document.querySelector('#app').__vue__ || !!window.Vue,
    angular: !!document.querySelector('[ng-app]') || !!window.angular
}
```

## Workflow for Stubborn Forms

1. **Navigate to the form**
2. **Diagnose first** - Use the diagnostic script
3. **Try Solution 1** - The universal filler
4. **If that fails, try Solution 2** - Nuclear option
5. **Still failing? Use Solution 5** - Wait and retry
6. **Last resort** - Take screenshot, check what's wrong visually

## Common Gotchas

- **Timing**: Form might not be ready. Always wait.
- **Validation**: Some forms validate on blur, not input.
- **Masking**: Phone/credit card inputs might format as you type.
- **Hidden inputs**: Some forms use hidden inputs for the real value.
- **iframes**: Form might be in an iframe (need special handling). 