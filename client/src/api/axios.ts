// In client/src/api/axios.ts
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;
```4.  Now, go into every file that uses `axios` (`AdminDashboard.tsx`, `Projects.tsx`, `Experience.tsx`, `LoginPage.tsx`) and change the import from `import axios from 'axios';` to `import API from '../api/axios';`. Then, replace every instance of `axios.get(...)` with `API.get(...)`. For example: `const response = await API.get('/api/projects');`. You no longer need to write the full URL.