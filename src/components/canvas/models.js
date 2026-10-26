//scetchfab.com for more 3D models
// The models the hero can show. The first one is always shown on page load; "Randomize 3D" picks
// among all of them (see utils/pickNextModel.js). To add a model, put its file in public/ and add
// an entry with a new id; nothing else needs to change.
// Scale and position are not set here: Computers.jsx fits every model to the canvas automatically.
// rotation: starting angle in radians [x, y, z]; the middle value turns the model left / right
// saturation: 1 = original colors, 0 = black and white
// emissiveIntensity: 1 = original glow of the RGB parts, 0 = no glow
// environment: strength of the soft studio reflections (0 = none). Metal parts show only what
//   they reflect, so without it they render almost black and blend into the background
// lights: intensity of the hemisphere, point and spot lights
export const modelConfigs = [
  {
    id: 'desktop',
    name: 'Desktop Workspace',
    url: './desktop_pc/scene.gltf',
    rotation: [-0.01, -0.2, -0.1],
    saturation: 0.7,
    emissiveIntensity: 0.6,
    environment: 0,
    lights: { hemisphere: 5.15, point: 1, spot: 1 },
  },
  {
    id: 'rover',
    name: 'Perseverance Rover',
    url: './nasa_mars_landing/nasa_mars_landing_2021.glb',
    rotation: [-0.01, 0.18, -0.1],
    saturation: 1,
    emissiveIntensity: 1,
    environment: 1,
    lights: { hemisphere: 1.5, point: 1, spot: 1 },
  },
  {
    id: 'shuttle',
    name: 'Space Shuttle Discovery',
    url: './orbiter_space_shuttle/orbiter_space_shuttle.glb',
    rotation: [-0.01, -0.2, -0.1],
    saturation: 1,
    emissiveIntensity: 1,
    environment: 1,
    lights: { hemisphere: 1.5, point: 1, spot: 1 },
  },
]

export const INITIAL_MODEL_ID = modelConfigs[0].id
