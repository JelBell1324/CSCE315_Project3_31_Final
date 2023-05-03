import DEBUG from "./debug";
/**
 * Check backendOrgin
 */
const backendOrigin = DEBUG ? 'http://localhost:8080' : 'https://csce315-project3-31-backend-production.up.railway.app';
if (DEBUG) console.log(backendOrigin);
export default backendOrigin;