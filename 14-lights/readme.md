# Three.js Journey

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
## Lesson Memo

Performance Cost

Minimal cost:

- AmbientLight
- HemisphereLight
Moderate cost:

- DirectionalLight
- PointLight
High cost:

- SpotLight
- RectAreaLight

Baking: The idea is that you bake the light into the texture
