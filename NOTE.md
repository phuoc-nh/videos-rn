## Project Structure

- **`components/`** – Contains all reusable UI components used throughout the app.
- **`app/`** – Includes all the main screen components for the application.
- **`tabs/`** – Holds all the tab-based screens. This folder is treated as a separate module, and in the future, additional modules with different purposes can be added in a similar structure.
- **`utils/`** – Contains commonly used utility functions to keep the codebase clean and DRY.
- **`types/`** – Centralizes all TypeScript type definitions used across the app.
- **`services/`** – Manages API service calls. This is where integrations with backend services like Firebase or Supabase are centralized, ensuring a clean separation of concerns.


## Assumptions

- Only one video is uploaded at a time.
- There is no need to store the video file itself in persistent storage.

## TODO

- Integrate with **Supabase** for:
  - Video upload
  - User authentication
  - User data storage
- Create a screen to view all uploaded videos.
- Allow users to browse through videos.
- Implement **like** and **comment** functionality on videos.
- Display the video with a title and description overlay.
- Ensure the video scales to fit the screen properly.
- Set up Github actions for unit testing and linting.
