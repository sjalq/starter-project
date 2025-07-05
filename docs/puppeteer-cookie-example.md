# Puppeteer Cookie Example

## Example: Logging into a website and maintaining the session

### Step 1: Navigate to the site
Use `mcp_puppeteer_puppeteer_navigate`:
```json
{
  "url": "https://example.com/login"
}
```

### Step 2: Check if already logged in
Use `mcp_puppeteer_puppeteer_evaluate`:
```javascript
// Check for common login indicators
const isLoggedIn = 
    document.cookie.includes('session') ||
    document.querySelector('.logout-button') !== null ||
    document.querySelector('[href*="/dashboard"]') !== null;
isLoggedIn ? "Already logged in!" : "Need to login"
```

### Step 3: If not logged in, perform login
```javascript
// Fill username
mcp_puppeteer_puppeteer_fill:
{
  "selector": "#username",
  "value": "your-username"
}

// Fill password
mcp_puppeteer_puppeteer_fill:
{
  "selector": "#password", 
  "value": "your-password"
}

// Click login
mcp_puppeteer_puppeteer_click:
{
  "selector": "#login-button"
}
```

### Step 4: Next time you navigate, you're already logged in!
Because of `--user-data-dir=/tmp/puppeteer-bathroom-sync`, the cookies persist.

### Step 5: To logout/clear cookies
Use `mcp_puppeteer_puppeteer_evaluate`:
```javascript
// Option 1: Click logout if available
document.querySelector('.logout-button')?.click();

// Option 2: Force clear all cookies
document.cookie.split(";").forEach(c => {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
localStorage.clear();
sessionStorage.clear();
"Cookies cleared!"
```

## Testing Cookie Persistence

1. Navigate to a site and login
2. Take a screenshot: `mcp_puppeteer_puppeteer_screenshot`
3. Close everything and wait
4. Navigate to the same site again
5. Take another screenshot - you should still be logged in!

## Multiple Accounts

To manage multiple accounts, you can:
1. Clear cookies between accounts using the JavaScript above
2. Or modify `~/.cursor/mcp.json` to use different profile directories:
   - `/tmp/puppeteer-account1`
   - `/tmp/puppeteer-account2`
   
Then restart Cursor to apply the changes. 